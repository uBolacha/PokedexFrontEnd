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

ftElementos = {
    fire: 'background-image:url(img/FireCapa.png)',
    grass: 'background-image:url(img/GrassCapa.png)',
    electric: 'background-image:url(img/ElectricCapa.png)',
    water: 'background-image:url(img/WaterCapa.png)',
    ground: 'background-image:url(img/GroundCapa.png)', /*num achei o certo*/ 
    rock: 'background-image:url(img/GroundCapa.png)',   /*num achei o certo*/ 
    fairy: 'background-image:url(img/FairyCapa.png)',
    poison: 'background-image:url(img/GrassCapa.png)', /*num achei o certo*/ 
    bug: 'background-image:url(img/GrassCapa.png)',    /*num achei o certo*/ 
    dragon: 'background-image:url(img/DragonCapa.png)',
    psychic: 'background-image:url(img/PsychicCapa.png)',
    flying: 'background-image:url(img/NormalCapa.png)',
    fighting: 'background-image:url(img/GroundCapa.png)',
    normal: 'background-image:url(img/NormalCapa.png)',
    ghost: 'background-image:url(img/PsychicCapa.png)',
    steel: 'background-image:url(img/MetalCapa.png)',
    dark: 'background-image:url(img/DarkCapa.png)',
    ice: 'background-image:url(img/iceCapa.png)'
}

    const StoragePoke = sessionStorage.getItem('pokeDetalhes')
    let pokemonId = JSON.parse(StoragePoke);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(function(poke) {
            let divPokemon = document.createElement('div');
            divPokemon.classList = 'bordas';

            // elementos dos djabo 
            let nomeMaiusculo = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
            let tipo = poke.types[0].type.name.charAt(0).toUpperCase() + poke.types[0].type.name.slice(1);
            let cor = cores[poke.types[0].type.name];
            let ftFundo = ftElementos[poke.types[0].type.name];
            let hp = poke.stats.find(stat => stat.stat.name === 'hp').base_stat;
            let attack = poke.stats.find(stat => stat.stat.name === 'attack').base_stat
            let defense = poke.stats.find(stat => stat.stat.name === 'defense').base_stat
            let movimentos = poke.moves.slice(0, 4).map(move => move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)); //puxa os move do array 

            divPokemon.id = `pokemon${poke.id}`
            divPokemon.innerHTML =
                `
                    <div id="tudo" style=${ftFundo}>
                    <div id="imagens">
                        <img src="${poke.sprites.versions['generation-v']['black-white'].animated.front_default}">
                        <img src="${poke.sprites.versions['generation-v']['black-white'].animated.back_default}">
                    </div>
                    <div class="sobre">
                        <p id="nome" style="background-color:${cor}">Nome: ${nomeMaiusculo}</p>
                        <p id="tipo" style="color:${cor}">Tipo: ${tipo}</p>
                        </div>
                    <h1 id=stats>Status:</h1>
                    <div class="pokemonDe">
                        <p id="hp">HP: ${hp}</p>
                        <p id="attack">Ataque: ${attack}</p>
                        <p id="defense">Defesa: ${defense}</p>
                
                    </div>
                    <div id="moves"> 
                        <h3>Movimentos:</h3>
                        <br>
                        <p id="movimentos">${movimentos[0]}</p>
                        <p id="movimentos">${movimentos[1]}</p>
                        <p id="movimentos">${movimentos[2]}</p>
                    </div> 
                    </div>                   
                    `
            document.getElementById("DetalhesPokemon").appendChild(divPokemon);
        })

        