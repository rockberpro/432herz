document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(['herzing432_pressed', 'herzing440_pressed'], function(result) {
        if (result.herzing432_pressed) {
            document.getElementById('herzing432').classList.add("pressed");
        }
        if (result.herzing440_pressed) {
            document.getElementById('herzing440').classList.add("pressed");
        }
    });
})

const herzing432 = document.getElementById('herzing432')
if (herzing432) {
    herzing432.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["432hz.js"]
            });
        }

        herzing432.classList.toggle("pressed");
        document.getElementById('herzing440').classList.remove("pressed");

        chrome.storage.local.set({ herzing432_pressed: true });
        chrome.storage.local.set({ herzing440_pressed: false });
    });    
}

const herzing440 = document.getElementById('herzing440')
if (herzing440) {
    herzing440.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["440hz.js"]
            });
        }

        herzing440.classList.toggle("pressed");
        document.getElementById('herzing432').classList.remove("pressed");

        chrome.storage.local.set({ herzing432_pressed: false });
        chrome.storage.local.set({ herzing440_pressed: true });
    });   
}