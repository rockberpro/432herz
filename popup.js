document.addEventListener("DOMContentLoaded", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
        chrome.storage.local.get([`herz432_${tab.id}`, `herz440_${tab.id}`], (result) => {

            if (result[`herz432_${tab.id}`]) {
                document.getElementById('herz432').classList.toggle("pressed");
                document.getElementById('herz440').classList.remove("pressed");
            }

            if (result[`herz440_${tab.id}`]) {
                document.getElementById('herz440').classList.toggle("pressed");
                document.getElementById('herz432').classList.remove("pressed");
            }
        });
    }
});

const herz432 = document.getElementById('herz432');
if (herz432) {
    herz432.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["432hz.js"]
            });

            update432HerzingTabState(tab.id, true);
            update440HerzingTabState(tab.id, false);

            document.getElementById('herz432').classList.toggle("pressed");
            document.getElementById('herz440').classList.remove("pressed");
        }
    });
}

const herz440 = document.getElementById('herz440');
if (herz440) {
    herz440.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["440hz.js"]
            });

            update432HerzingTabState(tab.id, false);
            update440HerzingTabState(tab.id, true);

            herz440.classList.toggle("pressed");
            document.getElementById('herz432').classList.remove("pressed");
        }
    });
}

function update432HerzingTabState(tabId, pressed) {
    chrome.storage.local.set({ [`herz432_${tabId}`]: pressed }, () => {});
}

function update440HerzingTabState(tabId, pressed) {
    chrome.storage.local.set({ [`herz440_${tabId}`]: pressed }, () => {});
}