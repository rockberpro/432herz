chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {

        update432HerzingTabState(tabId, false);
        update440HerzingTabState(tabId, false);

        document.getElementById('herzing432').classList.remove("pressed");
        document.getElementById('herzing440').classList.remove("pressed");
    }
});

function update432HerzingTabState(tabId, pressed) {
    chrome.storage.local.set({ [`herzing432_${tabId}`]: pressed }, () => {});
}

function update440HerzingTabState(tabId, pressed) {
    chrome.storage.local.set({ [`herzing440_${tabId}`]: pressed }, () => {});
}