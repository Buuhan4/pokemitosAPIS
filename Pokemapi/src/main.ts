import { Pokemon, Result } from './pokemon-interface';

// Inicialización de variables globales
let showPokemon = 0; // Controla el número de Pokémon a mostrar
const pokemonContainer = document.querySelector('.pokemon-container'); // Contenedor donde se mostrarán las cartas
const nextButton = document.querySelector('#next-button') as HTMLButtonElement; // Botón para ir a la siguiente página
const prevButton = document.querySelector('#prev-button') as HTMLButtonElement; // Botón para ir a la página anterior

// Función para cargar Pokémon
function loadPokemon() {
  const pokeApi = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${showPokemon}`; // URL de la API para obtener Pokémon

  pokemonContainer!.innerHTML = ''; // Limpiar el contenedor antes de cargar nuevos Pokémon

  // Obtener datos de la API de Pokémon
  fetch(pokeApi)
      .then((response) => response.json()) // Convertir la respuesta a JSON
      .then(async (response) => {
          for (let index = 0; index < response.results.length; index++) {
              const pokemon = response.results[index]; // Obtener los datos de cada Pokémon
              const typesResponse = await fetch(pokemon.url); // Obtener detalles del Pokémon usando la URL
              const typesData = await typesResponse.json(); // Convertir los datos a JSON
              const types = typesData.types.map((type: any) => type.type.name); // Obtener tipos de Pokémon

              const randomNum = Math.floor(Math.random() * 100) + 1; // Generar un número aleatorio entre 1 y 100

              let pokeSprite = typesData.sprites.front_default; // Usar imagen normal por defecto

              // Cambiar a imagen shiny si el número aleatorio es menor o igual a 7
              if (randomNum <= 7) {
                  pokeSprite = typesData.sprites.front_shiny; // Usar imagen shiny
              }

              // Función para capitalizar la primera letra del nombre
              const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
              const capitalizedPokemonName = capitalizeFirstLetter(pokemon.name); // Nombre capitalizado
              
              // Añadir una estrella al nombre si el número aleatorio es menor o igual a 7
              const pokemonNameWithStar = randomNum <= 7 ? `${capitalizedPokemonName} ⭐` : capitalizedPokemonName;

              // Crear los elementos HTML para la carta del Pokémon
              const pokeCard = document.createElement('div');
              pokeCard.classList.add('poke-card');

              const pokeCardInner = document.createElement('div');
              pokeCardInner.classList.add('poke-card-inner');

              const pokeCardFront = document.createElement('div');
              pokeCardFront.classList.add('poke-card-front');
              pokeCardFront.innerHTML = `
                  <h2>${pokemonNameWithStar}</h2> <!-- Mostrar nombre con estrella si aplica -->
                  <img src="${pokeSprite}" alt="${capitalizedPokemonName}"> <!-- Mostrar la imagen del Pokémon -->
              `;

              // Crear botones para los tipos de Pokémon
              const typesContainer = document.createElement('div');
              typesContainer.classList.add('types-container');
              types.forEach((type: string) => {
                  const typeButton = document.createElement('button');
                  typeButton.textContent = capitalizeFirstLetter(type);
                  typeButton.classList.add(`type-${type}`);
                  typesContainer.appendChild(typeButton); // Añadir cada tipo como un botón
              });

              pokeCardFront.appendChild(typesContainer); // Añadir los botones de tipos al frente de la carta

              // Crear el reverso de la carta con más información
              const pokeCardBack = document.createElement('div');
              pokeCardBack.classList.add('poke-card-back');
              pokeCardBack.innerHTML = `
                  <ul>
                      <li><strong>Weight:</strong> ${typesData.weight / 10} kg</li> <!-- Peso -->
                      <li><strong>Height:</strong> ${typesData.height / 10} m</li> <!-- Altura -->
                      <li><strong>Abilities:</strong> ${typesData.abilities.map((ability: any) => ability.ability.name).join(', ')}</li> <!-- Habilidades -->
                  </ul>
                  <ul>
                      <li><strong>HP:</strong> ${typesData.stats[0].base_stat}</li> <!-- HP -->
                      <li><strong>Attack:</strong> ${typesData.stats[1].base_stat}</li> <!-- Ataque -->
                      <li><strong>Defense:</strong> ${typesData.stats[2].base_stat}</li> <!-- Defensa -->
                      <li><strong>Special-Attack:</strong> ${typesData.stats[3].base_stat}</li> <!-- Ataque especial -->
                      <li><strong>Special-Defense:</strong> ${typesData.stats[4].base_stat}</li> <!-- Defensa especial -->
                      <li><strong>Speed:</strong> ${typesData.stats[5].base_stat}</li> <!-- Velocidad -->
                  </ul>
              `;
              pokeCardBack.style.opacity = '0'; // Ocultar la parte posterior de la carta inicialmente

              // Añadir el frente y reverso a la carta
              pokeCardInner.appendChild(pokeCardFront);
              pokeCardInner.appendChild(pokeCardBack);

              // Añadir la carta al contenedor
              pokeCard.appendChild(pokeCardInner);

              // Manejar el evento de clic para girar la carta
              pokeCard.addEventListener('click', () => {
                  if (pokeCard.classList.contains('flipped')) {
                      pokeCard.classList.remove('flipped'); // Volver a la vista inicial
                      pokeCardFront.style.opacity = '1'; // Mostrar el frente
                      pokeCardBack.style.opacity = '0'; // Ocultar el reverso
                  } else {
                      pokeCard.classList.add('flipped'); // Girar la carta
                      pokeCardFront.style.opacity = '0'; // Ocultar el frente
                      pokeCardBack.style.opacity = '1'; // Mostrar el reverso
                  }
              });

              pokemonContainer?.appendChild(pokeCard); // Añadir la carta al contenedor de Pokémon
          }

          prevButton.disabled = showPokemon === 0; // Deshabilitar el botón "Prev" si estamos en la primera página
      })
      .catch((error) => console.error('Error fetching data:', error)); // Manejar errores de la API
}

// Manejo de los botones de siguiente y anterior
nextButton.addEventListener('click', () => {
  showPokemon += 20; // Avanzar 20 Pokémon
  loadPokemon(); // Recargar los Pokémon
});

prevButton.addEventListener('click', () => {
  if (showPokemon > 0) {
      showPokemon -= 20; // Retroceder 20 Pokémon
      loadPokemon(); // Recargar los Pokémon
  }
});

loadPokemon(); // Cargar los Pokémon iniciales al iniciar
