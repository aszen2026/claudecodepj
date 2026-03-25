// ─── FILTER ──────────────────────────────────────────────
function filterTools(category) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // Filter cards
  document.querySelectorAll('.tool-card').forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.classList.toggle('hidden', !match);
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
  // Reset filter buttons
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

// ─── ANIMATE BARS ON SCROLL ──────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width || entry.target.style.width;
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.bar').forEach(bar => observer.observe(bar));
