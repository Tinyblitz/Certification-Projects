const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const statValues = {}
Array.from(document.getElementsByClassName('stat-value')).forEach(el => {
  statValues[el.id] = el;
});

const pkmName = document.getElementById('pokemon-name');
const pkmId = document.getElementById('pokemon-id');
const pkmWeight = document.getElementById('weight');
const pkmHeight = document.getElementById('height');
const imgContainer = document.getElementById('img-holder');
const typesContainer = document.getElementById('types');

const fetchData = async (input) => {
  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input}`);
    const data = await res.json();
    return data;
  } catch(err) {
    return false;
  }
};

async function searchPkm() {
  const input = searchInput.value.toLowerCase().trim().replace(".","").split(" ").join("-");

  if (input === "") {
    searchInput.value = "";
    return;
  }

  let data = await fetchData(input);

  if (!data) {
    alert("Pokémon not found");
    return;
  } 

  const {name, id, weight, height, sprites, types, stats} = data;

  pkmName.textContent = `${name.toUpperCase()}`;
  pkmId.textContent = `#${id}`;
  pkmWeight.textContent = `Weight: ${weight} `;
  pkmHeight.textContent = `Height: ${height}`;
  imgContainer.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="${name}"/>`;
  typesContainer.innerHTML = ``;
  for (const v of types) {
    const type = v.type.name;
    typesContainer.innerHTML += `<div class="${type}">${type.toUpperCase()}</div>`;
  }

  Object.keys(statValues).forEach(key => {
    const index = stats.findIndex(stat => stat.stat.name === key);
    statValues[key].textContent = stats[index].base_stat;
  });
}

searchBtn.addEventListener('click', searchPkm);
searchInput.addEventListener('keydown', event => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPkm();
  }
})
