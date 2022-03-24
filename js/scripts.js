
// My array of pokemon
let pokemonList = [
    { name: 'Gengar', height: 1.5, type: ['Ghost', 'Poison'] },
    { name: 'Giratina', height: 4.5, type: ['Dragon', 'Ghost'] },
    { name: 'Cleffa', height: 0.3, type: ['Fairy'] } 
];


// Loop that displays pokemons name and height and checks if its a big pokemon with a conditional
for (let i = 0; i < pokemonList.length; i++) {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height})`)
    if (pokemonList[i].height > 3.0) {
        document.write(` - Wow, that's big!</p>`);
    }
    else {
        document.write('</p>');
    }
}