/**
 * Helper to communicate with the active tab's content script.
 */
export async function sendToActiveTab(message) {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                resolve({ success: false, error: 'NO_ACTIVE_TAB', message: 'No active tab found.' });
                return;
            }

            const activeTab = tabs[0];
            
            // Note: We might be on a non-google tab. We should just try to send the message.
            chrome.tabs.sendMessage(activeTab.id, message, (response) => {
                if (chrome.runtime.lastError) {
                    // Usually means content script is not loaded on this tab
                    resolve({ 
                        success: false, 
                        error: 'CONTENT_SCRIPT_NOT_LOADED',
                        message: 'Google Flow is not detected. Please open Google Flow.' 
                    });
                } else {
                    resolve(response);
                }
            });
        });
    });
}
