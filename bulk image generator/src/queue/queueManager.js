import { QueueStorage } from './queueStorage.js';
import { sendToActiveTab } from '../utils/tabs.js';

export class QueueManager {
    constructor(onStateChange) {
        this.queue = [];
        this.currentIndex = 0;
        this.isGenerating = false;
        this.isPaused = false;
        this.onStateChange = onStateChange; // Callback to update UI
    }

    async init() {
        const state = await QueueStorage.loadQueue();
        this.queue = state.queue;
        this.currentIndex = state.currentIndex;
        this._notify();
    }

    async loadPrompts(prompts) {
        this.queue = prompts.map((prompt, index) => ({
            id: index + 1,
            text: prompt,
            status: 'WAITING' // WAITING, COPIED, COMPLETED, FAILED
        }));
        this.currentIndex = 0;
        await this._saveState();
        this._notify();
    }

    async copyCurrentPrompt() {
        if (this.currentIndex >= this.queue.length) return false;
        
        const currentItem = this.queue[this.currentIndex];
        
        try {
            await navigator.clipboard.writeText(currentItem.text);
            currentItem.status = 'COPIED';
            await this._saveState();
            this._notify();
            return true;
        } catch (e) {
            console.error('Failed to copy text: ', e);
            return false;
        }
    }

    async markDoneAndCopyNext() {
        if (this.currentIndex >= this.queue.length) return false;
        
        // Mark current as completed
        this.queue[this.currentIndex].status = 'COMPLETED';
        this.currentIndex++;
        
        // Skip any non-waiting items (e.g. if they were manually retried or already done)
        while (this.currentIndex < this.queue.length && this.queue[this.currentIndex].status !== 'WAITING') {
            this.currentIndex++;
        }

        if (this.currentIndex < this.queue.length) {
            return await this.copyCurrentPrompt();
        } else {
            await this._saveState();
            this._notify();
            return true; // Reached the end
        }
    }

    async markFailed() {
        if (this.currentIndex >= this.queue.length) return false;
        this.queue[this.currentIndex].status = 'FAILED';
        this.currentIndex++;
        
        while (this.currentIndex < this.queue.length && this.queue[this.currentIndex].status !== 'WAITING') {
            this.currentIndex++;
        }
        
        await this._saveState();
        this._notify();
    }

    async retryFailed() {
        let hasFailed = false;
        this.queue.forEach(item => {
            if (item.status === 'FAILED') {
                item.status = 'WAITING';
                hasFailed = true;
            }
        });
        
        if (hasFailed) {
            // Reset index to the first WAITING item
            const firstWaitingIndex = this.queue.findIndex(item => item.status === 'WAITING');
            if (firstWaitingIndex !== -1 && (firstWaitingIndex < this.currentIndex || this.currentIndex >= this.queue.length)) {
                this.currentIndex = firstWaitingIndex;
            }
            await this._saveState();
            this._notify();
        }
    }

    async clearQueue() {
        this.queue = [];
        this.currentIndex = 0;
        await QueueStorage.clearQueue();
        this._notify();
    }

    async _saveState() {
        await QueueStorage.saveQueue(this.queue, this.currentIndex, false, false);
    }

    _notify() {
        if (this.onStateChange) {
            this.onStateChange({
                queue: this.queue,
                currentIndex: this.currentIndex,
                isGenerating: this.isGenerating,
                isPaused: this.isPaused
            });
        }
    }
}
