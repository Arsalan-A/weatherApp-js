class Weather {
  constructor() {
    this.apiKey = 'AIzaSyCQMC9iI1eo7nso0suSubYBfQgX_77ows0';
    this.weatherApiKey = '4f561f6048b6af0e91fe53d50ad9ae1d';
  }

  //METHOD: get current Location - City and State
  getLocation() {
    return new Promise((resolve, reject) => {
      console.log('loaded');
      //Values
      let coordinates = {
        latitude: null,
        longitude: null,
        error: null,
      };

      //set The Coordinates
      function success(position) {
        coordinates.latitude = position.coords.latitude;
        coordinates.longitude = position.coords.longitude;

        //get the coordinates
        resolve(coordinates);
      }

      //Return default coordinates if user blocks the permission
      function error() {
        coordinates.latitude = 40.7128;
        coordinates.longitude = -74.006;
        coordinates.error = true;
        resolve(coordinates);
      }

      if (!navigator.geolocation) {
        //Set Error if browser doesn't support Geolocation
        coordinates.latitude = 40.7128;
        coordinates.longitude = -74.006;
        coordinates.error = 'Geolocation is not supported by your browser';
        resolve(coordinates);
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    });
  }

  //METHOD: Get full address from lat and long
  async getAddress(lat, long) {
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?components=locality|administrative_area&latlng=${lat},${long}&key=${this.apiKey}`
    );
    const address = await response.json();
    console.log(address);
    //Get the components of the address from json
    let results = address.results[0].address_components;
    let city = '';
    let state = '';
    let latitude = lat;
    let longitude = long;
    console.log(address);
    //loop through componenets and get city and state only
    for (let i in results) {
      let arr = results[i].types;
      for (let j in arr) {
        if (arr[j] === 'locality' || arr[j] === 'sublocality') {
          city = results[i].short_name;
        } else if (arr[j] === 'administrative_area_level_1') {
          state = results[i].short_name;
        }
      }
    }

    console.log(city, state);
    //return the results form google maps API
    return { state, city, latitude, longitude };
  }

  //METHOD: get the lat and long from city and state
  async getCoordinates(city, state) {
    let coordResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?components=locality:${city}|administrative_area:${state}&key=${this.apiKey}`
    );
    const coordinates = await coordResponse.json();

    //Return the latitude and longitude from the google API
    return {
      latitude: coordinates.results[0].geometry.location.lat,
      longitude: coordinates.results[0].geometry.location.lng,
    };
  }

  //METHOD: Get the current weather
  async getWeather(lat, long, city, state, units) {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${this.weatherApiKey}`
    );

    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    return {
      state,
      city,
      humidity: weatherData.main.humidity,
      temp: weatherData.main.temp,
      tempMin: weatherData.main.temp_min,
      tempMax: weatherData.main.temp_max,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
    };
  }
}
