
// IIFE
let pokemonRepository = (function () {

// list of Pokémon
  let pokemonList = [
    {name: 'Charmander', height: 0.6, type: 'fire'},
    {name: 'Wigglytuff', height: 0.8, type: ['fairy', 'normal']},
    {name: 'Snorlax', height: 2.1, type: 'normal'},
    {name: 'Pidgey', height: 0.3, type: ['flying', 'normal']},
    {name: 'Caterpie', height: 0.3, type: 'bug'},
    {name: 'Rattata', height: 0.3, type: 'normal'},
    {name: 'Beedrill', height: 1, type: ['bug', 'poison']},
    {name: 'Fearow', height: 1.2, type: ['flying', 'normal']},
    {name: 'Pidgeotto', height: 1.1, type: ['flying', 'normal']},
    {name: 'Arbok', height: 3.5, type: 'poison'},
    {name: 'Metapod', height: 0.7, type: 'bug'},
    {name: 'Pikachu', height: 0.4, type: 'electric'}
  ];

// add a single item to the pokemonList array
  function add(pokemon) {
    if ((typeof pokemon === 'object')&& (typeof pokemon.name === 'string')&& (typeof pokemon.height === 'number')&& (typeof pokemon.type === 'string')) {
      pokemonList.push(pokemon)
    }else {alert('data type is not correct')}
  }

// return all items of pokemonList
  function getAll() {
    return pokemonList;
  }

// create Pokémon List item + eventListener
  function addListItem(pokemon) {
    let pokemonListOutput = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemonNameButton')
    listItem.appendChild(button);
    pokemonListOutput.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    })
  }

// log details of Pokémon
  function showDetails(pokemon) {
    console.log(pokemon.name, pokemon.height, pokemon.type);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

// add a new Pokémon to the pokemonList array (test)
pokemonRepository.add({name: 'Basesam', height: 0.7, type: 'poison'});

// genrate list of Pokémon
function printArrayDetails(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    pokemonRepository.showDetails(pokemon);
  })
}

printArrayDetails();
