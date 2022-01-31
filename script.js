// function to save to local storage
// a way to pull items from local storage
// utalize weather api
// use info from yhe API to build the display
// dynamically change based on city

// global variables
var searchHistory = []
var weatherApiUrl = "https://api.openweathermap.org"
var weatherApiKey = "221d8241c6e1a65fa67ef2229b2a5fc1"
var cityName = "Chicago"
var query = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + weatherApiKey

fetch(query) 
// if you get a response from the API, then it converts it to JSON so JS can read
.then(res => res.json())
// THEN, get data
.then(data =>{
    var lat = data.coord.lat
    var lon = data.coord.lon
    var querry2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + weatherApiKey

    fetch(querry2)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
    })
})




// DOM elements

// functions