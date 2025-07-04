document.addEventListener("DOMContentLoaded", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if the "All tabs" option is enabled
    chrome.storage.local.get(['herz_all_tabs', `herz432_${tab.id}`, `herz440_${tab.id}`, 'herz432_global', 'herz440_global'], (result) => {
        // Set the state of the "All tabs" checkbox
        document.getElementById('allTabs').checked = result.herz_all_tabs === true;

        if (result.herz_all_tabs) {
            // If "All tabs" is enabled, use global settings
            if (result.herz432_global) {
                document.getElementById('herz432').classList.toggle("pressed");
                document.getElementById('herz440').classList.remove("pressed");
            }

            if (result.herz440_global) {
                document.getElementById('herz440').classList.toggle("pressed");
                document.getElementById('herz432').classList.remove("pressed");
            }
        } else if (tab?.id) {
            // Otherwise, use the specific tab settings
            if (result[`herz432_${tab.id}`]) {
                document.getElementById('herz432').classList.toggle("pressed");
                document.getElementById('herz440').classList.remove("pressed");
            }

            if (result[`herz440_${tab.id}`]) {
                document.getElementById('herz440').classList.toggle("pressed");
                document.getElementById('herz432').classList.remove("pressed");
            }
        }
    });

    // Add listener for the "All tabs" checkbox
    document.getElementById('allTabs').addEventListener('change', function() {
        const allTabsEnabled = this.checked;
        chrome.storage.local.set({ 'herz_all_tabs': allTabsEnabled }, () => {
            // If "All tabs" is activated, copy current tab settings to global settings
            if (allTabsEnabled && tab?.id) {
                chrome.storage.local.get([`herz432_${tab.id}`, `herz440_${tab.id}`], (result) => {
                    chrome.storage.local.set({ 
                        'herz432_global': result[`herz432_${tab.id}`] || false,
                        'herz440_global': result[`herz440_${tab.id}`] || false
                    });
                });
            }
        });
    });
});

const herz432 = document.getElementById('herz432');
if (herz432) {
    herz432.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const allTabsEnabled = document.getElementById('allTabs').checked;

        if (allTabsEnabled) {
            // Apply to all YouTube tabs
            const youtubeTabs = await chrome.tabs.query({ url: "*://*.youtube.com/*" });
            for (const ytTab of youtubeTabs) {
                chrome.scripting.executeScript({
                    target: { tabId: ytTab.id },
                    files: ["432hz.js"]
                });
            }

            // Update global settings
            chrome.storage.local.set({
                'herz432_global': true,
                'herz440_global': false
            });
        } else if (tab?.id) {
            // Apply only to the current tab
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["432hz.js"]
            });

            update432HerzingTabState(tab.id, true);
            update440HerzingTabState(tab.id, false);
        }

        document.getElementById('herz432').classList.toggle("pressed");
        document.getElementById('herz440').classList.remove("pressed");
    });
}

const herz440 = document.getElementById('herz440');
if (herz440) {
    herz440.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const allTabsEnabled = document.getElementById('allTabs').checked;

        if (allTabsEnabled) {
            // Apply to all YouTube tabs
            const youtubeTabs = await chrome.tabs.query({ url: "*://*.youtube.com/*" });
            for (const ytTab of youtubeTabs) {
                chrome.scripting.executeScript({
                    target: { tabId: ytTab.id },
                    files: ["440hz.js"]
                });
            }

            // Update global settings
            chrome.storage.local.set({
                'herz432_global': false,
                'herz440_global': true
            });
        } else if (tab?.id) {
            // Apply only to the current tab
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["440hz.js"]
            });

            update432HerzingTabState(tab.id, false);
            update440HerzingTabState(tab.id, true);
        }

        herz440.classList.toggle("pressed");
        document.getElementById('herz432').classList.remove("pressed");
    });
}

function update432HerzingTabState(tabId, pressed) {
    chrome.storage.local.set({ [`herz432_${tabId}`]: pressed }, () => {});
}

function update440HerzingTabState(tabId, pressed) {
    chrome.storage.local.set({ [`herz440_${tabId}`]: pressed }, () => {});
}