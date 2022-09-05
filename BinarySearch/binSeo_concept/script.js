const img = document.getElementById('main-img');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const progressBar = document.getElementById('bar');
const toggleButton = document.getElementById('toggle');
const playImg = document.getElementById('play-img');
const pauseImg = document.getElementById('pause-img');
const currentFrame = document.getElementById('current-frame');
const totalFrames = document.getElementById('total-frames');

const pace = 1500;

let currentCount = 0;
let interval;
let playing = true;
const max = 10;

totalFrames.innerText = max;

const toggle = () => {
  if (playing) {
    stop();
    progressBar.style.transition = ``;
  } else {
    interval = play();
  }
}

toggleButton.addEventListener('click', toggle);

window.addEventListener('keypress', e => {
  if (e.key === ' ' || e.key === 'Spacebar') {
    toggle();
  }
});

const renderImage = index => {
  currentFrame.innerText = index;
  const src = `assets/frame_${index.toString().padStart(2, '0')}_delay-2s.gif`
  document.querySelectorAll('.interactive-img').forEach(el => el.style.display = "none");
  document.querySelector(`img[src="${src}"]`).style.display = "inline-block";
}

const renderProgress = () => {
  const percent = Math.max(Math.floor(currentCount / max * 100), 1);
  progressBar.style.width = `${percent}%`;
  progressBar.style.transition = ``;
}

const animateProgress = () => {
  const percent = Math.floor(currentCount / max * 100);
  progressBar.style.width = `${percent}%`;
  progressBar.style.transition = `${pace/2000}s`;
}

const goBack = () => {
  currentCount = currentCount === 0
  ? max
  : (currentCount - 1) % max;
}

const advance = () => {
  currentCount = (currentCount + 1) % (max + 1);
}

const stop = () => {
  window.clearInterval(interval);
  playing = false;
  pauseImg.classList.add('hidden');
  playImg.classList.remove('hidden');
}
const play =  () => {
  playing = true;
  playImg.classList.add('hidden');
  pauseImg.classList.remove('hidden');
  return window.setInterval(() => {
    advance();
    renderImage(currentCount);
    animateProgress();
  }, pace);
}

previous.addEventListener('click', () => {
  stop();
  goBack();
  renderImage(currentCount);
  renderProgress();
});

next.addEventListener('click', () => {
  stop();
  advance();
  renderImage(currentCount);
  renderProgress();
});

// autoplay
interval = play();
