chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        chrome.storage.local.set({ [`herzing432_${tabId}`]: false }, () => {});
        chrome.storage.local.set({ [`herzing440_${tabId}`]: false }, () => {});
    }
});