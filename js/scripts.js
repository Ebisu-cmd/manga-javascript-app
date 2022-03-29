//IIFE for global data/states
let pokemonRepository = (function () {

    //IIFE variables
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=500';

    //Return my array of pokemon
    function getAll() {
        return pokemonList;
    }

    //Add pokemon to pokemonList array
    function add(item) {
        pokemonList.push(item);
    }

    //Verifies added pokemon object: adds pokemon to repository if valid / alerts user if pokemon object is invalid
    function addv(item) {
        //Checks if input is an object and has all the required keys
        if (typeof item === 'object' && 'name' in item && 'detailsUrl' in item) {
            add(item);
        }
        else {
            alert('Pokemon object is not correct');
        }
    }

    //finds pokemons in the array that contains the characters in the input
    function find(inputName) {
        //checks if input is a string
        if (typeof inputName !== 'string') {
            alert('Inputted pokemon name is not a string!')
            return;
        }

        //find pokemons in our array (convert everything to lowercase to ignore case sensitivity)
        let found = pokemonList.filter(function (pokemon) {
            let lowercaseListName = pokemon.name.toLowerCase();
            let lowercaseInputName = inputName.toLowerCase();
            return lowercaseListName.includes(lowercaseInputName);
        });

        //checks if pokemon was found or not
        if (found.length === 0) {
            alert('No pokemon found!');
        }
        else {
            return found;
        }
    }

    //adds pokemon to list in the app
    function addListItem(pokemon) {
        //select unordered list in html file
        let list = document.querySelector('.pokemon-list');

        //create button and list element
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        //set style class and text to button
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');

        //append button to list and list item to unordered list in app
        listItem.appendChild(button);
        list.appendChild(listItem);

        //log pokemon details into console when button is clicked
        pokemonButtonListener(button, pokemon);
    }

    //loads Pokemon data from pokemon API and opens modal with data
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        })
    }

    //add event listener to new pokemon buttton
    function pokemonButtonListener(button, pokemon) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    //load list of pokemon from external pokemon api
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                addv(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    //uses imageUrl of pokemon object to fetch more pokemon details from API
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // opens modal with pokemon information
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
      
        // clear all existing modal content
        modalContainer.innerHTML = '';
      
        let modal = document.createElement('div');
        modal.classList.add('modal');
      
        // adds close button for modal with event listener
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);
        
        // title as pokemon name
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;
      
        // information displayed is sprite, height and types
        let imageContent = document.createElement('img');
        imageContent.setAttribute('src', pokemon.imageUrl);
        let heightElement = document.createElement('p');
        heightElement.innerText = 'height: ' + pokemon.height;
        let typeArray = pokemon.types.map(function (index) {
            return index.type.name;
        })
        let typeElement = document.createElement('p');
        typeElement.innerText = 'type:'
        typeArray.forEach(function (type) {
            typeElement.innerText += ' ' + type;
        });
        
      
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(imageContent);
        modal.appendChild(heightElement);
        modal.appendChild(typeElement);
        modalContainer.appendChild(modal);
      
        modalContainer.classList.add('is-visible');
    }

    // hides modal 
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

     // closes modal when escape key is pressed
    let modalContainer = document.querySelector('#modal-container');
    window.addEventListener('keydown', function (e) {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
        }
    });

    // closes modal when user clicks outside of modal
    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
    });

    // --- My public functions --- 
    return {
        getAll: getAll,
        addv: addv,
        find: find,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };

})();


//load pokemon data
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
