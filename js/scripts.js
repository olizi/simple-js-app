
// IIFE
let pokemonRepository = (function () {

// list of Pokémon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=950';

// add a single item to the pokemonList array
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon)
    }else {alert('data type is not correct')}
  }

// return all items of pokemonList
  function getAll() {
    return pokemonList;
  }
// show loader
  function showLoadingMessage() {
    let loadingStatus = document.querySelector('.table');
    let loadIndicator = document.createElement('div');
    loadIndicator.classList.add('loader');
    loadingStatus.appendChild(loadIndicator);
  }

// hide loader
  function hideLoadingMessage() {
    let loadingStatus = document.querySelector('.loader');
    loadingStatus.classList.remove('loader');
  }

// create Pokémon List item + eventListener
  function addListItem(pokemon) {
    let pokemonListOutput = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemonNameButton');
    listItem.appendChild(button);
    pokemonListOutput.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    })
  }

// load Pokémon name and url
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

// load details of Pokémon
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      // add details
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // modal showing Pokémon details: name, image and height
  let modalContainer = document.querySelector('#modal-container');

  function showModal(name, height, image) {
    modalContainer.innerHTML ='';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'close';
    closeButtonElement.addEventListener('click', hideModal);
  
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
  
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  
    let textElement = document.createElement('div');
    textElement.className = ('text-block');

    let nameElement = document.createElement('h1');
    nameElement.innerText = name;
  
    let heightElement = document.createElement('p');
    heightElement.innerText = ('Height: ') + height;
  
    let imageElement = document.createElement('img');
    imageElement.src = image;

    modal.appendChild(closeButtonElement);
    modal.appendChild(imageElement);
    modal.appendChild(textElement);
    textElement.appendChild(nameElement);
    textElement.appendChild(heightElement);
   
    modalContainer.appendChild(modal);
  
    modalContainer.classList.add('is-visible');
  }
  
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // log details of Pokémon
 function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    // console.log(pokemon);
  });
}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// genrate list of Pokémon
pokemonRepository.loadList().then(function() {
// data is loaded
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
