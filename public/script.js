const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const cities = [];

fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    //this part figures out if city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    return `
    <li>
      <span class="name">${place.name}, ${place.city}, ${place.state}</span>
      <span class="category">${place.category}</span>
    </li>
    `; // may need to change the above to accommodate PG data
  }).join('');
  suggestions.innerHTML = html;
  //console.log(matchArray);
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('input', displayMatches);