
// My array of pokemon
let pokemonList = [
    { name: 'Gengar', height: 1.5, type: ['Ghost', 'Poison'] },
    { name: 'Giratina', height: 4.5, type: ['Dragon', 'Ghost'] },
    { name: 'Cleffa', height: 0.3, type: ['Fairy'] } 
];

// Loop that displays pokemons name and height and checks if its a big pokemon with a conditional
pokemonList.forEach(function(pokemon) {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})`);
    if(pokemon.height > 3.0) {
        document.write(` - Wow, that's big!</p>`);
    }
    else {
        document.write('</p>');
    }
});