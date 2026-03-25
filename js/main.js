// ─── FILTER ──────────────────────────────────────────────
function filterTools(category) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  document.querySelectorAll('.tool-card').forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.classList.toggle('hidden', !match);
    if (match) {
      card.classList.remove('visible');
      requestAnimationFrame(() => card.classList.add('visible'));
    }
  });
}

// ─── SEARCH ──────────────────────────────────────────────
function handleSearch() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!q) return;
  document.querySelectorAll('.tool-card').forEach(card => {
    const text = card.innerText.toLowerCase();
    card.classList.toggle('hidden', !text.includes(q));
  });
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector('.filter-btn').classList.add('active');
}

document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

// ─── NEWSLETTER ──────────────────────────────────────────
function handleSubscribe(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#10b981';
  setTimeout(() => {
    btn.textContent = 'Subscribe Free';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// ─── SCROLL REVEAL ───────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.tool-card, .blog-card, .compare-inner, .newsletter-inner').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${Math.min(i * 0.06, 0.3)}s`;
  revealObserver.observe(el);
});

// ─── ANIMATE BARS ON SCROLL ──────────────────────────────
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width || entry.target.style.width;
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.bar').forEach(bar => barObserver.observe(bar));

// ─── BACK TO TOP ─────────────────────────────────────────
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
}

// ─── MOBILE NAV ──────────────────────────────────────────
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});
