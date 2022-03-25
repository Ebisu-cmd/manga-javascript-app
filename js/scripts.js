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
        //check if the item is an object
        if(typeof item === 'object') {
            //check if object has correct number of keys
            if(Object.keys(item).length === 3){
                //check if the object has the correct keys and correct data types for each keys
                let caseOne = false;
                let caseTwo = false;
                let caseThree = false;
                for(let i = 0; i < 3; i++) {
                    switch (i) {
                        case 0:
                            //check if first key is 'name' and is a String
                            if(Object.keys(item)[i] === 'name') {
                                if(typeof item.name === 'string') {
                                    caseOne = true;
                                }
                            }
                            break;

                        case 1:
                            //check if second key is 'height' and is a Number
                            if(Object.keys(item)[i] === 'height') {
                                if(typeof item.height === 'number') {
                                    caseTwo = true;
                                }
                            }
                            break;

                        case 2:
                            let caseThreeOne = false;
                            let caseThreeTwo = false;
                            let caseThreeThree = true;

                            //Check if third key is 'type' and is an Array
                            if(Object.keys(item)[i] === 'type') {
                                if(Array.isArray(item.type)) {
                                    caseThreeOne = true;
                                }
                            }
                            
                            //Check if type array only has one or two types (pokemon can only have 1 or two types)
                            if(caseThreeOne === true) {
                                if(item.type.length >= 1 && item.type.length <= 2){
                                    caseThreeTwo = true;
                                }
                            }

                            //Check if third key Array values are Strings
                            if(caseThreeTwo === true) {
                                item.type.forEach(function(type) {
                                    if(typeof type !== 'string'){
                                        caseThreeThree = false;
                                    }
                                });
                            }
                            
                            if(caseThreeOne === true && caseThreeTwo === true && caseThreeThree === true) {
                                caseThree = true;
                            }
                            break;
                    }
                }
                if(caseOne === true && caseTwo === true && caseThree === true) {
                    add(item);
                    return;
                }
            }
        }
        alert('Inputted Pokemon Object is invalid (correct input -> {name: string, height: number, type: array of 1 or 2 strings}');
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