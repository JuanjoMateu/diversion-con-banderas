document.addEventListener('DOMContentLoaded', () => {
    fetchData();
  });
  
  async function fetchData() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Ha surgido un error: ', response.status);
      }
      const data = await response.json();
      const sortedCountries = sortCountriesAlphabetically(data);
      renderCountries(sortedCountries);
    } catch (error) {
      console.log('Ha surgido un error:', error);
    }
  }
  
  function sortCountriesAlphabetically(countries) {
    return countries.sort((a, b) => {
      const nombreA = a.name.common.toUpperCase();
      const nombreB = b.name.common.toUpperCase();
      if (nombreA < nombreB) return -1;
      if (nombreA > nombreB) return 1;
      return 0;
    });
  }
  
  function renderCountries(countries) {
    const countriesList = document.getElementById('countries-list');
  
    countries.forEach(country => {
      const countryElement = document.createElement('div');
      countryElement.classList.add('country');
      countryElement.dataset.countryName = country.name.common; 
      countryElement.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.common}"><p>${country.name.common}</p>`;
      countriesList.appendChild(countryElement);
    });
  }


