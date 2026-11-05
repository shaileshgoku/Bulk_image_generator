console.log("[FlowBatch] Content script loaded");

// Listen for messages from the side panel or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'DETECT_FLOW') {
        console.log("[FlowBatch] Received DETECT_FLOW request");
        const status = FlowAdapter.detect();
        sendResponse(status);
        return true;
    }
    
    if (request.action === 'EXECUTE_PROMPT') {
        console.log("[FlowBatch] Received EXECUTE_PROMPT for:", request.prompt);
        FlowAdapter.executePrompt(request.prompt).then(status => {
            sendResponse(status);
        });
        return true; // Keep the message channel open for the async response
    }
});
