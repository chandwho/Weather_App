/* eslint-disable no-console */
/* eslint-disable camelcase */

const input = document.querySelector('#search');
const form = document.querySelector('form');

const description = document.querySelector('#description');
const temperature = document.querySelector('#temp');
const feelTemp = document.querySelector('#feel-temp');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const locationInfo = document.querySelector('#location-info');
const weatherIcon = document.querySelector('#weather-icon');

// Shows weather of default city
async function defaultWeatherData() {
  const location = input.value;
  console.log(location);
  const response = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=almora&appid=5d5a640d5303a85ba1b0ed9bb0b036ca&units=metric',
    { mode: 'cors' },
  );

  const weatherData = await response.json();
  console.log(weatherData);
  temperature.innerText = `${weatherData.main.temp} °C`;
  feelTemp.innerText = `${weatherData.main.feels_like} °C`;
  humidity.innerText = `${weatherData.main.humidity}%`;
  windSpeed.innerText = `${weatherData.wind.speed} m/sec`;
  description.innerText = upper(weatherData.weather[0].description);
  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  locationInfo.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
}

form.addEventListener('submit', showWeatherData);

async function getWeatherData() {
  const location = input.value;
  console.log(location);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5d5a640d5303a85ba1b0ed9bb0b036ca&units=metric`,
    { mode: 'cors' },
  );
  return response;
}

function showWeatherData(e) {
  e.preventDefault();
  const response = getWeatherData(); // async function returns promise
  response
    .then((res) => res.json())
    .then((weatherData) => {
      console.log(weatherData);
      temperature.innerText = `${weatherData.main.temp} °C`;
      feelTemp.innerText = `${weatherData.main.feels_like} °C`;
      humidity.innerText = `${weatherData.main.humidity}%`;
      windSpeed.innerText = `${weatherData.wind.speed} m/sec`;
      description.innerText = upper(weatherData.weather[0].description);
      weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      locationInfo.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
    });
  input.value = '';
}

function upper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

window.onload = defaultWeatherData;
