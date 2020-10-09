
// IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=649';

  // add Pokémon to the pokemonList array
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    }else {alert('data type is not correct');}
  }

  // return all items of pokemonList
  function getAll() {
    return pokemonList;
  }

  // show loader
  function showLoadingMessage() {
    let loadingStatus = document.querySelector('.container');
    let loadIndicator = document.createElement('div');

    loadIndicator.classList.add('spinner-border');
    loadingStatus.appendChild(loadIndicator);
  }

  // hide loader
  function hideLoadingMessage() {
    let loadingStatus = document.querySelector('.spinner-border');
    
    loadingStatus.classList.remove('spinner-border');
  }

  // create Pokémon List item + eventListener
  function addListItem(pokemon) {
    let pokemonListOutput = document.querySelector('.list-group');
    let button = document.createElement('button');
    button.innerText = pokemon.name;

    button.classList.add('list-group-item');
    button.classList.add('list-group-item-action');

    pokemonListOutput.appendChild(button);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
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
    });
  }

  // load details of Pokémon
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        // add details
        item.name = details.name;
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // modal showing Pokémon details: name, image and height
  function showModal(item) {
    let modalBody = $('.modal-body');
    // eslint-disable-next-line no-unused-vars
    let modalContainer = $('#modal-container').modal('show');

    // clear existing content
    modalBody.empty();

    // create name element in modal
    let nameElement = $('<h1>' + item.name + '</h1>');

    //create img in modal
    let imageElement = $('<img class="modal-img">');
    imageElement.attr('src', item.imageUrl);

    //create element height in modal
    let heightElement = $('<p>' + 'height : ' + item.height + '</p>');

    //create element weight in modal
    let weightElement = $('<p>' + 'weight : ' + item.weight + '</p>');

    //create element types in modal
    let typesElement = document.createElement('p');
    item.types.forEach(function(el, index) {
      if (item.types.length - 1 == index) {
        typesElement.textContent += el.type.name;
      } else {
        typesElement.textContent += el.type.name + ', ';
      }
    });

    //create element abilities in modal
    let abilitiesElement = document.createElement('p');
    item.abilities.forEach(function(el, index) {
      if (item.abilities.length - 1 == index) {
        abilitiesElement.textContent += el.ability.name;
      } else {
        abilitiesElement.textContent += el.ability.name + ', ';
      }
    });

    modalBody.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(typesElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(abilitiesElement);
  }

  // log details of Pokémon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
