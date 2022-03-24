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
        add: add
    };

    //Return my array of pokemon
    function getAll() {
        return pokemonList;
    }

    //Add pokemon to pokemonList array
    function add(item) {
        pokemonList.push(item);
    }

})();



// Loop that displays pokemons name and height and checks if its a big pokemon with a conditional
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})`);
    if(pokemon.height > 3.0) {
        document.write(` - Wow, that's big!</p>`);
    }
    else {
        document.write('</p>');
    }
});