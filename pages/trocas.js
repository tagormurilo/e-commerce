let dropArea = document.getElementById('drop-area');
const gameOption = document.getElementById('cardGame');
const rareYugi = document.getElementById('rareYugi');
const espRareYugi = document.getElementById('espRareYugi');
const rareMagic = document.getElementById('rareMagic');
const espRareMagic = document.getElementById('espRareMagic');
const rarePoke = document.getElementById('rarePoke');
const espRarePoke = document.getElementById('espRarePoke');
vericarLogin();
rareYugi.style.display = 'none';
espRareYugi.style.display = 'none';
rareMagic.style.display = 'none';
espRareMagic.style.display = 'none';
rarePoke.style.display = 'none';
espRarePoke.style.display = 'none';
gameOption.addEventListener('change', (event) => {
  console.log("Jogo selecionado:", event.target.value);
  if (gameOption.value === "1") {
    rareYugi.style.display = 'block';
    espRareYugi.style.display = 'block';
    rareMagic.style.display = 'none';
    espRareMagic.style.display = 'none';
    rarePoke.style.display = 'none';
    espRarePoke.style.display = 'none';
  } else if (gameOption.value === "2") {
    rareMagic.style.display = 'block';
    espRareMagic.style.display = 'block';
    rareYugi.style.display = 'none';
    espRareYugi.style.display = 'none';
    rarePoke.style.display = 'none';
    espRarePoke.style.display = 'none';
  } else if (gameOption.value === "3") {
    rarePoke.style.display = 'block';
    espRarePoke.style.display = 'block';
    rareYugi.style.display = 'none';
    espRareYugi.style.display = 'none';
    rareMagic.style.display = 'none';
    espRareMagic.style.display = 'none';
  }
});
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false); // Bloqueia na página toda
});
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}
dropArea.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}, false);
dropArea.addEventListener('click', () => {
    document.getElementById('fileElem').click();
});
let imgArray = []; 
const MAX_IMAGENS = 5;
const gallery = document.getElementById('gallery');
function handleFiles(files) {
    let filesToProcess = Array.from(files);
    filesToProcess.forEach(file => {
      if (file.type.startsWith('image/')) {
        if (imgArray.length < MAX_IMAGENS) {
          imgArray.push(file);
          previewFile(file);
        } else {
          alert('Limite máximo de 5 imagens atingido!');
        }
    }
  });
}
function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      let div = document.createElement('div');
      div.style.position = 'relative';
      div.style.display = 'inline-block';
      let img = document.createElement('img');
      img.src = reader.result;
      img.className = 'thumb';
      let btnRemover = document.createElement('button');
      btnRemover.innerText = 'X';
      btnRemover.className = 'btn-delete';
      btnRemover.onclick = (e) => {
        e.stopPropagation(); 
        div.remove(); 
        imgArray = imgArray.filter(f => f !== file); 
      };
      div.appendChild(img);
      div.appendChild(btnRemover);
      gallery.appendChild(div);
    }
}
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
document.getElementById('enviar').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Formulário enviado com sucesso!');
    imgArray = [];
    gallery.innerHTML = '';
    gameOption.value = '';
    rareYugi.style.display = 'none';
    espRareYugi.style.display = 'none';
    rareMagic.style.display = 'none';
    espRareMagic.style.display = 'none';
    rarePoke.style.display = 'none';
    espRarePoke.style.display = 'none';
});