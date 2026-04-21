// =============================================
//  weather.js — Weather App
//  Uses: async/await, fetch(), try/catch, response.ok
// =============================================

// Why do we use async/await?
// Fetching weather data is asynchronous — it takes time to complete.
// async/await lets us pause execution and wait for the response without
// blocking the browser, keeping the code readable and sequential.

// Why do we check response.ok?
// fetch() only rejects on total network failures. A 404 or 503 from the
// server still "succeeds" from fetch's perspective, so we manually check
// response.ok (true when status is 200–299) to catch those API errors.

// Why do we use try/catch?
// Any await can throw — network offline, JSON parse failure, etc.
// try/catch gives us a single, clean place to handle all those errors
// and show the user a helpful message instead of a silent crash.

// ----- DOM references -----
const cityText        = document.getElementById('city');
const temperatureText = document.getElementById('temperature');
const windText        = document.getElementById('wind');
const coordsText      = document.getElementById('coords');
const weatherUpdated  = document.getElementById('weatherUpdated');
const weatherBox      = document.getElementById('weatherBox');
const weatherError    = document.getElementById('weatherError');
const weatherPH       = document.getElementById('weatherPlaceholder');
const output          = document.getElementById('output');

// ----- Tiny logger shown in the collapsible <details> -----
function log(message) {
  if (output) output.textContent += message + '\n';
}
function clearOutput() {
  if (output) output.textContent = '';
}

// ----- Show / hide helper -----
function showBox()   { weatherBox.hidden = false; weatherError.hidden = true;  weatherPH.hidden = true; }
function showError() { weatherBox.hidden = true;  weatherError.hidden = false; weatherPH.hidden = true; }
function showPH()    { weatherBox.hidden = true;  weatherError.hidden = true;  weatherPH.hidden = false; }

// ----- Track active button -----
function setActiveBtn(btn) {
  document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('city-btn--active'));
  btn.classList.add('city-btn--active');
}

// ----- Main fetch function -----
async function loadWeatherByCity(cityName, latitude, longitude) {
  clearOutput();
  log(`Fetching weather for ${cityName}…`);

  // Show a loading state while waiting
  cityText.textContent        = cityName;
  temperatureText.textContent = '…';
  windText.textContent        = '…';
  coordsText.textContent      = `${latitude}, ${longitude}`;
  weatherUpdated.textContent  = '';
  showBox();

  try {
    // Build the Open-Meteo API URL with the city coordinates
    const url =
      'https://api.open-meteo.com/v1/forecast' +
      '?latitude='  + latitude  +
      '&longitude=' + longitude +
      '&current=temperature_2m,wind_speed_10m';

    // Await the HTTP response
    const response = await fetch(url);

    // Check response.ok — Open-Meteo returns 400 for bad coordinates
    if (!response.ok) {
      throw new Error('HTTP Error: ' + response.status);
    }

    // Parse the JSON body
    const data = await response.json();

    const temperature = data.current.temperature_2m;
    const wind        = data.current.wind_speed_10m;

    // Update the DOM dynamically
    temperatureText.textContent = temperature + ' °C';
    windText.textContent        = wind + ' km/h';

    // Show the timestamp of when data was loaded
    const now = new Date();
    weatherUpdated.textContent = 'Updated at ' + now.toLocaleTimeString();

    log('✓ City:        ' + cityName);
    log('✓ Temperature: ' + temperature + ' °C');
    log('✓ Wind Speed:  ' + wind + ' km/h');
    log('✓ Fetched at:  ' + now.toLocaleTimeString());

  } catch (error) {
    // Catch network errors AND the error thrown by !response.ok
    showError();
    log('✗ Error: ' + error.message);
    console.error('Weather fetch error:', error);
  }
}

// ----- Wire up city buttons via data attributes -----
document.querySelectorAll('.city-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    setActiveBtn(this);
    loadWeatherByCity(
      this.dataset.city,
      parseFloat(this.dataset.lat),
      parseFloat(this.dataset.lon)
    );
  });
});
