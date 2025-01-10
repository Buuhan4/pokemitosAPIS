import { Pokemon, Result } from './pokemon-interface';

const pokeApi: string = "https://pokeapi.co/api/v2/pokemon/",
  $pokeCard: HTMLElement = <HTMLElement>document.getElementById("poke-card"),
  fragment: Node = document.createDocumentFragment();

fetch(pokeApi)
  .then((response) => response.json())
  .then((response: Pokemon) => {
    response.results.forEach((pokemon) => {
      const $figure:HTMLElement=document.createElement("figure");
      const $img: HTMLElement =document.createElement("img");
      const $figcaption: HTMLElement = document.createElement("figcaption");
      const $pokeName: Node = document.createTextNode(pokemon.name);

      $img.setAttribute("alt",pokemon.url);
      $img.setAttribute("title",pokemon.url);


      $figcaption.appendChild($pokeName);
      $figcaption.appendChild($img);
      $figcaption.appendChild($figcaption);

      fragment.appendChild($figure)

    });
    $pokeCard.appendChild(fragment);
  });
