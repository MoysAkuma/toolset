import { getBestLayout } from '../../../shared/js/core.js';

/**
 * Renderiza la lista de fotos cargadas y actualiza el resumen
 * @param {Array} images - Array de imágenes cargadas
 * @param {HTMLElement} list - Elemento DOM de la lista
 * @param {HTMLElement} summary - Elemento DOM del resumen
 * @param {HTMLButtonElement} generateButton - Botón de generar
 * @param {Array} pageConfigs - Configuraciones de página disponibles
 * @param {Array} tileConfigs - Configuraciones de tile disponibles
 */
export function renderPhotoList(images, list, summary, generateButton, pageConfigs, tileConfigs) {
  list.innerHTML = '';

  if (images.length === 0) {
    summary.textContent = 'No hay fotos cargadas.';
    generateButton.disabled = true;
    return;
  }

  const layout = getBestLayout(pageConfigs, tileConfigs);
  summary.textContent = `${images.length} foto(s) cargadas · ${layout.perPage} por página (${layout.columns}x${layout.rows})`;
  generateButton.disabled = layout.perPage === 0;

  for (const image of images) {
    const item = document.createElement('div');
    item.className = 'photo-item';
    item.innerHTML = `<img alt="${image.name}" src="${image.src}" /><span>${image.name}</span>`;
    list.appendChild(item);
  }
}
