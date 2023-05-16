let defaultNow = new Date();
let defaultHours = defaultNow.getHours();
if (defaultHours < 10) {
  defaultHours = `0${defaultHours}`;
}
let defaultMinutes = defaultNow.getMinutes();
if (defaultMinutes < 10) {
  defaultMinutes = `0${defaultMinutes}`;
}
let defaultDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let defaultDay = defaultDays[defaultNow.getDay()];
let defaultMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let defaultMonth = defaultMonths[defaultNow.getMonth()];
let defaultDate = defaultNow.getDate();
let defaultYear = defaultNow.getFullYear();
let defaultTime = document.querySelector("#time");
let defaultDateDetails = document.querySelector("#date");

time.innerHTML = `${defaultHours}:${defaultMinutes}`;
defaultDateDetails.innerHTML = `${defaultDay}, ${defaultMonth} ${defaultDate}, ${defaultYear}`;

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let time = document.querySelector("#time");
  let dateDetails = document.querySelector("#date");

  time.innerHTML = `${hours}:${minutes}`;
  return `${day}, ${month} ${date}, ${year}`;
}

function searchCity(city) {
  let apiKey = "a6a0t4aeacaf35ff4037b1805fbo4cd1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#formGroupExampleInput").value;
  searchCity(city);
}
function weatherCondition(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
}

function searchLocation(position) {
  let apiKey = "6a0t4aeacaf35ff4037b1805fbo4cd1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${position.coordinates.longitude}&lat=${position.coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}

function findMe(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitCity);

let currentLocationButton = document.querySelector("#current-location-button");
if (currentLocationButton) {
  currentLocationButton.addEventListener("click", findMe);
}
