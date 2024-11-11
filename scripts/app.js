import { countries } from './countries.js';

// Función para renderizar las tarjetas de los países
const renderCountries = (countriesList) => {
  const countriesSection = document.querySelector('main > section');
  countriesSection.innerHTML = ''; // Limpiar antes de renderizar

  countriesList.forEach(country => {
    const countryCard = document.createElement('div');
    countryCard.classList.add('card-country');

    // Banderas y nombre del país
    countryCard.innerHTML = `
      <img src="${country.flag}" alt="Flag of ${country.name}" />
      <h2>${country.name}</h2>
    `;

    // Mostrar información al pasar el mouse
    countryCard.addEventListener('mouseover', () => {
      const demographicsSection = document.querySelector('#demographics');
      demographicsSection.innerHTML = `
        <h2>${country.name}</h2>
        <h3>Capital: ${country.capital}</h3>
        <h4>Población: ${country.population.toLocaleString()}</h4>
        <p>Moneda: ${country.currency}</p>
        <p>Idioma: ${country.language}</p>
      `;
    });

    countriesSection.appendChild(countryCard);
  });
};

// Función para filtrar los países
const filterCountries = (searchTerm) => {
  return countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm) ||
    country.capital.toLowerCase().includes(searchTerm)
  );
};

// Función para ordenar los países
const sortCountries = (order) => {
  return countries.slice().sort((a, b) => {
    if (order === 'A-Z') return a.name.localeCompare(b.name);
    if (order === 'Z-A') return b.name.localeCompare(a.name);
  });
};

// Control de eventos para búsqueda y ordenamiento
document.getElementById('input-filter').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredCountries = filterCountries(searchTerm);
  renderCountries(filteredCountries);
});

document.getElementById('select-orderBy').addEventListener('change', (e) => {
  const order = e.target.value;
  const sortedCountries = sortCountries(order);
  renderCountries(sortedCountries);
});

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
  renderCountries(countries);
});