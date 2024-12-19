import { initPage } from './initPage.js';
import { getWeather } from './weather.js';
import { setLocation } from './map.js';
import {
  setLocalStorageItem,
  getLocalStorageItem,
  addCity,
} from './localstorage.js';
import { getLocation } from './getLocation.js';

export function inputCity(input) {
  const cityKey = 'citylist';
  const historyCity = getLocalStorageItem(cityKey);
  input = document.querySelector('.inputCity');
  input.addEventListener('keypress', function (ev) {
    if (ev.key === 'Enter') {
      const city = input.value;
      addCity(historyCity, city);
      setLocalStorageItem(cityKey, historyCity);
      input.value = '';
      updateWeather(city);
      updateHistoryList(city);
    }
  });
}

export function updateHistoryList(city) {
  const cityWrapper = document.querySelector('.historyCity');
  const cities = document.querySelectorAll('.liHistory');
  if (cities.length === 10) {
    cities[9].remove();
    const li = document.createElement('li');
    li.innerHTML = city;
    li.className = 'liHistory';
    cityWrapper.prepend(li);
  } else {
    const li = document.createElement('li');
    li.innerHTML = city;
    li.className = 'liHistory';
    cityWrapper.prepend(li);
  }
}

export function addLinks() {
  const cityWrapper = document.querySelector('.historyCity');
  cityWrapper.addEventListener('click', (ev) => {
    if (ev.target.tagName === 'LI') {
      const city = ev.target.innerHTML;
      updateWeather(city);
    }
  });
}

export function loadHistoryList() {
  const cityWrapper = document.querySelector('.historyCity');
  const key = 'citylist';
  const result = getLocalStorageItem(key);
  result.forEach((element) => {
    if (element != null) {
      const li = document.createElement('li');
      li.className = 'liHistory';
      li.innerHTML = element;
      cityWrapper.appendChild(li);
    }
  });
}

export function addWeather(weather) {
  if (weather) {
    document.querySelector('.InfoCity').innerText = `${weather.city}`;
    document.querySelector('.InfoTemp').innerText = `${weather.temperature}`;
    document.querySelector('.iconWeather').innerHTML =
      `<img src="https://openweathermap.org/img/wn/` +
      weather.icon +
      `@2x.png">`;
  }
}

export async function updateWeather(city) {
  const weather = await getWeather(city);
  if (weather) {
    addWeather(weather);
    setLocation(weather.coordinates);
  }
}

export async function setFirstLocation() {
  const currentLocation = await getLocation();
  const firstCity = currentLocation.city;
  const firstCityCoord = currentLocation.coordinates;
  updateWeather(firstCity);
  setLocation(firstCityCoord);
}

document.addEventListener('DOMContentLoaded', async (ev) => {
  ev = document.querySelector('.mainContainer');
  initPage(ev);
  loadHistoryList();
  inputCity();
  addLinks();
  setFirstLocation();
});
