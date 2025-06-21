chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && (tab.url.includes("youtube.com") || tab.url.includes("music.youtube.com"))) {
        // Check if the "All tabs" option is enabled
        chrome.storage.local.get(['herz_all_tabs', 'herz432_global', 'herz440_global'], (result) => {
            if (result.herz_all_tabs) {
                // If "All tabs" is enabled, apply global settings
                if (result.herz432_global) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ["432hz.js"]
                    });
                } else if (result.herz440_global) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ["440hz.js"]
                    });
                }
            }
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getTabId') {
        sendResponse({ tabId: sender.tab ? sender.tab.id : null });
    }
});