/* YouTube Injector Script */
(function() {
    /**
     * Checks if an ad is playing
     * * if `div.ad-showing` is null, it means the main video is playing
     * @return {boolean}
     */
    function isMainVideo() {
        return document.querySelector("div.ad-showing") === null;
    }

    function applyHzScript(tabId, mode) {
        if (mode === '432') {
            // 432hz.js
            window.stream = document.querySelector('video');
            if (window.stream) {
                window.stream.preservesPitch = false;
                window.stream.playbackRate = 432 / 440;
            }
        } else if (mode === '440') {
            // 440hz.js
            window.stream = document.querySelector('video');
            if (window.stream) {
                window.stream.preservesPitch = true;
                window.stream.playbackRate = 1;
            }
        }
    }

    let currentMode = null;
    let observer = null;
    let intervalId = null;

    function clearWatchers() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    /**
     * Waits for the main video to load and applies the Hz script
     * @param {*} tabId 
     * @param {*} mode 
     */
    function waitForMainVideoAndApply(tabId, mode) {
        clearWatchers();
        currentMode = mode;
        const tryApply = () => {
            if (isMainVideo()) {
                applyHzScript(tabId, mode);
            }
        };
        // Observes changes in the DOM
        observer = new MutationObserver(tryApply);
        observer.observe(document.body, { childList: true, subtree: true });
        // Applies continuously every 1 second
        intervalId = setInterval(tryApply, 1000);
    }

    // Getting the tabId via chrome.runtime (message from background)
    chrome.runtime.sendMessage({ action: 'getTabId' }, (response) => {
        const tabId = response?.tabId;
        if (!tabId) return;
        function checkAndApply() {
            chrome.storage.local.get([
                `herz432_${tabId}`,
                `herz440_${tabId}`,
                'herz_all_tabs',
                'herz432_global',
                'herz440_global'
            ], (result) => {
                // Check if the "All tabs" option is enabled
                if (result.herz_all_tabs) {
                    // If "All tabs" is enabled, use global settings
                    if (result.herz432_global) {
                        waitForMainVideoAndApply(tabId, '432');
                    } else if (result.herz440_global) {
                        waitForMainVideoAndApply(tabId, '440');
                    } else {
                        clearWatchers();
                    }
                } else {
                    // Otherwise, use tab-specific settings
                    if (result[`herz432_${tabId}`]) {
                        waitForMainVideoAndApply(tabId, '432');
                    } else if (result[`herz440_${tabId}`]) {
                        waitForMainVideoAndApply(tabId, '440');
                    } else {
                        clearWatchers();
                    }
                }
            });
        }
        checkAndApply();
        // Listen for changes in storage and re-apply if needed
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === 'local') {
                const relevantKeys = [
                    `herz432_${tabId}`,
                    `herz440_${tabId}`,
                    'herz_all_tabs',
                    'herz432_global',
                    'herz440_global'
                ];
                const hasRelevantChanges = relevantKeys.some(key => changes[key]);
                if (hasRelevantChanges) {
                    checkAndApply();
                }
            }
        });
    });
})();
