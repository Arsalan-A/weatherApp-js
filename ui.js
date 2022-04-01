class UI {
  constructor() {
    //get the card element
    this.card = document.querySelector('.card-body');
    this.icon = '';
  }

  //Fill the weather card data
  fillData(city, state, weather, unit = '°F', error = false) {
    this.icon = `http://openweathermap.org/img/w/${weather.icon}.png`;

    //Display error if city and state is wrong
    if (error === true) {
      this.alert('Please Enter a Valid City and State');
    } else {
      this.card.innerHTML = `
    <div class="card-title text-center"><h3 id="title">${city}, ${state}</h3></div>
    <h4 class="text-center text-dark">${this.upperCaseString(
      weather.description
    )}</h4>
    <h2 class="text-center">${Math.round(weather.temp)} ${unit}</h2>
    <img src=${this.icon} alt = "Weather-Icon" >
    <ul class="list-group bg-light text-dark">
        <li class="list-group-item">Humidity: ${weather.humidity} %</li>
        <li class="list-group-item">High: ${Math.round(
          weather.tempMax
        )} ${unit}</li>
        <li class="list-group-item">Low: ${Math.round(
          weather.tempMin
        )} ${unit}</li>
        
    </ul>
    <button type="button" class="btn btn-outline-light mt-3" data-toggle="modal" data-target="#locModal">Change Location</button>`;
    }
  }

  //FUNCTION[epic=FUNCTIONS] Uppercase: change the description first Alphabets of the words to Upper Case
  upperCaseString(str) {
    let upperCased = str[0].toUpperCase() + str.slice(1);
    let indexArr = [];
    let finalStr;

    for (let i = 0; i < upperCased.length; i++) {
      if (str[i] === ' ') {
        indexArr.push(i + 1);
      }
    }

    let strArr = upperCased.split('');

    for (let i in indexArr) {
      strArr.splice(indexArr[i], 1, upperCased[indexArr[i]].toUpperCase());
    }

    finalStr = strArr.join('');

    return finalStr;
  }

  //Display Alert
  alert(msg) {
    let alert = document.querySelector('.alert');
    if (alert) {
      alert.remove();
    }
    let colElement = document.querySelector('.col');
    let cardElement = document.querySelector('.card');
    let div = document.createElement('div');
    div.textContent = `${msg}`;
    div.className = 'alert alert-danger mt-3';
    div.setAttribute('role', 'alert');

    colElement.insertBefore(div, cardElement);
    alert = document.querySelector('.alert');
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}
