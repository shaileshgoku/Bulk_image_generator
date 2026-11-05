const FlowAdapter = {
    /**
     * Perform detection to see if the page and required elements are present.
     */
    detect() {
        try {
            const isFlowPage = FlowDetector.isFlowPage();
            
            if (!isFlowPage) {
                return {
                    success: false,
                    error: 'NOT_FLOW_PAGE',
                    message: 'Google Flow is not detected. Open Google Flow to continue.'
                };
            }

            const input = FlowDetector.findPromptInput();
            if (!input) {
                return {
                    success: false,
                    error: 'NO_INPUT',
                    message: 'Prompt box not detected. Please make sure the Flow editor is open.'
                };
            }

            const button = FlowDetector.findGenerateButton();
            if (!button) {
                return {
                    success: false,
                    error: 'NO_BUTTON',
                    message: 'Generate button not detected. FlowBatch has paused the queue.'
                };
            }

            return {
                success: true,
                message: 'Flow environment detected successfully.'
            };
        } catch (error) {
            return {
                success: false,
                error: 'EXTENSION_ERROR',
                message: 'Error during detection: ' + error.message
            };
        }
    },

    /**
     * Executes the generation for a prompt
     */
    async executePrompt(text) {
        return new Promise((resolve) => {
            const input = FlowDetector.findPromptInput();
            if (!input) {
                resolve({ success: false, message: 'Input not found' });
                return;
            }

            // Step 1: Focus and activate the input
            input.focus();
            input.click();

            // Step 2: The ultimate hack for modern React/Lexical/Draft.js editors: 
            // Emulate a physical Paste event. All modern editors support paste natively.
            
            // Clear existing if possible
            if (['textarea', 'input'].includes(input.tagName.toLowerCase())) {
                input.value = '';
            } else {
                // Try to select all and delete to clear contenteditable
                document.execCommand('selectAll', false, null);
                document.execCommand('delete', false, null);
            }

            // Create a Paste event
            const dataTransfer = new DataTransfer();
            dataTransfer.setData('text/plain', text);
            const pasteEvent = new ClipboardEvent('paste', {
                clipboardData: dataTransfer,
                bubbles: true,
                cancelable: true
            });

            // Dispatch paste
            input.dispatchEvent(pasteEvent);

            // If paste was completely ignored, fallback to execCommand insertText
            setTimeout(() => {
                const currentValue = input.value || input.textContent;
                if (!currentValue || !currentValue.includes(text.substring(0, 5))) {
                    document.execCommand('insertText', false, text);
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }

                // Step 3: Wait a bit and click the Generate button
                setTimeout(() => {
                    const btn = FlowDetector.findGenerateButton();
                    if (!btn) {
                        resolve({ success: false, message: 'Generate button lost' });
                        return;
                    }

                    // Make sure we are clicking the center of the element
                    btn.focus();
                    btn.click();
                    
                    // Monitor completion
                    GenerationMonitor.startMonitoring(
                        () => resolve({ success: true, message: 'Generation complete' }),
                        () => resolve({ success: false, message: 'Generation timed out' })
                    );
                }, 800);
            }, 100);
        });
    }
};
