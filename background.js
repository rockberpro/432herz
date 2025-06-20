chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        /* commented so the tab state doesn't get erased on reload */
        // chrome.storage.local.set({ [`herz432_${tabId}`]: false }, () => {});
        // chrome.storage.local.set({ [`herz440_${tabId}`]: false }, () => {});
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getTabId') {
        sendResponse({ tabId: sender.tab ? sender.tab.id : null });
    }
});