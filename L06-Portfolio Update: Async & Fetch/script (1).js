// =============================================
//  PROTYA PORTFOLIO — script.js
//  Features:
//    1. Theme toggle (light / dark)
//    2. Persist theme in localStorage
//    3. Auto-generate "Last updated" date
//    4. External API data fetch (Lecture-06)
// =============================================

// Why do we use async/await?
// async/await lets us write asynchronous code (like network requests) in a clean,
// readable style that looks like normal top-to-bottom code. Without it, we would
// need deeply nested .then() chains which are harder to follow and maintain.

// Why do we check response.ok?
// fetch() only rejects (throws) on network-level failures like no internet.
// HTTP error codes such as 404 or 500 still resolve successfully,
// so we must manually check response.ok to catch those server-side errors.

// Why do we use try/catch?
// try/catch lets us handle both network errors and unexpected runtime errors
// in one place, so we can show a friendly error message to the user instead
// of silently failing or crashing the page.

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

// ----- 4: External API — fetch user data -----

const loadDataBtn = document.getElementById('load-data-btn');
const apiResult   = document.getElementById('api-result');

// Helper: get the user's initials for the avatar
function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0].toUpperCase())
    .join('');
}

// Async function to fetch and display user data
async function loadUserData() {
  // Disable the button and show a loading spinner while fetching
  loadDataBtn.disabled = true;
  apiResult.innerHTML = '<p class="api-status">Loading…</p>';

  try {
    // Use fetch() with async/await to call the API endpoint
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

    // Check response.ok — fetch does NOT throw for 4xx/5xx status codes
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Parse the JSON body from the response
    const user = await response.json();

    // Dynamically build the result card using DOM properties
    apiResult.innerHTML = `
      <div class="user-card">
        <div class="user-card-header">
          <div class="user-avatar">${getInitials(user.name)}</div>
          <div>
            <div class="user-name">${user.name}</div>
            <div class="user-username">@${user.username}</div>
          </div>
        </div>
        <div class="user-fields">
          <div class="user-field">
            <span class="field-label">Email</span>
            <span class="field-value">
              <a href="mailto:${user.email}">${user.email}</a>
            </span>
          </div>
          <div class="user-field">
            <span class="field-label">Company</span>
            <span class="field-value">${user.company.name}</span>
          </div>
          <div class="user-field">
            <span class="field-label">City</span>
            <span class="field-value">${user.address.city}</span>
          </div>
          <div class="user-field">
            <span class="field-label">Website</span>
            <span class="field-value">
              <a href="https://${user.website}" target="_blank" rel="noopener">${user.website}</a>
            </span>
          </div>
        </div>
      </div>
      <p class="api-source">
        Source: <a href="https://jsonplaceholder.typicode.com/users/1" target="_blank" rel="noopener">jsonplaceholder.typicode.com/users/1</a>
      </p>
    `;

  } catch (error) {
    // catch handles both network failures AND the error we throw for !response.ok
    apiResult.innerHTML = '<p class="api-error">Error loading data. Please try again.</p>';
    console.error('Fetch error:', error);
  } finally {
    // Re-enable the button whether the request succeeded or failed
    loadDataBtn.disabled = false;
  }
}

// Attach click listener to the Load Data button
loadDataBtn.addEventListener('click', loadUserData);

