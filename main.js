// API Key
var key = "a405644abe9fcda7350bf4a8c35eb1ba";

// Global Variables
var city;
var temperature;
var description;
var high;
var low;
var humidity;
var direction;
var speed;

// Get Location
function weatherByZip(zip) {
  var url = "http://api.openweathermap.org/data/2.5/forecast?"
             + "zip=" + zip
             + "&APPID=" + key;
  sendRequest(url);
}

// sendRequest function
function sendRequest(url) {
  // Init request
  var xml = new XMLHttpRequest();
  // Check ready state
  xml.onreadystatechange = function() {
    // All working
    if (xml.readyState == 4 && xml.status == 200) {
      // Parse JSON data
      var data = JSON.parse(xml.responseText);
      // Create weather object with location specific variables
      var weather = {};
      weather.city = data.city.name;
      weather.temperature = K2F(data.list[0].main.temp);
      weather.description = data.list[0].weather[0].description;
      weather.high = K2F(data.list[0].main.temp_max);
      weather.low = K2F(data.list[0].main.temp_min);
      weather.humidity = data.list[0].main.humidity;
      weather.direction = degreesToDirection(data.list[0].wind.deg);
      weather.speed = mph(data.list[0].wind.speed);

      // Run weather update function
      update(weather);
    }
  }
  // Open and send request
  xml.open("GET", url, true);
  xml.send();
}

// Inner HTML functions (update placeholders)
function update(weather) {
  city.innerHTML = weather.city;
  temperature.innerHTML = weather.temperature;

  // Make description capitalize at beginning of sentence
  var incorrectDescription = weather.description;
  var correctDescription = incorrectDescription.charAt(0).toUpperCase() + incorrectDescription.slice(1);
  description.innerHTML = correctDescription;

  high.innerHTML = weather.high;
  low.innerHTML = weather.low;
  humidity.innerHTML = weather.humidity;
  direction.innerHTML = weather.direction;
  speed.innerHTML = weather.speed;
}

// Init each variable on load
window.onload = function() {
  city = document.getElementById("city");
  temperature = document.getElementById("temperature");
  description  = document.getElementById("description");
  high  = document.getElementById("high");
  low  = document.getElementById("low");
  humidity = document.getElementById("humidity");
  direction = document.getElementById("direction");
  speed = document.getElementById("speed");

  // Ask for zip code
	var zip = window.prompt("Could not discover your location. What is your zip code?");
	weatherByZip(zip);
}


// Convert Kelvin to Celcius
function K2F(k){
    return Math.round(k*(9/5)-459.67);
}

// Convert Meters per second to mph
function mph(mps) {
  return Math.round(mps * 2.23694);
}

// Convert degrees to cardinal directions (credit: captaincoder)
function degreesToDirection(degrees){
    var range = 360/8;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    for( i in angles ) {
	if(degrees >= low && degrees < high){
	    console.log(angles[i]);
	    return angles[i];
	}
	low = (low + range) % 360;
	high = (high + range) % 360;
  }
    return angles[i];
}
