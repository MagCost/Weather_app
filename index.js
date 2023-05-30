//display current day of the week and time
let currentDayTime = new Date();

//display current time
let hours = currentDayTime.getHours();
let minutes = currentDayTime.getMinutes();
let timeFormat = `${hours}:${minutes}`;

//display current day of the week
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentDayTime.getDay()];

//update with current day and time in html
let day = document.querySelector(".current-date");
day.innerHTML = `${currentDay},`;
let time = document.querySelector(".current-time");
time.innerHTML = `${timeFormat}`;

//form and city update when you search
function displaySearchedCity(event) {
  event.preventDefault();
  let formCity = document.querySelector("#cityName");
  let changeCity = document.querySelector(".city");
  changeCity.innerHTML = `${formCity.value}`;
  let city = `${formCity.value}`;
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=metric`;

  //function to display forecast: migrated from html to js
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

    return days[day];
  }

  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `
        <div class="col-2">
        <div class="weekday">${formatDay(forecastDay.dt)}</div>
        <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"></img>
        <div class="forecast_temperature">
          <strong>${Math.round(forecastDay.temp.min)}°</strong>
          ${Math.round(forecastDay.temp.max)}°
        </div>
     
  `;
      }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }

  //forecast: get coordinates
  function forecastCoordinates(coordinates) {
    let lat = coordinates.lat;
    let lon = coordinates.lon;
    let apiKey = "c819171fe0abdc14039af4ef5dda283b";
    let apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayForecast);
  }

  //function to update temperature, wind, humidity, icon and description
  function showTemperature(response) {
    //temperature
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}`;
    //wind
    let wind = response.data.wind.speed;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${wind}m/s`;
    //humidity
    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${humidity}%`;
    //description
    let description = response.data.weather[0].description;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = `${description}`;
    //icon
    let icon = response.data.weather[0].icon;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${icon}@2x.png`
    );
    celsiusTemperature = response.data.main.temp;
    forecastCoordinates(response.data.coord);
  }
  axios.get(`${apiURL}&appid=${apiKey}&q=${city}`).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", displaySearchedCity);

//get position lon and lat for the forecast
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  function showTemperature(response) {
    console.log(response);
    let city = document.querySelector(".city");
    city.innerHTML = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}`;
  }
  axios.get(apiURL).then(showTemperature);
}

function findLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", findLocation);

//function farenheit to Celsius
function showFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

//function Celsius to farenheit
function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);
