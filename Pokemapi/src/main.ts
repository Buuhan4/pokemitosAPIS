import { Pokemon, Result } from './pokemon-interface';


const pokeApi: string = "https://pokeapi.co/api/v2/pokemon/",
  $pokeCard: HTMLElement = <HTMLElement>document.getElementById("poke-card"),
  fragment: Node = document.createDocumentFragment();

fetch(pokeApi)
  .then((response) => response.json())
  .then((response: Pokemon) => {

    response.results.forEach((result) => {
      const pokemonDiv = document.createElement("div");
      fragment.appendChild(pokemonDiv);
    });

    $pokeCard.appendChild(fragment);
  });
