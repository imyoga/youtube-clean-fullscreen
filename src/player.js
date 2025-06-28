function getPlayerElement() {
    // Search for the YouTube player element
    if ("/watch" === location.pathname || /\/(shorts\/|live$)/.test(location.pathname)) {
        const moviePlayer = document.getElementById("movie_player");
        if (moviePlayer && moviePlayer.hideControls) {
            return moviePlayer;
        }
    }
    else if (/^\/(user|channel|c\/)/.test(location.pathname)) {
        const c4Player = document.getElementById("c4-player");
        if (c4Player && c4Player.hideControls) {
            return c4Player;
        }
    }

    // Search by class
    const videoPlayers = document.getElementsByClassName("html5-video-player");
    for (let player of videoPlayers) {
        if (player.hideControls) {
            return player;
        }
    }

    // Search by tag name
    const videoElement = document.getElementsByTagName("video");
    for (let player of videoElement) {
        if (player.offsetParent !== null) {
            return player.parentElement.parentElement;
        }
    }

    return null;
}

function hideControls() {
    const player = getPlayerElement();
    
    if (player) {
        player.hideControls();
    }
    
    // Add class to hide all YouTube overlays and controls
    document.body.classList.add("hide-all-youtube-controls");
}

function showControls() {
    const player = getPlayerElement();
    
    if (player) {
        player.showControls();
    }
    
    // Remove class to show controls
    document.body.classList.remove("hide-all-youtube-controls");
}

function hideCursor() {
    document.body.classList.add("hide-youtube-cursor");
}

function showCursor() {
    document.body.classList.remove("hide-youtube-cursor");
}



// Listen for messages from content script
window.addEventListener("message", function(event) {
    if (event.source != window || !event.data.source || event.data.source !== "YOUTUBE_HIDE_CONTROL") {
        return;
    }

    if (event.data.action === "SHOW_PLAYER") {
        showControls();
    }
    else if (event.data.action === "HIDE_PLAYER") {
        hideControls();
    }
    else if (event.data.action === "HIDE_CURSOR") {
        hideCursor();
    }
    else if (event.data.action === "SHOW_CURSOR") {
        showCursor();
    }
}, false);
