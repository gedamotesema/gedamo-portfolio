// Typed Text Effect
const typedStrings = [
  "Software Engineer.",
  "Digitization Manager.",
  "AI Enthusiast.",
  "Building innovative fintech solutions.",
  "Connecting tradition & technology.",
];

let typedIndex = 0,
    charIndex = 0,
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDelay = 1500,
    isDeleting = false;

const typedTextEl = document.getElementById('typed-text');

function type() {
  const currentString = typedStrings[typedIndex];
  if (!isDeleting) {
    typedTextEl.textContent = currentString.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentString.length) {
      isDeleting = true;
      setTimeout(type, pauseDelay);
    } else {
      setTimeout(type, typingSpeed);
    }
  } else {
    typedTextEl.textContent = currentString.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      typedIndex = (typedIndex + 1) % typedStrings.length;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(type, deletingSpeed);
    }
  }
}
type();

// Smooth scroll + nav active highlight
const navLinks = document.querySelectorAll('#navbar a');
const sections = [...navLinks].map(link => document.querySelector(link.getAttribute('href')));
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + window.innerHeight / 3;
  sections.forEach((section, idx) => {
    if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[idx].classList.add('active');
    }
  });
});

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({behavior: 'smooth'});
  });
});

// Skills radial progress circles creation and animation
const skillsData = [
  { skill: "PHP / Laravel", percent: 85 },
  { skill: "JavaScript / Frontend", percent: 80 },
  { skill: "MySQL / Databases", percent: 78 },
  { skill: "Linux / DevOps", percent: 70 },
  { skill: "Team Leadership", percent: 85 },
];

const skillsContainer = document.querySelector('.skills-container');

skillsData.forEach(({skill, percent}) => {
  const skillCircle = document.createElement('div');
  skillCircle.classList.add('skill-circle');
  skillCircle.setAttribute('tabindex', '0');

  skillCircle.innerHTML = `
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle class="bg" cx="70" cy="70" r="70" />
      <circle class="fg" cx="70" cy="70" r="70" />
    </svg>
    <div class="percent">${percent}%</div>
    <div class="skill-label">${skill}</div>
  `;
  skillsContainer.appendChild(skillCircle);

  // Animate circle stroke offset after DOM insert
  const fgCircle = skillCircle.querySelector('circle.fg');
  const radius = fgCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  fgCircle.style.strokeDasharray = circumference;
  fgCircle.style.strokeDashoffset = circumference;

  setTimeout(() => {
    const offset = circumference - (percent / 100) * circumference;
    fgCircle.style.strokeDashoffset = offset;
  }, 200);
});

// Contact form validation & feedback
const form = document.getElementById('contactForm');
const formMessage = form.querySelector('.form-message');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill all fields.';
    return;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = 'Please enter a valid email.';
    return;
  }

  formMessage.textContent = 'Message sent! Thank you.';
  form.reset();
});

// PARTICLES BACKGROUND

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let width, height, particles;

function initCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.3
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 213, ${p.alpha})`;
    ctx.fill();

    // Move
    p.x += p.speedX;
    p.y += p.speedY;

    // Wrap around
    if (p.x > width) p.x = 0;
    else if (p.x < 0) p.x = width;
    if (p.y > height) p.y = 0;
    else if (p.y < 0) p.y = height;
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
  initCanvas();
});
initCanvas();// === Scroll Progress Bar ===
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scrollProgress').style.width = `${scrolled}%`;
});

// === Dark / Light Mode Toggle ===
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.body.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }
});

// === Signal Card 3D Tilt Hover ===
document.querySelectorAll('.signal-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    card.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
});

drawParticles();
