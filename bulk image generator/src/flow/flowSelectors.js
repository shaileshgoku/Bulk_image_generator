/**
 * Selectors for Google Flow UI elements.
 * We prefer robust, accessible attributes over fragile class names.
 */

const FlowSelectors = {
    // We will try multiple strategies to find the input
    promptInput: [
        'textarea[aria-label*="prompt" i]',
        'textarea[placeholder*="prompt" i]',
        'textarea[placeholder*="describe" i]',
        'textarea[placeholder*="create" i]',
        'div[role="textbox"][aria-label*="prompt" i]',
        'div[role="textbox"][placeholder*="create" i]',
        'div[contenteditable="true"]',
        // Fallback generic textarea if only one prominent one exists
        'textarea'
    ],
    
    // Strategies to find the generate button
    generateButton: [
        'button[aria-label*="generate" i]',
        'button[aria-label*="create" i]',
        'button[aria-label*="send" i]',
        'button[aria-label*="submit" i]',
        'button[title*="send" i]',
        'div[role="button"][aria-label*="generate" i]'
    ]
};
