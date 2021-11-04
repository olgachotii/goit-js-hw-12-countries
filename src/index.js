import './sass/main.scss';
import * as _ from 'lodash';
import listCountry from './templates/list-country.hbs';
import countryCard from './templates/coutry.hbs';

const refs = {
  container: document.querySelector('.js-container'),
  searchForm: document.querySelector('.js-search-form'),
};

refs.searchForm.addEventListener('input', _.debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.value;
  return fetchCountry(searchQuery).then(renderCard).catch(onFetchError);
}

function fetchCountry(value) {
  return fetch(`https://restcountries.com/v2/name/${value}`).then(response => {
    return response.json();
  });
}

function renderCard(country) {
  let markup;
  console.log(country);
  if (country.length === 1) {
    markup = countryCard(country[0]);
  } else if (country.length < 11) {
    markup = listCountry(country);
  } else {
    refs.container.innerHTML = '';
    return console.log('уточните поиск');
  }

  refs.container.innerHTML = markup;
}
