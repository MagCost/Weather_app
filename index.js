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
  }
  axios.get(`${apiURL}&appid=${apiKey}&q=${city}`).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", displaySearchedCity);

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
