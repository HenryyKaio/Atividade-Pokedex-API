const buscar = document.querySelector("#busca")
const botao = document.querySelector("#enviar")

let pokemon = buscar.value


function buscarPokemon(pokemon){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(resposta => {
        if(!resposta.ok){
            throw new Error("Pokemon não encontrado");
        }

        console.log(resposta.json());
    })
}

botao.addEventListener("click", buscarPokemon(pokemon));

