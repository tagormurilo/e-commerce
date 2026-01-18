const carrinhoItensContainer = document.querySelector('.carrinho-itens');
const btnAdicionarCarrinho = document.querySelectorAll('.adicionar-carinho');
let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];
window.addEventListener('DOMContentLoaded', () => {
    verificarCarrinhoVazio();
    carrinho.forEach(item => renderizarItemNoDOM(item));
});
function salvarNoLocalStorage() {
    localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));
}
btnAdicionarCarrinho.forEach((btn) => {
    btn.addEventListener('click', function(event) {
        const produtoContainer = event.currentTarget.closest('.produto');
        const nomeItem = produtoContainer.querySelector('.name-item').innerText;
        const precoItem = produtoContainer.querySelector('.preco').getAttribute('data-valor');
        const qtdItem = produtoContainer.querySelector('.input-qtd').value;
        const itemCarrinho = {
            id: Date.now(),
            nome: nomeItem,
            preco: precoItem,
            qtd: qtdItem
        };
        carrinho.push(itemCarrinho);
        salvarNoLocalStorage();
        verificarCarrinhoVazio();
        renderizarItemNoDOM(itemCarrinho);
    });
});
function renderizarItemNoDOM(item) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('card', 'w-50', 'mb-2');
    itemDiv.setAttribute('data-id', item.id); 
    const precoUnitario = parseFloat(item.preco.replace(',', '.'));
    const totalInicial = (precoUnitario * item.qtd).toFixed(2).replace('.', ',');
    itemDiv.innerHTML = `
        <div class= 'card-body'>
            <h5 class="card-title">${item.nome}</h5>
            <h5>R$ <span class="preco-no-carrinho" data-unitario="${item.preco}">${totalInicial}</span></h5>
            <div class="input-group">
                <input type="number" class="form-control input-qtd-carrinho" value="${item.qtd}">
            </div>
            <div class="btn-group me-2" role="group">
                <button type="button" class="btn btn-outline btn-custom btn-remover">Remover</button>
                <button type="button" class="btn btn-outline btn-custom btn-menos">-</button>
                <button type="button" class="btn btn-outline btn-custom btn-mais">+</button>
            </div>
        </div>
    `;
    carrinhoItensContainer.appendChild(itemDiv);
}
carrinhoItensContainer.addEventListener('click', function(event) {
    const card = event.target.closest('.card');
    if (!card) return;
    const idItem = parseInt(card.getAttribute('data-id'));
    const input = card.querySelector('.input-qtd-carrinho');
    let itemNoArray = carrinho.find(i => i.id === idItem);
    if (event.target.classList.contains('btn-mais')) {
        let novaQtd = parseInt(input.value) + 1;
        input.value = novaQtd;
        if (itemNoArray) itemNoArray.qtd = novaQtd;
    }

    if (event.target.classList.contains('btn-menos')) {
        let novaQtd = parseInt(input.value);
        if (novaQtd > 1) {
            novaQtd--;
            input.value = novaQtd;
            if (itemNoArray) itemNoArray.qtd = novaQtd;
        }
    }
    salvarNoLocalStorage();
    atualizarPrecoCarrinho(card, itemNoArray.preco); 
});
function atualizarPrecoCarrinho(card) {
    const input = card.querySelector('.input-qtd-carrinho');
    const elementoPrecoVisivel = card.querySelector('.preco-no-carrinho');
    const precoBase = elementoPrecoVisivel.getAttribute('data-unitario');
    let precoUnit = parseFloat(precoBase.replace(',', '.'));
    let quantidade = parseInt(input.value);
    const precoTotal = (precoUnit * quantidade).toFixed(2).replace('.', ',');
    elementoPrecoVisivel.innerText = precoTotal;
}
function removerItemDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarNoLocalStorage();
    const itemDiv = carrinhoItensContainer.querySelector(`div[data-id='${id}']`);
    if (itemDiv) {
        carrinhoItensContainer.removeChild(itemDiv);
    }
    verificarCarrinhoVazio();
}
carrinhoItensContainer.addEventListener('click', function(event) {
    const card = event.target.closest('.card');
    if (!card) return;
    const idItem = parseInt(card.getAttribute('data-id'));
    if (event.target.classList.contains('btn-remover')) {
        removerItemDoCarrinho(idItem);
    }
});
function verificarCarrinhoVazio() {
    if (carrinho.length === 0) {
        carrinhoItensContainer.innerHTML = `
            <div class="alert alert-light text-center w-100" role="alert">
                Seu carrinho está vazio!
            </div>`;
    } else {
        const mensagemVazio = carrinhoItensContainer.querySelector('.alert');
        if (mensagemVazio) {
            mensagemVazio.remove();
        }
    }
}
verificarCarrinhoVazio();