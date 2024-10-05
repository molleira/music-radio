import { tracks } from "./tracks.js";

const audio = document.getElementById("audio");
const marquee = document.querySelectorAll(".marquee-text");
const title = document.querySelector(".title");
const info = document.querySelector(".info");

let songIndex = 0;
loadSong(tracks[songIndex]);

// Set track details
function loadSong(song) {
  audio.src = `${song.src}`;
  marquee.forEach(
    (title) => (title.innerText = `${song.artist} - ${song.name}`)
  );
  title.innerText = `${song.artist} - ${song.name}`;
  info.innerText = song.info;
}

// Play track
const player = document.getElementById("player");
const playBtn = document.getElementById("play");

function playSong() {
  player.classList.add("play");
  playBtn.classList.remove("fa-play");
  playBtn.classList.add("fa-pause");

  audio.play();
}

// Pause track
function pauseSong() {
  player.classList.remove("play");
  playBtn.classList.add("fa-play");
  playBtn.classList.remove("fa-pause");

  audio.pause();
}

// Previous track
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = tracks.length - 1;
  }
  loadSong(tracks[songIndex]);

  playSong();
}

// Next track
function nextSong() {
  songIndex++;

  if (songIndex > tracks.length - 1) {
    songIndex = 0;
  }
  loadSong(tracks[songIndex]);

  playSong();
}

audio.addEventListener("timeupdate", updateProgress);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth / 2; // because width is 50%
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = player.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change track
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Click on progress bar
player.addEventListener("click", setProgress);

// Track ends
audio.addEventListener("ended", nextSong);
