const imagens = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

imagens.forEach(img => {
  img.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.src);
  });
});

// Atualiza contador de cada zona
function atualizarContador(zona) {
  const contador = zona.id === 'favoritos'
    ? document.getElementById('contador-favoritos')
    : document.getElementById('contador-odiados');

  const total = zona.querySelectorAll('img').length;
  contador.textContent = `${total} personagem${total !== 1 ? 's' : ''}`;
}

// Configura todas as dropzones (favoritos e odiados)
dropzones.forEach(zona => {
  zona.addEventListener('dragover', e => {
    e.preventDefault();
    zona.classList.add('highlight');
  });

  zona.addEventListener('dragleave', () => {
    zona.classList.remove('highlight');
  });

  zona.addEventListener('drop', e => {
    e.preventDefault();
    zona.classList.remove('highlight');

    const src = e.dataTransfer.getData('text/plain');

    // Evita duplicadas
    if (![...zona.querySelectorAll('img')].some(i => i.src === src)) {
      const novaImg = document.createElement('img');
      novaImg.src = src;
      novaImg.draggable = true;
      novaImg.classList.add('draggable');

      // Clique remove imagem
      novaImg.addEventListener('click', () => {
        novaImg.remove();
        atualizarContador(zona);
      });

      zona.appendChild(novaImg);
      atualizarContador(zona);
    }
  });
});
