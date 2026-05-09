import { chunkArray, getBestLayout } from '../../../shared/js/core.js';
import { getPrintTemplate } from '../html/print-template.js';

/**
 * Genera y abre una ventana popup para imprimir las fotos
 * @param {Array} images - Array de imágenes a imprimir
 * @param {Array} pageConfigs - Configuraciones de página disponibles
 * @param {Array} tileConfigs - Configuraciones de tile disponibles
 */
export function generatePrintPopup(images, pageConfigs, tileConfigs) {
  const layout = getBestLayout(pageConfigs, tileConfigs);
  
  if (!layout || layout.perPage <= 0) {
    return;
  }

  const pages = chunkArray(images, layout.perPage);
  const popup = window.open('', '_blank');
  
  if (!popup) {
    return;
  }

  const htmlContent = getPrintTemplate(layout, pages);
  popup.document.write(htmlContent);
  popup.document.close();
}
