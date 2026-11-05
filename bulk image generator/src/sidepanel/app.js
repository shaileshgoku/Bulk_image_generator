import { parsePrompts } from '../utils/parser.js';
import { QueueManager } from '../queue/queueManager.js';

// DOM Elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const chooseFileBtn = document.getElementById('choose-file-btn');
const fileStatus = document.getElementById('file-status');
const fileStatusText = document.getElementById('file-status-text');
const queueContainer = document.getElementById('queue-container');

// New Control Elements
const primaryActionBtn = document.getElementById('primary-action-btn');
const markFailedBtn = document.getElementById('mark-failed-btn');
const retryBtn = document.getElementById('retry-btn');
const clearBtn = document.getElementById('clear-btn');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const statCompleted = document.getElementById('stat-completed');
const statFailed = document.getElementById('stat-failed');

// Initialize Queue Manager
const queueManager = new QueueManager(updateUI);

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
    await queueManager.init();
});

// Event Listeners
chooseFileBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    
    if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
});

primaryActionBtn.addEventListener('click', async () => {
    if (primaryActionBtn.textContent.includes('Mark Done')) {
        await queueManager.markDoneAndCopyNext();
    } else {
        await queueManager.copyCurrentPrompt();
    }
});

markFailedBtn.addEventListener('click', async () => {
    await queueManager.markFailed();
});

retryBtn.addEventListener('click', async () => {
    await queueManager.retryFailed();
});

clearBtn.addEventListener('click', async () => {
    if (confirm('Are you sure you want to clear the current queue?')) {
        await queueManager.clearQueue();
        fileStatus.classList.add('hidden');
        fileInput.value = '';
    }
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    if (!file.name.endsWith('.txt')) {
        alert('Please select a .txt file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        const content = e.target.result;
        const prompts = parsePrompts(content);
        
        if (prompts.length === 0) {
            fileStatusText.textContent = 'No prompts found in file.';
            fileStatus.classList.remove('hidden');
            return;
        }

        fileStatusText.textContent = `✓ ${file.name} - ${prompts.length} prompts loaded`;
        fileStatus.classList.remove('hidden');
        
        await queueManager.loadPrompts(prompts);
    };
    reader.readAsText(file);
}

function updateUI(state) {
    const { queue, currentIndex } = state;

    renderQueue(queue);
    updateProgress(queue);
    updateControls(queue, currentIndex);
}

function renderQueue(queue) {
    if (queue.length === 0) {
        queueContainer.innerHTML = '<div class="empty-queue-msg">Queue is empty. Load a file to begin.</div>';
        return;
    }

    queueContainer.innerHTML = '';
    
    queue.forEach(item => {
        const div = document.createElement('div');
        div.className = 'queue-item';
        
        let statusIcon = '○';
        let statusClass = 'status-waiting';
        
        if (item.status === 'COPIED') { statusIcon = '📋'; statusClass = 'status-generating'; } // Reuse generating color (yellow)
        if (item.status === 'COMPLETED') { statusIcon = '✓'; statusClass = 'status-completed'; }
        if (item.status === 'FAILED') { statusIcon = '✕'; statusClass = 'status-failed'; }

        div.innerHTML = `
            <div class="queue-item-status ${statusClass}">${statusIcon}</div>
            <div class="queue-item-content">
                <div class="queue-item-header">
                    <span class="queue-item-id">${String(item.id).padStart(2, '0')}</span>
                    <span class="queue-item-text" title="${item.text.replace(/"/g, '&quot;')}">${item.text}</span>
                </div>
            </div>
        `;
        queueContainer.appendChild(div);
    });
}

function updateProgress(queue) {
    const completed = queue.filter(q => q.status === 'COMPLETED').length;
    const failed = queue.filter(q => q.status === 'FAILED').length;
    const waiting = queue.filter(q => q.status === 'WAITING' || q.status === 'COPIED').length;
    const total = queue.length;
    
    statCompleted.textContent = completed;
    statFailed.textContent = failed;
    progressText.textContent = `${completed} / ${total} completed`;
    
    const percentage = total === 0 ? 0 : Math.round(((completed + failed) / total) * 100);
    progressBar.style.width = `${percentage}%`;
}

function updateControls(queue, currentIndex) {
    const hasItems = queue.length > 0;
    const isDone = currentIndex >= queue.length;
    const hasFailed = queue.some(q => q.status === 'FAILED');
    const currentItem = queue[currentIndex];

    if (!hasItems || isDone) {
        primaryActionBtn.disabled = true;
        primaryActionBtn.textContent = '📋 Copy Next Prompt';
        markFailedBtn.disabled = true;
    } else {
        primaryActionBtn.disabled = false;
        markFailedBtn.disabled = false;
        
        if (currentItem.status === 'COPIED') {
            primaryActionBtn.textContent = '✓ Mark Done & Copy Next';
        } else {
            primaryActionBtn.textContent = '📋 Copy Next Prompt';
        }
    }

    retryBtn.disabled = !hasFailed;
    clearBtn.disabled = !hasItems;
}
