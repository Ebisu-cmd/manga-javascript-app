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
        add: add,  //will comment this out later because addv is the same function but with data verification
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

    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        list.appendChild(listItem);
    }

})();

// Loop that displays pokemons name and height and checks if its a big pokemon with a conditional
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});