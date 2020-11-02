function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let background = document.querySelector(".weather-app");
    
  let year = date.getFullYear();
  year = year.toString().substr(-2);

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

if ((hours > 6) && (hours <19)) {
    background.className+=" day";    
  }
  else{
    background.className+=" night";    
  }
  
  return `${day} | ${month} ${year} | ${formatHours(timestamp)}`;
  
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
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
  let cityElement = document.querySelector("#city-country"); 
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
 
  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class = "col-2 center-icon">
      <h3>${formatHours(forecast.dt * 1000)}</h3>
      <i class="${iconDescription[0][forecast.weather[0].icon]}"></i>
      <div class = "weather-forecast-temperature">
        <strong>
          <span class="temperature-below">
          ${Math.round(forecast.main.temp_max)}</span>°
        </strong> 
        <span class="temperature-below">
        ${Math.round(forecast.main.temp_min)}</span>°
      </div>
    </div>`
  }
}

function search(city) {
  let apiKey = "89c8092fae86c61da5e71acd50a1415f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl). then(displayTemperature);

  let apiUrl5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl5Days). then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  if(!fahrenheitElement.classList.contains("active")){
  let temperatureElements = document.querySelectorAll(".temperature-below");
  temperatureElements.forEach(function(element){
    let degrees = parseInt(element.innerHTML);
    let fahrenheitTemperature = (degrees * 1.8) + 32;  
    element.innerHTML = Math.round(fahrenheitTemperature);
  });
  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active"); 
}
  }

   function displayCelsiusTemperature(event) {
    event.preventDefault();
    if(!celsiusElement.classList.contains("active")){
    celsiusElement.classList.add("active");
    fahrenheitElement.classList.remove("active");
    let temperatureElements = document.querySelectorAll(".temperature-below");
    temperatureElements.forEach(function(element){
    let degrees = parseInt(element.innerHTML);
    let celsiusTemperature = (degrees - 32) / 1.8;  
    element.innerHTML = Math.round(celsiusTemperature);    
  }); 
}   
  }

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click",displayFahrenheitTemperature);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click",displayCelsiusTemperature);


search("Bucharest");