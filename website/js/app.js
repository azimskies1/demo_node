// ShoreSquad - Main Application Logic

/**
 * Initialize the ShoreSquad application
 */
function initApp() {
    console.log('🌊 ShoreSquad initialized!');
    loadMapData();
    loadWeatherData();
    loadCrewData();
    setupEventListeners();
}

/**
 * Load and display map data
 */
function loadMapData() {
    const mapContainer = document.getElementById('map-container');
    // The iframe is already in index.html, but we can show a message if needed
    mapContainer.innerHTML = mapContainer.innerHTML || '<p>📍 Interactive map loading...</p>';
}

/**
 * Load and display weather data from NEA API
 */
function loadWeatherData() {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = '<p>🌤️ Loading weather data...</p>'; // show loading

    fetch("https://api.data.gov.sg/v1/environment/24-hour-weather-forecast")
        .then(res => res.json())
        .then(data => {
            weatherContainer.innerHTML = ''; // clear loading text

            // NEA API structure: data.items[0].periods[0].regions
            const regions = data.items[0].periods[0].regions;

            for (const [region, temp] of Object.entries(regions)) {
                const card = document.createElement('div');
                card.className = 'weather-card';
                card.innerHTML = `
                    <h4>${region}</h4>
                    <p>🌤️ Temperature: <strong>${temp}°C</strong></p>
                `;
                weatherContainer.appendChild(card);
            }
        })
        .catch(err => {
            weatherContainer.innerHTML = '<p>⚠️ Failed to load weather data.</p>';
            console.error("Weather API error:", err);
        });
}

/**
 * Load and display crew members
 */
function loadCrewData() {
    const crewContainer = document.getElementById('crew-container');
    const crewMembers = ['Alex', 'Jordan', 'Casey', 'Morgan'];

    crewMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'crew-member';
        card.innerHTML = `
            <p>👤 ${member}</p>
            <button class="btn btn-primary" style="font-size: 0.8rem;">Invite</button>
        `;
        crewContainer.appendChild(card);
    });
}

/**
 * Setup event listeners for interactivity
 */
function setupEventListeners() {
    const startBtn = document.querySelector('.btn-primary');
    startBtn.addEventListener('click', () => {
        alert('🎉 Ready to start a cleanup? Let\'s go!');
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
