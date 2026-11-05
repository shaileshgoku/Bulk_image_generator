const GenerationMonitor = {
    isGenerating: false,
    checkInterval: null,

    /**
     * Starts monitoring for generation completion
     */
    startMonitoring(onComplete, onTimeout) {
        this.isGenerating = true;
        
        let attempts = 0;
        const maxAttempts = 300; // 5 minutes at 1 check per second
        
        // Wait a brief moment before starting checks, to let the UI react to the click
        setTimeout(() => {
            this.checkInterval = setInterval(() => {
                attempts++;
                
                if (attempts >= maxAttempts) {
                    this.stopMonitoring();
                    if (onTimeout) onTimeout();
                    return;
                }

                // Detection logic: if the button is enabled again, or if it says "Generate" again
                const btn = FlowDetector.findGenerateButton();
                if (btn) {
                    const isDisabled = btn.disabled || btn.getAttribute('aria-disabled') === 'true';
                    const text = (btn.textContent || '').trim().toLowerCase();
                    const isGeneratingText = text.includes('generating') || text.includes('creating') || text.includes('stop');
                    
                    // If the button is NOT disabled and does NOT say generating, it might be done.
                    // But we only conclude it's done if it was generating before.
                    if (!isDisabled && !isGeneratingText) {
                        this.stopMonitoring();
                        if (onComplete) onComplete();
                    }
                }
            }, 1000);
        }, 2000); // 2 second grace period before checking
    },

    stopMonitoring() {
        this.isGenerating = false;
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }
};
