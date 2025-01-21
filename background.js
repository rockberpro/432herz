chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        chrome.storage.local.set({ herzing432_pressed: false }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error resetting storage:", chrome.runtime.lastError);
            }
            else {}
        });

        chrome.storage.local.set({ herzing440_pressed: false }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error resetting storage:", chrome.runtime.lastError);
            }
            else {}
        });
    }
});