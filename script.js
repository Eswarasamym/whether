document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const suggestions = document.querySelector(".suggestions");
  const searchButton = document.getElementById("searchButton");
  const weatherResult = document.getElementById("weatherResult");
  const apiKey = "bd5e378503939ddaee76f12ad7a97608"; // Replace with your OpenWeatherMap API key

  const mockSuggestions = [
    "Anjaw ",
    "Changlang ",
    "Dibang Valley",
    "East Kameng ",
    "East Siang ",
    "Kamle",
    "Kra Daadi",
    "Kurung Kumey",
    "Leparada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri ",
    "Namsai ",
    "Pakke Kessang",
    "Papum Pare ",
    "Shi Yomi ",
    "Siang",
    "Ariyalur",
    "Chengalpattu",
    "Chennai ",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul ",
    "Erode ",
    "Kallakurichi ",
    "Kancheepuram ",
    "Kanniyakumari",
    "Karur",
    "Krishnagiri ",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Perambalur",
    "Pudukkottai ",
    "Ramanathapuram",
    "Ranipet",
    "Salem ",
    "Sivaganga",
    "Theni ",
    "Thiruvallur",
    "Thiruvarur ",
    "Thoothukkudi ",
    "Tiruchirappalli",
    "Tirunelveli ",
    "Tirupathur ",
    "Tiruppur ",
    "Tiruvannamalai",
    "Vellore ",
    "Viluppuram ",
    "Virudhunagar ",
  ];

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    suggestions.innerHTML = "";
    if (query.length > 0) {
      const filteredSuggestions = mockSuggestions.filter((item) =>
        item.toLowerCase().includes(query)
      );
      filteredSuggestions.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        li.className = "list-group-item";
        li.addEventListener("click", () => {
          searchInput.value = item;
          suggestions.innerHTML = "";
          suggestions.style.display = "none";
        });
        suggestions.appendChild(li);
      });
      suggestions.style.display = "block";
    } else {
      suggestions.style.display = "none";
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !searchInput.contains(event.target) &&
      !suggestions.contains(event.target)
    ) {
      suggestions.style.display = "none";
    }
  });

  searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city.length > 0) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            weatherResult.innerHTML = `
                          <h3>${data.name}</h3>
                          <p>Temperature: ${data.main.temp}°C</p>
                          <p>Weather: ${data.weather[0].description}</p>
                          <p>Humidity: ${data.main.humidity}%</p>
                          <p>Wind Speed: ${data.wind.speed} m/s</p>
                      `;
          } else {
            weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          weatherResult.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
        });
    } else {
      weatherResult.innerHTML = `<p>Please enter a city name.</p>`;
    }
  });
});
