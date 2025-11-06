const galeria = document.getElementById('galeria');
const favoritos = document.getElementById('favoritos');
const contador = document.getElementById('contador');
const imagens = document.querySelectorAll('.draggable');

// Atualiza o contador de favoritos
function atualizarContador() {
  const total = favoritos.querySelectorAll('img').length;
  contador.textContent = `${total} personagem${total !== 1 ? 's' : ''}`;
}

// Eventos de arrastar das imagens
imagens.forEach(img => {
  img.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.src);
  });
});

// Quando imagem é arrastada sobre a área de favoritos
favoritos.addEventListener('dragover', e => {
  e.preventDefault();
  favoritos.classList.add('highlight');
});

// Quando sai da área de favoritos
favoritos.addEventListener('dragleave', () => {
  favoritos.classList.remove('highlight');
});

// Soltar imagem nos favoritos
favoritos.addEventListener('drop', e => {
  e.preventDefault();
  favoritos.classList.remove('highlight');

  const src = e.dataTransfer.getData('text/plain');

  // Verifica se já existe a imagem
  if (![...favoritos.querySelectorAll('img')].some(i => i.src === src)) {
    const novaImg = document.createElement('img');
    novaImg.src = src;
    novaImg.draggable = true;
    novaImg.classList.add('draggable');

    // Clicar remove a imagem dos favoritos
    novaImg.addEventListener('click', () => {
      novaImg.remove();
      atualizarContador();
    });

    favoritos.appendChild(novaImg);
    atualizarContador();
  }
});

// Permitir arrastar de volta para galeria
galeria.addEventListener('dragover', e => e.preventDefault());
galeria.addEventListener('drop', e => {
  e.preventDefault();
  const src = e.dataTransfer.getData('text/plain');
  const img = favoritos.querySelector(`img[src="${src}"]`);
  if (img) {
    img.remove();
    atualizarContador();
  }
});
