// Inject player script
const script = document.createElement("script");
script.setAttribute("src", chrome.runtime.getURL("player.js"));
script.addEventListener("load", function() {
    this.remove();
});
(document.head || document.documentElement).appendChild(script);

// Inject styles
const style = document.createElement("link");
style.setAttribute("rel", "stylesheet");
style.setAttribute("href", chrome.runtime.getURL("player.css"));
(document.head || document.documentElement).appendChild(style);

// Simple state management
let hideControlsEnabled = false;
let hideCursorEnabled = false;
let isCurrentlyFullscreen = false;

// Load settings
chrome.storage.local.get(['hideControlsEnabled', 'hideCursorEnabled'], function(result) {
    hideControlsEnabled = result.hideControlsEnabled || false;
    hideCursorEnabled = result.hideCursorEnabled || false;
    updateControlsVisibility();
});

// Listen for settings changes from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'settingsChanged') {
        hideControlsEnabled = request.hideControlsEnabled;
        hideCursorEnabled = request.hideCursorEnabled;
        updateControlsVisibility();
    }
});

// Handle fullscreen changes
function onFullscreenChanged() {
    isCurrentlyFullscreen = Boolean(document.fullscreenElement);
    updateControlsVisibility();
}

document.addEventListener("fullscreenchange", onFullscreenChanged);
document.addEventListener("fullscreenerror", onFullscreenChanged);

// Update controls visibility based on settings and fullscreen state
function updateControlsVisibility() {
    if (hideControlsEnabled && isCurrentlyFullscreen) {
        hideControls();
    } else {
        showControls();
    }
    
    // Handle cursor separately
    if (hideCursorEnabled && isCurrentlyFullscreen) {
        hideCursor();
    } else {
        showCursor();
    }
}

function hideControls() {
    window.postMessage({
        "source": "YOUTUBE_HIDE_CONTROL",
        "action": "HIDE_PLAYER"
    });
}

function showControls() {
    window.postMessage({
        "source": "YOUTUBE_HIDE_CONTROL",
        "action": "SHOW_PLAYER"
    });
}

function hideCursor() {
    window.postMessage({
        "source": "YOUTUBE_HIDE_CONTROL",
        "action": "HIDE_CURSOR"
    });
}

function showCursor() {
    window.postMessage({
        "source": "YOUTUBE_HIDE_CONTROL",
        "action": "SHOW_CURSOR"
    });
}
