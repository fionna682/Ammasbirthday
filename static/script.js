const screens = {
  envelope: document.getElementById('envelope-screen'),
  letter: document.getElementById('letter-screen'),
  birthday: document.getElementById('birthday-screen'),
  reveal: document.getElementById('reveal-screen')
};

function showScreen(name) {
  for (const [key, screen] of Object.entries(screens)) {
    const active = key === name;
    screen.hidden = !active;
    screen.classList.toggle('active', active);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let particles = [];
let frameRequest = null;
const colors = ['#c15d72', '#d9a95e', '#f9dbc2', '#ffffff', '#e88d96', '#aa7899'];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function celebrate(amount = 210) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  for (let i = 0; i < amount; i++) {
    particles.push({
      x: width * (0.12 + Math.random() * 0.76),
      y: -50 - Math.random() * height * 0.55,
      vx: (Math.random() - .5) * 6,
      vy: 2.4 + Math.random() * 3.5,
      gravity: .055 + Math.random() * .075,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - .5) * .18,
      size: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      sway: Math.random() * Math.PI * 2
    });
  }
  if (!frameRequest) animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles = particles.filter(p => p.y < window.innerHeight + 25);
  for (const p of particles) {
    p.x += p.vx + Math.sin(p.sway) * .7;
    p.y += p.vy;
    p.vy += p.gravity;
    p.sway += .05;
    p.rotation += p.spin;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  }
  if (particles.length) {
    frameRequest = requestAnimationFrame(animateConfetti);
  } else {
    frameRequest = null;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

const envelopeButton = document.getElementById('envelope-button');
envelopeButton.addEventListener('click', () => {
  if (envelopeButton.classList.contains('opening')) return;
  envelopeButton.classList.add('opening');
  celebrate(155);
  setTimeout(() => showScreen('letter'), 1100);
});

document.getElementById('continue-button').addEventListener('click', () => showScreen('birthday'));

const daySelect = document.getElementById('day');
for (let day = 1; day <= 31; day++) {
  const option = document.createElement('option');
  option.value = String(day);
  option.textContent = String(day).padStart(2, '0');
  daySelect.appendChild(option);
}
const monthSelect = document.getElementById('month');
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
monthNames.forEach((month, index) => {
  const option = document.createElement('option');
  option.value = String(index + 1);
  option.textContent = month;
  monthSelect.appendChild(option);
});

document.getElementById('birthday-form').addEventListener('submit', event => {
  event.preventDefault();
  const error = document.getElementById('error-message');
  if (Number(daySelect.value) === 22 && Number(monthSelect.value) === 11) {
    error.textContent = '';
    showScreen('reveal');
    celebrate(300);
    setTimeout(() => celebrate(120), 700);
  } else {
    error.textContent = 'Hmm… that doesn’t match the VIP birthday on our list. Try again! ♡';
  }
});

daySelect.addEventListener('change', () => document.getElementById('error-message').textContent = '');
monthSelect.addEventListener('change', () => document.getElementById('error-message').textContent = '');
document.getElementById('celebrate-again').addEventListener('click', () => celebrate(250));
document.getElementById('start-over').addEventListener('click', () => {
  envelopeButton.classList.remove('opening');
  document.getElementById('birthday-form').reset();
  document.getElementById('error-message').textContent = '';
  showScreen('envelope');
});
