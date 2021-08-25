let header = document.createElement("h1");
header.className = "cardTitle";
header.innerText = "Pokemon";
let buttons = document.createElement("div");
buttons.className = "btns";
// https://www.pngmart.com/files/16/Left-Arrow-Silhouette-PNG-Image.png   https://www.pngmart.com/files/3/Right-Arrow-PNG-File.png
buttons.innerHTML = `
<img  id="arrow" src="assets/leftArrow.png" alt="arrow" class="buttonPrev" onclick="previous()">
<img id="arrow" src="assets/rightArrow.png" alt="arrow" class="buttonFor" onclick="nextPage()">`;
let poke_container = document.createElement("div");
poke_container.className = "poke-container";
document.body.append(header, poke_container, buttons);

let number = 1;
const colors = {
  // getting colors from types. using filter ()
  fire: "#af0",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DeF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const main_types = Object.keys(colors);
console.log(main_types);

const fetchPokemon = async () => {
  for (let i = number; i <= number + 9; i++) {
    console.log(i);
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const res = await fetch(url);
    const pokemon = await res.json();

    console.log(pokemon.species.url);
    createPokemonCard(pokemon);
  } catch (error) {
    poke_container.innerHTML = `<h2>Try Again Later..!</h2>`;
    console.log(error);
  }
};
fetchPokemon();
let whole = document.createElement("div");
whole.className = "whole";
const pokemonEl = document.createElement("div");
pokemonEl.classList.add("pokemon");
function createPokemonCard(pokemon) {
  const poke_types = pokemon.types.map((ele) => ele.type.name);
  let type = main_types.find((type) => poke_types.indexOf(type) > -1);
  let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  let color = colors[type];

  pokemonEl.style.backgroundColor = color;
  const pokeInnerHTML = `
  <div class="innerCard">
 
  <img class="img-container" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif" alt="poke HERE"><br>

 
  <span>${name}</span>
  <div class="info" >
 
  <h3><b>Abilities:&nbsp; </b>${pokemon.abilities[0].ability.name}</h3>
   
   <h3> <b>Moves</b>:&nbsp;${pokemon.moves[0].move.name}</h3>
   <h3><b>Weight:&nbsp;</b>${pokemon.weight}</h3>
   </div> 
   </div>
    `;

  pokemonEl.innerHTML += pokeInnerHTML;
  poke_container.appendChild(pokemonEl);
}

function nextPage() {
  if (number < 40) {
    pokemonEl.innerHTML = ``;
    number += 10;

    fetchPokemon();
  }
}
function previous() {
  if (number > 10) {
    pokemonEl.innerHTML = ``;
    number -= 10;

    fetchPokemon();
  }
}
