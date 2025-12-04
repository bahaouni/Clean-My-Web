document.addEventListener('DOMContentLoaded', () => {
    const editModeBtn = document.getElementById("editModeBtn");
    const toggleCleaningBtn = document.getElementById("toggleCleaningBtn");
    const resetSiteBtn = document.getElementById("resetSiteBtn");
    const statusMsg = document.getElementById("statusMsg");

    // Helper to send message to active tab
    function sendMessageToTab(message) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, message);
            }
        });
    }

    // Activer le mode édition
    editModeBtn.addEventListener("click", () => {
        sendMessageToTab({ action: "ENABLE_EDIT_MODE" });
        window.close(); // Close popup so user can interact with page
    });

    // Toggle cleaning (show/hide hidden elements)
    toggleCleaningBtn.addEventListener("click", () => {
        sendMessageToTab({ action: "TOGGLE_CLEANING" });
    });

    // Before/After mode
    document.getElementById("beforeAfterBtn").addEventListener("click", () => {
        sendMessageToTab({ action: "TOGGLE_BEFORE_AFTER" });
    });

    // Reset du site
    resetSiteBtn.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (!tabs[0]) return;
            const url = new URL(tabs[0].url).hostname;
            chrome.storage.local.remove(url, () => {
                chrome.tabs.reload(tabs[0].id);
                window.close();
            });
        });
    });

    // Ouvrir les options
    document.getElementById("openOptionsBtn").addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });
});
