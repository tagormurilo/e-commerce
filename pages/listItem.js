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
