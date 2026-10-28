const buscar = document.querySelector("#busca")
const nomeBusca = document.querySelector("#nome")
const botao = document.querySelector("#enviar")
const prox = document.querySelector("#prox")
const anterior = document.querySelector("#ant")
const random = document.querySelector('#aleatorio')

const nome = document.querySelector('#nomePokemon')
const id = document.querySelector('#idPokemon')
const imagem = document.querySelector('#card')
const tipo = document.querySelector('#tipos')
const altura = document.querySelector('#altura')
const peso = document.querySelector('#peso')


const hp = document.querySelector('#hp')
const atk = document.querySelector('#ataque')
const def = document.querySelector('#defesa')
const vel = document.querySelector('#velocidade')

const percentual1 = document.querySelector('#percent1')
const percentual2 = document.querySelector('#percent2')
const percentual3 = document.querySelector('#percent3')
const percentual4 = document.querySelector('#percent4')

let clicouImagem = false;





async function buscarPokemon(pokemon) {


    if (pokemon === "") {
        nome.innerText = "Insira um pokemon por favor";
        return;
    }

    try {
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );

        if (!resposta.ok) {
            nome.innerText = "Pokemon não encontrado";
            return;
        }

        const dados = await resposta.json();
        console.log("funcionou");
        return dados;




    } catch (erro) {
        nome.innerText = "Erro ao buscar Pokemon";
        console.error(erro);
    }
}


async function colocarDados(event, pokemon) {

    event.preventDefault();
    let dados = await buscarPokemon(pokemon);
    console.log(dados);
    nome.innerText = dados.name;
    id.innerText = dados.id;

    imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dados.id}.png`;

    altura.innerText =
        (dados.height / 10).toFixed(1).replace(".", ",") + " m"; // Tratamento do padrão americano para o padrão brasileiro, dividindo por 10, usando o .toFixed(1) para fixar apenas uma casa decimal e o .replace() para trocar os pontos por virgulas

    peso.innerText =
        (dados.weight / 10).toFixed(1).replace(".", ",") + " kg";


    hp.innerText = "HP " + dados.stats[0].base_stat;
    atk.innerText = "Ataque " + dados.stats[1].base_stat;
    def.innerText = "Defesa " + dados.stats[2].base_stat;
    vel.innerText = "Velocidade " + dados.stats[5].base_stat;

    percentual1.style.width =
        (dados.stats[0].base_stat / 255 * 100) + "%"; // Aqui eu tirei a porcentagem do quanto o valor representa de 255(valor maximo de stats) para que as barrinhas cresçam conforme a porcentagem do valor

    percentual2.style.width =
        (dados.stats[1].base_stat / 255 * 100) + "%";

    percentual3.style.width =
        (dados.stats[2].base_stat / 255 * 100) + "%";

    percentual4.style.width =
        (dados.stats[5].base_stat / 255 * 100) + "%";

    tipo.innerHTML = "";

    dados.types.forEach(tipoPokemon => { // Aqui eu fiz um forEach para percorrer o array types que terá os tipos do pokemon, já que pode ser um tipo ou dois
        const span = document.createElement("span"); // o document.createElement vai criar um span para cada um dos tipos, se tiver só 1 cria só 1 span, se tiver 2 cria 2 spans, no css temos a estilização padrão para os spans criados dentro do campoTipo
        span.textContent = tipoPokemon.type.name; // dentro do span coloquei o nome do tipo de cada objeto do array types
        tipo.appendChild(span); // o .appendChild vai adicionar o span criado como o último filho do tipo que é a div onde irão entrar os tipos, sendo assim, cada novo span entra como o "último elemento da fila"
    });
    imagem.style.cursor = "pointer"; // faz com que o mouse fique no estilo "pointer" apenas quando há um pokemon sendo mostrado, fazendo com que o usuário entenda que ele pode clicar no pokemon quando ele está sendo mostrado que algo acontecerá

}



botao.addEventListener("click", (event) => {
    let pokemon = nomeBusca.value;
    colocarDados(event, pokemon) 
});

buscar.addEventListener("submit", (event) => {
    let pokemon = nomeBusca.value;
    colocarDados(event, pokemon)
});

random.addEventListener("click", async (event)=>{
    let idAleatorio = Math.floor(Math.random() * 1025) + 1;;
    dados = await buscarPokemon(idAleatorio);
    colocarDados(event, idAleatorio);
})

prox.addEventListener("click", async (event) => {
    let pokemon = parseInt(id.textContent, 10); // Aqui eu defini a variável pokemon como o conteúdo que vai dentro do span id, ou seja, o id do pokemon que está la dentro. Porém, como o conteúdo lá vem como string, eu usei o parseInt para transformar em inteiro. Fiz isso pra que eu consiga pegar o id do pokemon atual, somar mais um ao id e então chamar a função coloca dados que irá colocar os dados do próximo pokemon. Pode não ser a melhor lógica, mas foi a que eu consegui pensar
    dados = await buscarPokemon(pokemon); // aqui busca os dados do pokemon
    if (Number.isNaN(pokemon)) { // aqui é uma verificação que eu fiz caso o usuário clique em próximo não tendo nenhum id na carta ainda, fazendo com que retorne NaN na variável pokemon. Assim, se for NaN, ele vai para o primeiro pokemon
        pokemon = 1;
    } else {
        pokemon = dados.id + 1 // Soma +1 ao id do pokemon para passar o id do próximo pokemon à função colocarDados
    }
    colocarDados(event, pokemon)
})

anterior.addEventListener("click", async (event) => { // Faz o mesmo que o anterior, mas nesse caso ele diminui o id
    let pokemon = parseInt(id.textContent, 10);
    dados = await buscarPokemon(pokemon);
    pokemon = dados.id - 1
    colocarDados(event, pokemon)
})

imagem.addEventListener("click", async ()=>{
    let pokemon = nome.textContent // aqui ele pega o nome do pokemon que está sendo exibido na hora, pra quando o usuário clicar, ele vai mostrar as costas do pokemon que está sendo mostrado
    dados = await buscarPokemon(pokemon)
    if(clicouImagem == false){
        imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${dados.id}.png`;
        clicouImagem = true;
    } else {
        imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dados.id}.png`;
        clicouImagem = false;
    }
})

