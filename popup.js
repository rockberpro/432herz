
(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
        chrome.storage.local.get([`herzing432_${tab.id}`, `herzing440_${tab.id}`], (result) => {

            if (result[`herzing432_${tab.id}`]) {
                document.getElementById('herzing432').classList.toggle("pressed");
                document.getElementById('herzing440').classList.remove("pressed");
            }

            if (result[`herzing440_${tab.id}`]) {
                document.getElementById('herzing440').classList.toggle("pressed");
                document.getElementById('herzing432').classList.remove("pressed");
            }
        });
    }
})();

const herzing432 = document.getElementById('herzing432');
if (herzing432) {
    herzing432.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["432hz.js"]
            });

            update432HerzingTabState(tab.id, false);
            update440HerzingTabState(tab.id, true);

            document.getElementById('herzing432').classList.toggle("pressed");
            document.getElementById('herzing440').classList.remove("pressed");
        }
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

            update432HerzingTabState(tab.id, false);
            update440HerzingTabState(tab.id, true);

            herzing440.classList.toggle("pressed");
            document.getElementById('herzing432').classList.remove("pressed");
        }
    });
}

function update432HerzingTabState(tabId, pressed) {
    chrome.storage.local.set({ [`herzing432_${tabId}`]: pressed }, () => {});
}

function update440HerzingTabState(tabId, pressed) {
    chrome.storage.local.set({ [`herzing440_${tabId}`]: pressed }, () => {});
}