import './sass/main.scss';
import listCountry from './templates/list-country.hbs';
import countryCard from './templates/coutry.hbs';

const refs = {
  container: document.querySelector('.js-container'),
  searchForm: document.querySelector('.js-search-form'),
};

refs.searchForm.addEventListener('input', onSearch);
// refs.searchForm.addEventListener('input', _.debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;
  fetchCountry(searchQuery).then(renderCard).catch(onFetchError);
}

function fetchCountry(value) {
  return fetch(`https://restcountries.com/v2/name/${value}`).then(response => {
    return response.json();
  });
}

function renderCard(country) {
  let markup;
  console.log(country);
  if (country.length < 1 || country.length > 10) {
    refs.container.innerHTML = '';
    return console.log('уточните поиск');
  } else if (country.length === 1) {
    markup = countryCard(country[0]);
  } else {
    markup = listCountry(country);
  }

  refs.container.innerHTML = markup;
}

function onFetchError() {
  alert('Упс, чтото пошло не так!');
}
