const urlAPI = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0";

const listarPokemons = document.getElementById("listar-pokemons");

//Mapear os elementos de busca
const inputBusca =  document.getElementById("txt-busca");

async function carregarPokemons() {
    try {
        const resposta = await fetch(urlAPI);
        const dados = await resposta.json();

        console.log(dados);

        dados.results.forEach(async (pokemon) => {
            const nome = pokemon.name;
            const respostaPokemon = await fetch(pokemon.url);
            const dadosPokemon = await respostaPokemon.json();

            //dados completos de 1 pokemon
            console.log(dadosPokemon);
            
            const imagem = dadosPokemon.sprites.front_default;

            const pokemonDiv = document.createElement("div");
            const imagemPokemon = document.createElement("img");

            // Adicionar o nome do pokemon na div
            pokemonDiv.setAttribute("class", "card text-dark bg-light mb-3 p-2")

            imagemPokemon.setAttribute("src", imagem);
            imagemPokemon.setAttribute("class","card-img-top");
            pokemonDiv.appendChild(imagemPokemon);
            pokemonDiv.appendChild(document.createTextNode(nome));

            // Adicionar a div na lista de pokemons
            listarPokemons.appendChild(pokemonDiv);
        });

    } catch (error) {
        console.error("Erro ao carregar os pokemons: ", error);
    }
}

carregarPokemons();

//função para filtrar as musicas com base na busca
inputBusca.addEventListener("input", () => {
    const termoBusca = inputBusca.value.toLowerCase();//obtem o termo que busca e converte
    const todosPokemons = listarPokemons.getElementsByTagName("div");
    
    for(const item of todosPokemons){
        if(item.textContent.toLowerCase().includes(termoBusca)){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    }
});