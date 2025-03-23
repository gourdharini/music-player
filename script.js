const audio = document.getElementById("audio");
const fileInput = document.getElementById("fileInput");
const playPauseBtn = document.getElementById("playPauseBtn");
const stopBtn = document.getElementById("stopBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

// Load user-selected file
fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        audio.src = objectURL;
        audio.load();
        playPauseBtn.textContent = "▶️";
    }
});

// Play/Pause functionality
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️";
    }
});

// Stop functionality
stopBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseBtn.textContent = "▶️";
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
        durationDisplay.textContent = formatTime(audio.duration);
    }
});

// Seek functionality
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Format time helper function
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
