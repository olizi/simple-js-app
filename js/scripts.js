// list of Pokémon
let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Charmander', height: 0.6, type: 'fire'},
    {name: 'Wigglytuff', height: 0.8, type: ['fairy', 'normal']},
    {name: 'Snorlax', height: 2.1, type: 'normal'}
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

  return {
    add: add,
    getAll: getAll
  };
})();

// adds a new Pokémon to the pokemonList array
pokemonRepository.add({name: 'Basesam', height: 0.7, type: 'poison'});

// show list of Pokémon and highlight Pokemon larger 1.5
function printArrayDetails(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height <= 1.5){
      document.write('<h3>' + pokemon.name + ' (height: ' + pokemon.height + ')</h3>')
    }else {document.write('<h3>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big!</h3>')
    }
  })
}

printArrayDetails();
