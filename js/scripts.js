// list of Pokémon
let pokemonList = [
  {name: 'Charmander', height: 0.6, type: 'fire'},
  {name: 'Wigglytuff', height: 0.8, type: ['fairy', 'normal']},
  {name: 'Snorlax', height: 2.1, type: 'normal'}
];

// show list of Pokémon and highlight Pokemon larger 1.5
function printArrayDetails(){
  pokemonList.forEach(function (pokemon) {
    if (pokemon.height <= 1.5){
      document.write('<h3>' + pokemon.name + ' (height: ' + pokemon.height + ')</h3>')
    }else {document.write('<h3>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big!</h3>')
    }
  })
}

printArrayDetails();
