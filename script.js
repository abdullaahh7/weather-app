//https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=ff0bc1640b352e290b5d48a6e8a76ec2&units=metric
async function getForecast(city) {
  const apiKey = "ff0bc1640b352e290b5d48a6e8a76ec2";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    dom(data);
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
}

//+++ Input Func +++//

const inp = document.getElementById("cityInp");
if ((inp.innerText = "")) {
  document.getElementById("container").style.display = "none";
  document.getElementById("header").style.display = "none";
}

document
  .getElementById("cityInp")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  });

function performSearch() {
  const city = document.getElementById("cityInp").value;
  console.log("Searching for:", city);
  localStorage.setItem("lastCity", city);
  getForecast(city); // Pass city value here
}

//+++DOM+++//
function dom(data) {
  const nameElements = document.getElementsByClassName("name");
  for (let element of nameElements) {
    element.textContent = data.name;
  }
  const sun = document.getElementById("suny");
  const cloud = document.getElementById("cloudy");
  const haze = document.getElementById("hazey");

  if (data.weather[0].main === "Clear") {
    cloud.style.display = "none";
    haze.style.display = "none";
    sun.style.display = "block";
  } else if (data.weather[0].main === "Haze") {
    sun.style.display = "none";
    cloud.style.display = "none";
    haze.style.display = "block";
  } else {
    sun.style.display = "none";
    haze.style.display = "none";
    cloud.style.display = "block";
  }

  document.getElementById("temp").innerHTML =
    "Temperature : <strong>" + data.main.temp + " °C</strong>";
  document.getElementById("fl").innerHTML =
    "Feels Like : <strong>" + data.main.feels_like + " °C</strong>";
  document.getElementById("t-min").innerHTML =
    "Temp Min : <strong>" + data.main.temp_min + " °C</strong>";
  document.getElementById("t-max").innerHTML =
    "Temp Max : <strong>" + data.main.temp_max + " °C</strong>";
  document.getElementById("pressure").innerHTML =
    "Pressure : <strong>" + data.main.pressure + " °C</strong>";
  document.getElementById("humidity").innerHTML =
    "Humidity : <strong>" + data.main.humidity + " °C</strong>";
  //++++++++++++++++++++++++++++++++
  document.getElementById("weather").innerHTML =
    "Weather : <strong>" + data.weather[0].main + " </strong>";
  document.getElementById("country").innerHTML =
    "Country : <strong>" + data.sys.country + " </strong>";
  document.getElementById("lon").innerHTML =
    "Lon : <strong>" + data.coord.lon + " </strong>";
  document.getElementById("lat").innerHTML =
    "Lat : <strong>" + data.coord.lat + " </strong>";
  //++++++++++++++++++++++++++++++++
  document.getElementById("wind").innerHTML =
    "Wind Speed : <strong>" + data.wind.speed + " °C</strong>";
  document.getElementById("sea").innerHTML =
    "Sea Level : <strong>" + data.main.sea_level + " </strong>";
  document.getElementById("grnd").innerHTML =
    "Ground Level : <strong>" + data.main.grnd_level + " </strong>";
  document.getElementById("id").innerHTML =
    "Id : <strong>" + data.weather[0].id + " </strong>";
}

document.addEventListener("DOMContentLoaded", function () {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    document.getElementById("cityInp").value = lastCity; // Optional: show in input
    getForecast(lastCity);
  }
});
