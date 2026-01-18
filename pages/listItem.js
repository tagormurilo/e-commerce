function vericarLogin() {
    const usuarioLogado = localStorage.getItem('logado');
    if (usuarioLogado === null) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('uIcon').src = '../pages/images/power.svg';
        document.getElementById('login').addEventListener('click', function(event) {
          event.preventDefault();
          logoutUser();
      });
    }
};
function logoutUser() {
    localStorage.clear();
    window.location.href = 'initial.html';
};
vericarLogin();

const btnMenos = document.querySelectorAll(".btn-menos");
const btnMais = document.querySelectorAll(".btn-mais");
const quantidadeInputs = document.querySelectorAll(".input-qtd");
const valorPadrao = 1;
quantidadeInputs.forEach((input) => {
    input.value = valorPadrao;
});
btnMenos.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        const card = event.currentTarget.closest(".produto");
        const input = card.querySelector(".input-qtd");
        let quantidade = parseInt(input.value);
        if (quantidade > 1) {
            input.value = quantidade - 1;
        }
        AtualizarPreco(card);
    });
});
btnMais.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        const card = event.currentTarget.closest(".produto");
        const input = card.querySelector(".input-qtd");
        let quantidade = parseInt(input.value);
        input.value = quantidade + 1;
        AtualizarPreco(card);
    });
});
function AtualizarPreco(card) {
    const input = card.querySelector(".input-qtd");
    const elementoPreco = card.querySelector(".preco");
    const valorUnit = elementoPreco.getAttribute("data-valor");
    let textoLimpo = valorUnit.replace(",", ".");
    let precoUnit = parseFloat(textoLimpo);
    let quantidade = parseInt(input.value);
    const precoTotal = precoUnit * quantidade;
    const precoTotalFormatado = precoTotal.toFixed(2).replace(".", ",");
    elementoPreco.innerText = precoTotalFormatado;
}
const cartas = [
    {id: 1, nome: "Blastoise EX", raridade: "Ilustração Especial Rara", preco: "R$ 900,00", categoria: "Pokémon"},
    {id: 2, nome: "Decodificar Transmissor", raridade: "Ultra Rara", preco: "R$ 1,00", categoria: "Yu-gi-oh"},
    {id: 3, nome: "Ilha", raridade: "Comum", preco: "R$ 0,20", categoria: "Magic: The Gathering"},
    {id: 4, nome: "Ilha Full Art", raridade: "Comum", preco: "R$ 5,62", categoria: "Magic: The Gathering"},
    {id: 5, nome: "Pikachu", raridade: "Comum", preco: "R$ 0,20", categoria: "Pokémon"},
    {id: 6, nome: "Mago Negro", raridade:"Ultra Rara" , preco:"R$ 18,00" , categoria:"Yu-gi-oh" },
];
const containerItens = document.getElementById('lista-itens');
const spanTermo = document.getElementById('termo-busca');
const urlParams = new URLSearchParams(window.location.search);
const termo = urlParams.get('busca')?.toLowerCase() || "";
spanTermo.textContent = termo;
function filtrarEExibir() {
    const resultados = produtos.filter(produto => {
        return produto.nome.toLowerCase().includes(termo) || 
               produto.categoria.toLowerCase().includes(termo);
    });
    containerItens.innerHTML = "";
}
filtrarEExibir();
