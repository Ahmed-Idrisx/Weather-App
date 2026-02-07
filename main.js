// e01228d8f3cf316736b37a87bc2cc66f
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "e01228d8f3cf316736b37a87bc2cc66f";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWetherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please Enter A Valid city");
  }
});
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could Not Fetch Weather Data");
  } else {
    return await response.json();
  }
}
function displayWetherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";
  const cityDisplay = document.createElement("p");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.append(cityDisplay);
  card.append(tempDisplay);
  card.append(humidityDisplay);
  card.append(descDisplay);
  card.append(weatherEmoji);
}
function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "💨";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "⁉️";
  }
}

function displayError(msg) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = msg;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
