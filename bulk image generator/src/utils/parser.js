/**
 * Parses a string of text containing multiple prompts separated by blank lines.
 * @param {string} text 
 * @returns {string[]} Array of parsed prompts
 */
export function parsePrompts(text) {
    if (!text || typeof text !== 'string') {
        return [];
    }

    // Split by two or more newlines (Windows \r\n or Linux \n)
    const blocks = text.split(/\n\s*\n/);
    
    return blocks
        .map(block => block.trim())
        .filter(block => block.length > 0);
}
