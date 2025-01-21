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
    });   
}