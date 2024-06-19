async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "bd5e378503939ddaee76f12ad7a97608"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      document.getElementById("weatherResult").innerHTML = `
                <p>Weather: ${weatherDescription}</p>
                <p>Temperature: ${temperature} °C</p>
                <p>Humidity: ${humidity} %</p>
            `;
    } else {
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    document.getElementById(
      "weatherResult"
    ).innerHTML = `<p>Failed to fetch weather data</p>`;
  }
}
