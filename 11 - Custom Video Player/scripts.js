// Step 1: Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Step 2: Build out functions

// Toggle play
function togglePlay() {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
};

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// Update play button
function toggleButton() {
  if (this.paused) {
    toggle.innerHTML = '►';
  } else {
    toggle.innerText = 'P';
  }
};

video.addEventListener('play', toggleButton);
video.addEventListener('pause', toggleButton);

// Skip forwards and backwards
function skipPlayback() {
  skipDistance = parseFloat(this.dataset.skip);
  video.currentTime += skipDistance;
};

skipButtons.forEach(button => {
  button.addEventListener('click', skipPlayback);
});

// Adjust ranges
function adjustRanges() {
  video[this.name] = this.value;
};

// Note the 'mousemove' event here (could also be 'change')
ranges.forEach(range => {
  range.addEventListener('mousemove', adjustRanges);
});

// Update progress bar
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

video.addEventListener('timeupdate', updateProgress);

// Handle progress bar
function handleProgress(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

let mouseDown = false;
progress.addEventListener('click', handleProgress);
progress.addEventListener('mousemove', (e) => mouseDown && handleProgress(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);



