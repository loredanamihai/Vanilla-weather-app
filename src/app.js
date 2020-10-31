function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);


}

let apiKey = "89c8092fae86c61da5e71acd50a1415f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Bucharest&appid=${apiKey}&units=metric`;

axios.get(apiUrl). then (displayTemperature);