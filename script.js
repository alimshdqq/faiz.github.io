// mark JS as active so scroll-reveal CSS only applies when it can be reversed
document.documentElement.classList.add('js-ready');

// ===================================================
// MOBILE NAV TOGGLE
// ===================================================
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

// ===================================================
// SCROLL REVEAL (with fallback if IntersectionObserver unsupported)
// ===================================================
const reveals = document.querySelectorAll('.reveal');
const bars = document.querySelectorAll('.progress-bar');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => revealObserver.observe(el));

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(bar => barObserver.observe(bar));
} else {
  // fallback: just show everything, no scroll-triggered animation
  reveals.forEach(el => el.classList.add('in-view'));
  bars.forEach(bar => bar.style.width = bar.dataset.width + '%');
}

// ===================================================
// TYPEWRITER EFFECT — hero code editor
// ===================================================
const typewriterEl = document.getElementById('typewriter');
const codeLines = [
  'const alim = {',
  '  nama: "Faiz Alim Asshidiq",',
  '  asal: "Bekasi, Indonesia",',
  '  sekolah: "IDN Boarding School",',
  '  jurusan: "RPL",',
  '  status: "belajar jadi programmer"',
  '};'
];

function typeCode() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    typewriterEl.textContent = codeLines.join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let output = '';

  function step() {
    if (lineIndex >= codeLines.length) return;
    const currentLine = codeLines[lineIndex];

    if (charIndex < currentLine.length) {
      output += currentLine[charIndex];
      charIndex++;
      typewriterEl.textContent = output;
      setTimeout(step, 18 + Math.random() * 20);
    } else {
      output += '\n';
      lineIndex++;
      charIndex = 0;
      typewriterEl.textContent = output;
      setTimeout(step, 120);
    }
  }
  step();
}

// start typing once the hero visual scrolls into view (or immediately if already visible)
const heroVisual = document.querySelector('.hero-visual');
let typed = false;
const typeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !typed) {
      typed = true;
      typeCode();
      typeObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
if (heroVisual) typeObserver.observe(heroVisual);

// ===================================================
// ACTIVE NAV LINK ON SCROLL
// ===================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(sec => navObserver.observe(sec));

// ===================================================
// STICKY NAVBAR SHADOW
// ===================================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20 ? '0 8px 24px -12px rgba(0,0,0,0.5)' : 'none';
});

// ===================================================
// FOOTER YEAR
// ===================================================
document.querySelector('.footer-year').textContent = `© ${new Date().getFullYear()} Faiz Alim Asshidiq`;
