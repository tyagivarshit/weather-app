async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'f90fc46e09c5983d8cd0c19f7333637a'; 
  const weatherResult = document.getElementById('weatherResult');

  if (!city) {
    weatherResult.innerHTML = 'Please enter a city name.';
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();
    console.log(data); // Debugging

    if (res.status !== 200) {
      weatherResult.innerHTML = `Error: ${data.message}`;
      return;
    }

    weatherResult.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>☁️ Weather: ${data.weather[0].main}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    console.error('Fetch error:', error);
    weatherResult.innerHTML = 'Network error or invalid API call.';
  }
}
