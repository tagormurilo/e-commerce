const btnLogin = document.getElementById('btLog');
btnLogin.addEventListener('click', function() {
    const emailValue = document.getElementById('floatingInput').value;
    const passwordValue = document.getElementById('floatingPassword').value;
    if (!emailValue || !passwordValue) {
      alert('Por favor, preencha todos os campos.');
      return;
    } if (passwordValue.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    } if (!emailValue.includes('@')) {
      alert('Por favor, insira um email válido.');
      return;
    }
    localStorage.setItem('logado', 'true');
    localStorage.setItem('usuarioEmail', emailValue);
    if (document.referrer) {
      window.location.href = document.referrer;
    } else {
      window.location.href = 'initial.html';
    }
  });
document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    btnLogin.click();
  }
});