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
        find: find
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

    // finds a pokemon in the pokemon array
    function find(name) {
        //checks if input is a string
        if (typeof name !== 'string') {
            alert('Inputted pokemon name is not a string!')
            return;
        }

        //find pokemon object in our pokemon array
        let found = pokemonList.filter(function (pokemon) {
            return pokemon.name === name;
        });

        //checks if pokemon was found or not
        if (found.length === 0) {
            alert('Pokemon not found!');
        }
        else {
            return found[0];
        }
    }
})();

// Loop that displays pokemons name and height and checks if its a big pokemon with a conditional
pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})`);
    if (pokemon.height > 3.0) {
        document.write(` - Wow, that's big!</p>`);
    }
    else {
        document.write('</p>');
    }
});