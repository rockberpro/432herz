/* YouTube Injector Script */
(function() {
    /**
     * Checks if an ad is playing
     * 
     * * if `div.ad-showing` is null, it means the main video is playing
     * 
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

    /**
     * Waits for the main video to load and applies the Hz script
     * @param {*} tabId 
     * @param {*} mode 
     */
    function waitForMainVideoAndApply(tabId, mode) {
        const tryApply = () => {
            if (isMainVideo()) {
                applyHzScript(tabId, mode);
            }
        };
        /* Observes changes in the DOM */
        const observer = new MutationObserver(tryApply);
        observer.observe(document.body, { childList: true, subtree: true });
        /** Applies continuously every 1 second */
        setInterval(tryApply, 1000);
    }

    /** Getting the tabId via chrome.runtime (mensagem do background) */
    chrome.runtime.sendMessage({ action: 'getTabId' }, (response) => {
        const tabId = response?.tabId;
        if (!tabId) return;
        chrome.storage.local.get([
            `herzing432_${tabId}`,
            `herzing440_${tabId}`
        ], (result) => {
            if (result[`herzing432_${tabId}`]) {
                waitForMainVideoAndApply(tabId, '432');
            } else if (result[`herzing440_${tabId}`]) {
                waitForMainVideoAndApply(tabId, '440');
            }
        });
    });
})();
