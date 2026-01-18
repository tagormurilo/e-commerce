const campoPesquisa = document.getElementById('campoPesquisa');
const btnPesquisa = document.getElementById('btnPesquisa');
function realizarBusca() {
    const termo = campoPesquisa.value.trim();
    if (termo !== "") {
        window.location.href = `listItem.html?busca=${encodeURIComponent(termo)}`;
    } else {
        alert("Por favor, digite algo para pesquisar.");
    }
}
btnPesquisa.addEventListener('click', realizarBusca);
campoPesquisa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        realizarBusca();
    }
});