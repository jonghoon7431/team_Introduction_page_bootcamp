document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("audio");
    const playPauseButton = document.getElementById("playPause");
    const stopButton = document.getElementById("stop");
  
    playPauseButton.addEventListener("click", function() {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
        }
    });
  
    stopButton.addEventListener("click", function() {
        audio.pause();
        audio.currentTime = 0;
        playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
    });
  });