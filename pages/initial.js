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