const buscar = document.querySelector("#busca")
const nomeBusca = document.querySelector("#nome")
const botao = document.querySelector("#enviar")

const nome = document.querySelector('#nomePokemon')
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






async function buscarPokemon(event) {
    event.preventDefault();

    const pokemon = nomeBusca.value;

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


        nome.innerText = dados.name;

        imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${dados.id}.png`;

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

    } catch (erro) {
        nome.innerText = "Erro ao buscar Pokemon";
        console.error(erro);
    }
}


botao.addEventListener("click", buscarPokemon);

buscar.addEventListener("submit", buscarPokemon);

