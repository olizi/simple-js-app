// list of Pokémon
let pokemonList = [
  {name: 'Charmander', height: 0.6, type: 'fire'},
  {name: 'Wigglytuff', height: 0.8, type: ['fairy', 'normal']},
  {name: 'Snorlax', height: 2.1, type: 'normal'}
];

// show list of Pokémon and highlight Pokemon larger 1.5
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height <= 1.5){
    document.write('<h3>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')</h3>')
  }else {document.write('<h3>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s big!</h3>')
  }
}
