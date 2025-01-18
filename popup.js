document.getElementById('herzing432').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["432hz.js"]
        });
    }
});

document.getElementById('herzing440').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["440hz.js"]
        });
    }
});