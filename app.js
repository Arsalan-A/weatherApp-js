//Weather init
const weather = new Weather();
//UI int
const ui = new UI();

//value
let weatherInfo;

//EVENT[epic=EVENTS] DOM when it's loaded get the user's location
window.addEventListener('DOMContentLoaded', (e) => {
  weather.getLocation().then((data) => {
    displayWeather(data.latitude, data.longitude);
    //console.log(data.latitude, data.longitude);
  });
});

//EVENT[epic=EVENTS] Click to get location from user
document.getElementById('saveData').addEventListener('click', (e) => {
  //values of the user input
  let cityInput = document.getElementById('cityInput').value;
  let stateInput = document.getElementById('stateInput').value;

  //Get the coordinates from the entered city and state by the user
  weather
    .getCoordinates(cityInput, stateInput)
    .then((coord) => displayWeather(coord.latitude, coord.longitude))
    .catch(() => ui.fillData('', '', '', '', true));
});

//EVENT[epic=EVENTS] Click to change to Celicus and Fahrenheit
document.querySelector('.btn-group-toggle').addEventListener('click', (e) => {
  //Get the radio input targets and call the click event on them
  if (e.target && e.target.matches('input[type="radio"]')) {
    //if value of the radio button pressed convert the temp
    if (e.target.value === 'celsius') {
      //Convert the weatherData values to celcius
      let convertedToCelcius = {
        humidity: weatherInfo.humidity,
        temp: convertToCelcius(weatherInfo.temp),
        tempMin: convertToCelcius(weatherInfo.tempMin),
        tempMax: convertToCelcius(weatherInfo.tempMax),
        description: weatherInfo.description,
        icon: weatherInfo.icon,
      };
      //pass the converted values to the ui
      ui.fillData(
        weatherInfo.city,
        weatherInfo.state,
        convertedToCelcius,
        '°C'
      );
    } else {
      ui.fillData(weatherInfo.city, weatherInfo.state, weatherInfo, '°F');
    }
  }
});

//FUNCTION[epic=FUNCTIONS] displayWeather: to Get all the weather data and display it
async function displayWeather(lat, long) {
  //weather init
  const weather = new Weather();
  //UI int
  const ui = new UI();
  //Asynchronously call the functions and get the data
  try {
    const address = await weather.getAddress(lat, long);

    const weatherData = await weather.getWeather(
      address.latitude,
      address.longitude,
      address.city,
      address.state,
      'imperial'
    );
    ui.fillData(weatherData.city, weatherData.state, weatherData);
    weatherInfo = weatherData;
  } catch (err) {
    console.error(err);
  }
}

// FUNCTION[epic=FUNCTIONS]: Fahrenheit to celcius
function convertToCelcius(deg) {
  let celcius = (deg - 32) * (5 / 9);
  return Math.round(celcius);
}
