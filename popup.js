// document.addEventListener("DOMContentLoaded", () => {

    // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //     if (changeInfo.status === "complete") {
    //         chrome.storage.local.get([`herzing432_${tabId}`], (result) => {
    //             const tabState = result[`herzing432_${tabId}`] || [null, null]; // Default state
    //             console.log(`Tab ${tabId} state loaded:`, tabState);
    //         });
    //         }
    //     });

    // chrome.storage.local.get(['herzing432_pressed', 'herzing440_pressed'], function(result) {
    //     if (result.herzing432_pressed) {
    //         document.getElementById('herzing432').classList.add("pressed");
    //     }
    //     if (result.herzing440_pressed) {
    //         document.getElementById('herzing440').classList.add("pressed");
    //     }
    // });
// })

const herzing432 = document.getElementById('herzing432')
if (herzing432) {
    herzing432.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["432hz.js"]
            });
            
            herzing432.classList.toggle("pressed");
            document.getElementById('herzing440').classList.remove("pressed");
            
            chrome.storage.local.get('tabs', function(result) {
                console.log(result.tabs);

                index = tab.id.toString();

                // if (result.tabs[index].herzing432_pressed) {
                //     document.getElementById('herzing432').classList.add("pressed");
                // }
                // if (result.tabs[index].herzing440_pressed) {
                //     document.getElementById('herzing440').classList.add("pressed");
                // }

                update432HerzingTabState(tab.id, true);
                update440HerzingTabState(tab.id, false);
            });
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

            herzing440.classList.toggle("pressed");
            document.getElementById('herzing432').classList.remove("pressed");

            chrome.storage.local.get('tabs', function(result) {
                console.log(result.tabs);

                // if (result.tabs[index].herzing432_pressed) {
                //     document.getElementById('herzing432').classList.add("pressed");
                // }
                // if (result.tabs[index].herzing440_pressed) {
                //     document.getElementById('herzing440').classList.add("pressed");
                // }

                update432HerzingTabState(tab.id, false);
                update440HerzingTabState(tab.id, true);
            });
        }
    });
}

function update432HerzingTabState(tabId, pressed) {
    const tabState = [pressed];
    chrome.storage.local.set({ [`herzing432_${tabId}`]: tabState }, () => {
        console.log(`432Herzing pressed:`, tabState);
    });
}

function update440HerzingTabState(tabId, pressed) {
    const tabState = [pressed];
    chrome.storage.local.set({ [`herzing440_${tabId}`]: tabState }, () => {
        console.log(`440Herzing pressed:`, tabState);
    });
}