function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let year = date.getFullYear();
  year = year.toString().substr(-2);

  if (hours < 10) {
    hours = `0${hours}`;
  }
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
  "Saturday"
];

  let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

  let day =days[ date.getDay()];
  let month = months[date.getMonth()];

  return `${day} | ${month} ${year} | ${hours}:${minutes}`;
}

  let iconDescription = [
    {'01d':'fas fa-sun',  // day clear sky
    '01n':'fas fa-moon',  // night clear sky
    '02d':'fas fa-cloud-sun',  // day few clouds
    '02n':'fas fa-cloud-moon',  // night few clouds
    '03d':'fas fa-cloud',  // day	scattered clouds
    '03n':'fas fa-cloud',  // night scattered clouds
    '04d':'fas fa-cloud',  // day broken clouds
    '04n':'fas fa-cloud',  // night broken clouds
    '09d':'fas fa-cloud-sun-rain',  // day shower rain
    '09n':'fas fa-cloud-moon-rain',  // night shower rain
    '10d':'fas fa-cloud-rain',  // day rain
    '10n':'fas fa-cloud-rain',  // night rain
    '11d':'fas fa-bolt',  // day thunderstorm
    '11n':'fas fa-bolt',  // night thunderstorm
    '13d':'far fa-snowflake',  // day snow
    '13n':'far fa-snowflake',  // night snow
    '50d':'fas fa-smog',  // day mist   
    '50n':'fas fa-smog'  // night mist    
   }
  ];
 
function displayTemperature(response) {  
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityCountry"); 
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;  
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "class",
    iconDescription[0][response.data.weather[0].icon]
    ) ;
   
}

let apiKey = "89c8092fae86c61da5e71acd50a1415f";
// let city = "Bucharest";
// let city = "Los Angeles";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl). then (displayTemperature);