document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherInfo = document.getElementById('weatherInfo');

    const apiKey = '239a562a23bf4c129ad160039262001';
    const apiUrl = 'http://api.weatherapi.com/v1/current.json';

    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            weatherInfo.innerHTML = 'Please enter a city name.';
        }
    });

    async function fetchWeather(city) {
        weatherInfo.innerHTML = 'Fetching weather data...';
        try {
            const response = await fetch(`${apiUrl}?key=${apiKey}&q=${city}&aqi=no`);
            const data = await response.json();

            if (data.error) {
                weatherInfo.innerHTML = `Error: ${data.error.message}`;
            } else {
                const temperature = data.current.temp_c;
                const condition = data.current.condition.text;
                weatherInfo.innerHTML = `
                    <p><strong>City:</strong> ${data.location.name}</p>
                    <p><strong>Temperature:</strong> ${temperature}°C</p>
                    <p><strong>Conditions:</strong> ${condition}</p>
                `;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Could not fetch weather data. Please try again later.';
        }
    }
});
