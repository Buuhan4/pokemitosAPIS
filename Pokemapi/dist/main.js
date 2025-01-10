const pokeApi = "https://pokeapi.co/api/v2/pokemon/", $pokeCard = document.getElementById("poke-card"), fragment = document.createDocumentFragment();
fetch(pokeApi)
    .then((response) => response.json())
    .then((response) => {
    response.results.forEach((pokemon) => {
        const $figure = document.createElement("figure");
        const $img = document.createElement("img");
        const $figcaption = document.createElement("figcaption");
        const $pokeName = document.createTextNode(pokemon.name);
        $img.setAttribute("alt", pokemon.url);
        $img.setAttribute("title", pokemon.url);
        $figcaption.appendChild($pokeName);
        $figcaption.appendChild($img);
        $figcaption.appendChild($figcaption);
        fragment.appendChild($figure);
    });
    $pokeCard.appendChild(fragment);
});

