cores = {
    fire: '#fd7d24',
    grass: '#9bcc50',
    electric: '#eed535',
    water: '#4592c4',
    ground: '#ab9842',
    rock: '#a38c21',
    fairy: '#fdb9e9',
    poison: '#b97fc9',
    bug: '#729f3f',
    dragon: '#53a4cf',
    psychic: '#f366b9',
    flying: '#bdb9b8',
    fighting: '#d56723',
    normal: '#a4acaf',
    ghost: '#7b62a3',
    steel: '#9eb7b8',
    dark: '#707070',
    ice: '#51c4e7'
}

const storedArray = sessionStorage.getItem('arrayPokemons')
let arrayPokemons;

if (storedArray) {
    arrayPokemons = JSON.parse(storedArray);
} else {
    arrayPokemons = [];
}

console.log(arrayPokemons)

let div = document.getElementById("pokemon");

arrayPokemons.forEach(function(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(function(poke) {
                let divPokemon = document.createElement('div');
                divPokemon.classList = 'borda';

                let nomeMaiusculo = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
                let tipo = poke.types[0].type.name.charAt(0).toUpperCase() + poke.types[0].type.name.slice(1);
                let cor = cores[poke.types[0].type.name];

                divPokemon.style.backgroundColor = cor;

                divPokemon.id= `pokemon${poke.id}`
                divPokemon.innerHTML = 
                `
                <div class="pokemons">
                    <p id="id">#${poke.id}</p>
                    <p id="nome">${nomeMaiusculo}</p>
                    <p id="tipo">${tipo}</p>
                </div>
                <div id=imagem>
                <img src="${poke.sprites.versions['generation-v']['black-white'].animated.front_default}">
                </div>

                <div id=btCards>    
                <button id="btRemoverDex" onClick="remover(${poke.id})">Remover</button>
                <button id="btDetalhes" onClick="detalhes(${poke.id})"><a href="detalhes.html">Detalhes</a</button>
            </div>
                `;
                div.appendChild(divPokemon);
            })
    });

    function remover(id) {
        const div = document.getElementById(`pokemon${id}`)
        div.remove()
        const i = arrayPokemons.indexOf(id);

        if (i !== -1) {
            arrayPokemons.splice(i, 1);
            sessionStorage.setItem('arrayPokemons', JSON.stringify(arrayPokemons));
        }
    }

    function detalhes(id) {
        let pokeDetalhes = id
        sessionStorage.setItem('pokeDetalhes',JSON.stringify(pokeDetalhes))
    }