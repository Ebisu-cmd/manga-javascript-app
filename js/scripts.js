//IIFE for global data/states
let pokemonRepository = (function () {

    //My array of Pokemon
    let pokemonList = [
        { name: 'Gengar', height: 1.5, type: ['Ghost', 'Poison'] },
        { name: 'Giratina', height: 4.5, type: ['Dragon', 'Ghost'] },
        { name: 'Cleffa', height: 0.3, type: ['Fairy'] }
    ];

    // --- My public functions --- 
    return {
        getAll: getAll,
        addv: addv,
        find: find,
        addListItem: addListItem
    };

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
        if (typeof item === 'object' && 'name' in item && 'height' in item && 'type' in item) {
            add(item);
        }
        else {
            alert('Inputted Pokemon Object is invalid (correct input -> {name: string, height: number, type: array of 1 or 2 strings}');
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

    //logs pokemon details into console
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    //add event listener to new pokemon buttton
    function pokemonButtonListener(button, pokemon) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

})();

// Loop that displays pokemon as buttons in a column
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});