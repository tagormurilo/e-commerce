let dropArea = document.getElementById('drop-area');
const gameOption = document.getElementById('cardGame');
gameOption.addEventListener('change', (event) => {
  console.log("Jogo selecionado:", event.target.value);
  // Aqui você pode adicionar lógica adicional com base na seleção do jogo
});

// 1. Prevenir comportamentos padrão (abrir a imagem no navegador)
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

// 2. Adicionar efeito visual de destaque ao arrastar sobre a área
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
});

// 3. Lidar com os arquivos soltos (Drop)
dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;
  handleFiles(files);
}

// 4. Processar o arquivo (seja por clique ou arraste)
function handleFiles(files) {
  let file = files[0]; // Pegamos apenas a primeira imagem
  if (file && file.type.startsWith('image/')) {
    previewFile(file);
    console.log("Arquivo selecionado:", file.name);
    // Aqui você pode salvar o arquivo ou enviar para um servidor
  }
}

// Função para mostrar a imagem na tela (Preview)
function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement('img');
    img.src = reader.result;
    document.getElementById('gallery').innerHTML = ""; // Limpa anterior
    document.getElementById('gallery').appendChild(img);
  }
}

// 5. Permitir clique na área para abrir o seletor
dropArea.addEventListener('click', () => {
  document.getElementById('fileElem').click();
});