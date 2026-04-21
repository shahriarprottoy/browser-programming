// =============================================
//  PROTYA PORTFOLIO — script.js
//  Features:
//    1. Theme toggle (light / dark)
//    2. Persist theme in localStorage
//    3. Auto-generate "Last updated" date
// =============================================

// ----- State -----
let isDark = false;

// ----- Elements -----
const body          = document.body;
const toggleBtn     = document.getElementById('theme-toggle');
const lastUpdatedEl = document.getElementById('last-updated');

// ----- 1 & 2: Theme — load saved preference on page load -----
(function loadTheme() {
  const saved = localStorage.getItem('portfolio_theme');
  if (saved === 'dark') {
    isDark = true;
    body.classList.add('dark');
  }
})();

// ----- 1 & 2: Theme toggle on button click -----
toggleBtn.addEventListener('click', function () {
  isDark = !isDark;

  if (isDark) {
    body.classList.add('dark');
    localStorage.setItem('portfolio_theme', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('portfolio_theme', 'light');
  }
});

// ----- 3: Last updated — generate today's date automatically -----
(function setLastUpdated() {
  const today = new Date();
  const yyyy  = today.getFullYear();
  const mm    = String(today.getMonth() + 1).padStart(2, '0');
  const dd    = String(today.getDate()).padStart(2, '0');
  const formatted = `${yyyy}-${mm}-${dd}`;

  if (lastUpdatedEl) {
    lastUpdatedEl.textContent = `Last updated: ${formatted}`;
  }
})();
