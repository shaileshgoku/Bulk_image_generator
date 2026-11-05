const FlowDetector = {
    /**
     * Checks if the current page looks like Google Flow
     */
    isFlowPage() {
        // We can check URL or document title in the content script
        const url = window.location.href;
        const title = document.title.toLowerCase();
        
        // Example heuristics for detection
        return url.includes('google.com') && (url.includes('flow') || title.includes('flow'));
    },

    /**
     * Finds the prompt input element
     */
    findPromptInput() {
        for (const selector of FlowSelectors.promptInput) {
            const el = document.querySelector(selector);
            if (el) return el;
        }
        
        return null;
    },

    /**
     * Finds the generate button
     */
    findGenerateButton() {
        for (const selector of FlowSelectors.generateButton) {
            const el = document.querySelector(selector);
            if (el) return el;
        }

        // Contextual search: find a button near the prompt input (useful for text-less icon buttons)
        const input = this.findPromptInput();
        if (input) {
            let container = input.parentElement;
            // Go up to 4 levels looking for a button in the same section
            for (let i = 0; i < 4; i++) {
                if (!container) break;
                
                // If it's a form, grab the submit button
                if (container.tagName && container.tagName.toLowerCase() === 'form') {
                    const submitBtn = container.querySelector('button[type="submit"]');
                    if (submitBtn) return submitBtn;
                }

                const buttons = Array.from(container.querySelectorAll('button, div[role="button"]'));
                const validButtons = buttons.filter(btn => btn !== input && btn.offsetWidth > 0 && btn.offsetHeight > 0);
                
                if (validButtons.length > 0) {
                    // The send/generate button is almost always the LAST button in the input area (on the right)
                    // Grabbing the first button might accidentally click a 'Home', 'Back', or 'Upload' button on the left!
                    return validButtons[validButtons.length - 1];
                }
                container = container.parentElement;
            }
        }

        // Fallback: search by text content
        const buttons = Array.from(document.querySelectorAll('button, div[role="button"], span[role="button"], a[role="button"]'));
        for (const btn of buttons) {
            const text = (btn.textContent || '').trim().toLowerCase();
            // Try to match 'generate', 'create', or other common generation verbs.
            // Avoid matching things like 'generate link' if possible, but keep it broad for now.
            if (text.includes('generate') || text.includes('create') || btn.querySelector('svg')) {
                // If it's just an icon button with an SVG, we might check aria-labels on parent
                if (text === 'generate' || text === 'create' || text === 'run' || 
                    text.includes('generate') || text.includes('create')) {
                    return btn;
                }
            }
        }
        
        return null;
    }
};
