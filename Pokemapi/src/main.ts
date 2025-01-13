import { Pokemon, Result } from './pokemon-interface';

const pokeApi: string = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";

const pokemonContainer = document.querySelector('.pokemon-container');

fetch(pokeApi)
  .then((response) => response.json())
  .then(async (response: Pokemon) => {
    
    for (let index = 0; index < response.results.length; index++) {
      const pokemon = response.results[index];
      const imgPokemon = response;
      const typesResponse = await fetch(pokemon.url);
      const typesData = await typesResponse.json();
      const types = typesData.types.map((type: any) => type.type.name).join(" ");

      const pokeSprite = typesData.sprites.front_default;
      console.log(pokeSprite);

      const pokeCard = document.createElement('div');
      pokeCard.classList.add('poke-card');

      const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
      const capitalizedPokemonName = capitalizeFirstLetter(pokemon.name);

      pokeCard.innerHTML = `
        <h2>${capitalizedPokemonName}</h2>
        <img src="${pokeSprite}" alt="${capitalizedPokemonName}">
        <p>Tipo: ${types}</p>
      `;
      pokemonContainer?.appendChild(pokeCard);
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
