const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const pic = document.getElementById("pic");
const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("#durTime");

// Song titles
const songs = ["hey", "summer", "ukulele"];
const tracks = [
  { src: "music/0903_rapeig.mp3", name: "Rapeig", cover: "image/hey.jpg" },
  {
    src: "music/0708_preview_song.mp3",
    name: "Preview Song",
    cover: "image/ukulele.jpg",
  },
];

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
// loadSong(songs[songIndex]);
loadSong(tracks[songIndex]);
// console.log(tracks[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song.name;
  audio.src = `${song.src}`;
  cover.src = `${song.cover}`;
  // pic.src = `${song.cover}`;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = tracks.length - 1;
  }

  // loadSong(songs[songIndex]);
  loadSong(tracks[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > tracks.length - 1) {
    songIndex = 0;
  }

  // loadSong(songs[songIndex]);
  loadSong(tracks[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime(e) {
  const { duration, currentTime } = e.srcElement;
  var sec;
  var sec_d;

  // define minutes currentTime
  let min = currentTime == null ? 0 : Math.floor(currentTime / 60);
  min = min < 10 ? "0" + min : min;

  // define seconds currentTime
  function get_sec(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec = Math.floor(x) - 60 * i;
          sec = sec < 10 ? "0" + sec : sec;
        }
      }
    } else {
      sec = Math.floor(x);
      sec = sec < 10 ? "0" + sec : sec;
    }
  }

  get_sec(currentTime, sec);

  // change currentTime DOM
  if (currTime !== null) {
    currTime.innerHTML = min + ":" + sec;
  }

  // define minutes duration
  let min_d = isNaN(duration) === true ? "0" : Math.floor(duration / 60);
  min_d = min_d < 10 ? "0" + min_d : min_d;

  function get_sec_d(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec_d = Math.floor(x) - 60 * i;
          sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
        }
      }
    } else {
      sec_d = isNaN(duration) === true ? "0" : Math.floor(x);
      sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
    }
  }

  // define seconds duration

  get_sec_d(duration);

  // change duration DOM
  if (currTime !== null) {
    durTime.innerHTML = min_d + ":" + sec_d;
  }
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

// Time of song
audio.addEventListener("timeupdate", DurTime);

// const audioPlayer = document.getElementById("audio-player");
// const trackNameDisplay = document.getElementById("track-name"); // Get the track name element

// // List of music tracks
// const tracks = [
//   { src: "music/0903_rapeig.mp3", name: "Rapeig" },
//   { src: "music/0708_preview_song.mp3", name: "Preview Song" },
// ];

// let currentTrack = 0;

// // Function to load and play the current track
// function loadTrack(trackIndex) {
//   audioPlayer.src = tracks[trackIndex].src;
//   audioPlayer.play();
//   trackNameDisplay.textContent = `Ara sona: ${tracks[trackIndex].name}`; // Update the track name
// }

// // Play the next track
// function nextTrack() {
//   currentTrack = (currentTrack + 1) % tracks.length;
//   loadTrack(currentTrack);
// }

// // Play the previous track
// function prevTrack() {
//   currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
//   loadTrack(currentTrack);
// }

// // Load the initial track
// loadTrack(currentTrack);
