/**
 * Manages persisting the queue and its state to chrome.storage.local
 */

export const QueueStorage = {
    async saveQueue(queue, currentIndex, isGenerating, isPaused) {
        return new Promise((resolve) => {
            chrome.storage.local.set({
                flowBatchQueue: queue,
                flowBatchCurrentIndex: currentIndex,
                flowBatchIsGenerating: isGenerating,
                flowBatchIsPaused: isPaused
            }, () => {
                resolve();
            });
        });
    },

    async loadQueue() {
        return new Promise((resolve) => {
            chrome.storage.local.get([
                'flowBatchQueue',
                'flowBatchCurrentIndex',
                'flowBatchIsGenerating',
                'flowBatchIsPaused'
            ], (result) => {
                resolve({
                    queue: result.flowBatchQueue || [],
                    currentIndex: result.flowBatchCurrentIndex || 0,
                    isGenerating: result.flowBatchIsGenerating || false,
                    isPaused: result.flowBatchIsPaused || false
                });
            });
        });
    },

    async clearQueue() {
        return new Promise((resolve) => {
            chrome.storage.local.remove([
                'flowBatchQueue',
                'flowBatchCurrentIndex',
                'flowBatchIsGenerating',
                'flowBatchIsPaused'
            ], () => {
                resolve();
            });
        });
    }
};
