// ── Starfield ──────────────────────────────────────────────
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < 180; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.004 + 0.001
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.a += s.speed;
    const opacity = (Math.sin(s.a) + 1) / 2 * 0.7 + 0.05;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(150,200,255,${opacity})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

resize();
initStars();
drawStars();
window.addEventListener('resize', () => { resize(); initStars(); });

// ── Typing effect ───────────────────────────────────────────
const roles = [
  'MTech Software Engineer',
  'AI & ML Developer',
  'Data Science Enthusiast'
];
let ri = 0, ci = 0, deleting = false;
const el = document.getElementById('typingText');

function type() {
  const word = roles[ri];
  el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1600); return; }
  if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; setTimeout(type, 400); return; }
  setTimeout(type, deleting ? 40 : 75);
}
type();

// ── Nav scroll ──────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

// ── Hamburger ───────────────────────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  const nl = document.querySelector('.nav-links');
  const open = nl.style.display === 'flex';
  if (!open) {
    nl.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:68px;left:0;right:0;background:rgba(4,8,16,0.97);padding:24px 28px;gap:18px;border-bottom:1px solid rgba(30,144,255,0.12);z-index:99';
  } else {
    nl.style.display = 'none';
  }
});

// ── Project filter ──────────────────────────────────────────
document.querySelectorAll('.ftab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.proj-card').forEach(card => {
      const c = card.dataset.category || '';
      card.classList.toggle('hidden', f !== 'all' && !c.includes(f));
    });
  });
});

// ── Scroll reveal ───────────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }, i * 70);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.proj-card,.skill-cat,.contact-card,.other-item,.focus-card,.lang-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease, border-color 0.3s, box-shadow 0.3s';
  obs.observe(el);
});

// ── Smooth scroll ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});