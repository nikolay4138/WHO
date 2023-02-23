// Define variables for the player and the control buttons
let player;
let playButton;
let muteButton;
let seekBar;
let fullScreenButton;

// Define a function to create the YouTube player
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "medFVIvmevU",
    playerVars: {
      controls: 0,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

// Define a function to initialize the player controls
function onPlayerReady(event) {
  // Get references to the control buttons and seek bar
  playButton = document.querySelector(".play-btn");
  muteButton = document.querySelector(".mute-btn");
  seekBar = document.querySelector(".seek-bar");
  fullScreenButton = document.querySelector(".fullscreen-btn");

  // Add event listeners for the control buttons and seek bar
  playButton.addEventListener("click", togglePlay);
  muteButton.addEventListener("click", toggleMute);
  seekBar.addEventListener("input", seekTo);
  fullScreenButton.addEventListener("click", toggleFullScreen);

  // Set the maximum value of the seek bar to the video duration
  seekBar.max = player.getDuration();

  // Call the updateSeekBar function every 100 milliseconds to update the seek bar position
  setInterval(updateSeekBar, 100);
}

// Define a function to toggle the play/pause state of the video
function togglePlay() {
  if (player.getPlayerState() == 1) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

// Define a function to toggle the mute/unmute state of the video
function toggleMute() {
  if (player.isMuted()) {
    player.unMute();
  } else {
    player.mute();
  }
}

// Define a function to seek to a specific position in the video
function seekTo() {
  player.seekTo(seekBar.value, true);
}

// Define a function to update the position of the seek bar
function updateSeekBar() {
  seekBar.value = player.getCurrentTime();
}

// Define a function to toggle fullscreen mode
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    player.getIframe().requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
