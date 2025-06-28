document.addEventListener('DOMContentLoaded', function() {
    const controlsToggle = document.getElementById('hideControlsToggle');
    const cursorToggle = document.getElementById('hideCursorToggle');
    const status = document.getElementById('status');

    // Load current settings
    chrome.storage.local.get(['hideControlsEnabled', 'hideCursorEnabled'], function(result) {
        controlsToggle.checked = result.hideControlsEnabled || false;
        cursorToggle.checked = result.hideCursorEnabled || false;
    });

    // Handle controls toggle change
    controlsToggle.addEventListener('change', function() {
        const isEnabled = controlsToggle.checked;
        
        chrome.storage.local.set({
            hideControlsEnabled: isEnabled
        }, function() {
            showStatus(isEnabled ? 'Controls will be hidden in fullscreen' : 'Controls will be visible in fullscreen', 'success');
            notifyContentScript();
        });
    });

    // Handle cursor toggle change
    cursorToggle.addEventListener('change', function() {
        const isEnabled = cursorToggle.checked;
        
        chrome.storage.local.set({
            hideCursorEnabled: isEnabled
        }, function() {
            showStatus(isEnabled ? 'Cursor will be hidden in fullscreen' : 'Cursor will be visible in fullscreen', 'success');
            notifyContentScript();
        });
    });

    function notifyContentScript() {
        // Notify content script of changes
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0] && tabs[0].url.includes('youtube.com')) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'settingsChanged',
                    hideControlsEnabled: controlsToggle.checked,
                    hideCursorEnabled: cursorToggle.checked
                });
            }
        });
    }

    function showStatus(message, type) {
        status.textContent = message;
        status.className = `status ${type}`;
        setTimeout(() => {
            status.style.display = 'none';
        }, 2000);
    }
}); 
