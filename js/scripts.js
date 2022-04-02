//IIFE for global data/states
let pokemonRepository = (function () {

    //IIFE variables
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=500';
    let currentModalPokemon = null;

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
        let container = document.querySelector('.container-fluid');

        //create row div, col div, and button
        let rowdiv = document.createElement('div');
        let coldiv = document.createElement('div');
        let button = document.createElement('button');
        

        //set bootstrap classs and text to divs and button
        rowdiv.classList.add('row', 'align-content-center');
        rowdiv.setAttribute('style', 'height: 100px');
        coldiv.classList.add('col', 'd-flex', 'justify-content-center', 'm-2');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-danger', 'btn-lg', 'w-50');
        button.setAttribute('type', 'button');
        button.setAttribute('style', 'height: 75px');

        //append button to col div, col div to row div, and row div to container
        coldiv.appendChild(button);
        rowdiv.appendChild(coldiv);
        container.appendChild(rowdiv);

    

        //open modal with pokemon details when button is clicked
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
        currentModalPokemon = pokemon;
        let modalContainer = document.querySelector('#modal-container');
      
        // clear all existing modal content
        modalContainer.innerHTML = '';
      
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.setAttribute('pointer-action', 'none');
      
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
        currentModalPokemon = null;
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


    //variables for pointer events
    let startX = null;
    let isSwiping = false;

    // takes note of start position of pointer
    function handleStart(e) {
        isSwiping = true;
        let x = e.pageX; // X-coordinate of click/touch
        startX = x;
    }
    
    // checks if pointer traveled enough distance to swap between pokemon modals
    function handleEnd(e) {
        isSwiping = false;
        if (Math.abs(e.pageX - startX) > 200) {
            // swipe left: go next pokemon
            if(e.pageX-startX < 0) {
                let index = pokemonList.indexOf(currentModalPokemon);
                // if index is last dont go next pokemon
                index === (pokemonList.length - 1) ? null : showDetails(pokemonList[index+1]);
                startX = null;
            }
             // swipe right: go previous pokemon
            else if(e.pageX - startX > 0) {
                let index = pokemonList.indexOf(currentModalPokemon);
                // if index is first dont go next pokemon
                index === 0 ? null : showDetails(pokemonList[index-1]);
                startX = null;
            } 
        }
        else {
            startX = null;
        }
    }

    // event listeners for swiping between data items
    modalContainer.addEventListener("pointerdown", handleStart);
    modalContainer.addEventListener("pointerup", handleEnd);
    


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
