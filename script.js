// function to save to local storage
// a way to pull items from local storage
// utalize weather api
// use info from yhe API to build the display
// dynamically change based on city
// global variables
var submitBtn = document.getElementById("searchBtn");
var searchHistory = [];
var weatherApiUrl = "https://api.openweathermap.org";
var weatherApiKey = "221d8241c6e1a65fa67ef2229b2a5fc1";
var tempInput = document.getElementById("tempInput");
var windInput = document.getElementById("windInput");
var humInput = document.getElementById("humInput");
var UVInput = document.getElementById("UVInput");
var forcastedTemp = document.getElementById("forcastedTemp");
var cityArray = JSON.parse(localStorage.getItem("cityHistory"))
  ? JSON.parse(localStorage.getItem("cityHistory"))
  : [];
var searchedBtns = document.getElementById("searchedBtns");

var formSubmitHandler = function (event) {
  // prevents page from refreshing
  event.preventDefault();

  var cityName = document.getElementById("searchBar").value.trim();

  retrieveWeatherData(cityName);
};

function retrieveWeatherData(cityName) {
  var query =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    weatherApiKey;

  fetch(query)
    // if you get a response from the API, then it converts it to JSON so JS can read
    .then((res) => res.json())
    // THEN, get data
    .then((data) => {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var querry2 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=minutely,hourly,alerts&appid=" +
        weatherApiKey;

      fetch(querry2)
        .then((res) => res.json())
        .then((data) => {
          history(cityName);
          renderCurrentWeather(data);
          fiveDayForcast(data);
        });
    });
}

function renderCurrentWeather(data) {
  tempInput.textContent = `${data.current.temp}`;
  windInput.textContent = `${data.current.weather.wind_speed}`;
  humInput.textContent = `${data.current.humidity}%`;
  UVInput.textContent = `${data.current.uvi}`;
  UVIndexColor(data.current.uvi);
}

function fiveDayForcast(data) {
  console.log(data);
  forcastedTemp.textContent = `${data.daily[0].feels_like.day}`;
  forcastedWind.textContent = `${data.daily[0].wind_speed}`;
  //   autopopulating cards
  
}

function UVIndexColor(data) {
  if (data <= 3) {
    UVInput.setAttribute("style", "background-color: green;");
  } else if (data > 3 && data < 5) {
    UVInput.setAttribute("style", "background-color: yellow;");
  } else if (data > 5 && data < 10) {
    UVInput.setAttribute("style", "background-color: red;");
  } else {
    UVInput.setAttribute("style", "background-color: purple;");
  }
}

// local storage
function history(citySearched) {
  cityArray.indexOf(citySearched);
  if (cityArray.indexOf(citySearched) === -1) {
    cityArray.push(citySearched);
    localStorage.setItem("cityHistory", JSON.stringify(cityArray));
    historyBtn();
  }
}

// function to display history buttons
function historyBtn() {
  searchedBtns.innerHTML = "";
  for (let i = 0; i < cityArray.length; i++) {
    var cityButton = document.createElement("button");
    cityButton.innerText = cityArray[i];
    searchedBtns.appendChild(cityButton);
    cityButton.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("hit");
      console.log(event.target.innerText);
      retrieveWeatherData(event.target.innerText)
    });
  }
}

historyBtn();

submitBtn.addEventListener("click", formSubmitHandler);
