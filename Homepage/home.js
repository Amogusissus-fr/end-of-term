let SuccessUserLogin = localStorage.getItem("SuccessUserLogin");
let SuccessUser = document.getElementsByClassName("SuccessUser")
// console.log(SuccessUserLogin);
// if (SuccessUserLogin === null || SuccessUserLogin === '') {
if (SuccessUserLogin === null || SuccessUserLogin === '') {
    window.location.href = "/Login/login.html"
} else {
    SuccessUser[0].innerText = `Xin chào, ${SuccessUserLogin}`
}



let LogoutBtn = document.querySelector(".LogoutBtn")

LogoutBtn.addEventListener("click", function () {
    localStorage.removeItem("SuccessUserLogin");
    window.location.href = "/Login/login.html";

})

let input = document.getElementById("input");
let place = document.getElementById("place");
let temp = document.getElementById("temp");
let wind = document.getElementById("wind");
let weatherCode = document.getElementById("weather_code");
let button = document.getElementById("button");

button.addEventListener("click", function () {
  let inputValue = input.value;

  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}`)
    .then((res) => res.json())
    .then((data) => {
      let location = data.results[0];
      let latitude = location.latitude;
      let longitude = location.longitude;

      place.textContent = `Địa điểm: ${location.name}, ${location.country}`;

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )
        .then((res) => res.json())
        .then((dataWeather) => {
          let weather = dataWeather.current_weather;
          temp.textContent = `Nhiệt độ: ${weather.temperature} °C`;
          wind.textContent = `Sức gió: ${weather.windspeed} km/h`;
          weatherCode.textContent = `Weather code: ${weather.weathercode}`;
        });
    });
});