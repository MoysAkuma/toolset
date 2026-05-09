/**
 * Genera el template HTML para imprimir las fotos
 * @param {Object} layout - Configuración del layout (page, columns, rows, tile)
 * @param {Array} pages - Array de páginas con imágenes
 * @returns {string} HTML completo para imprimir
 */
export function getPrintTemplate(layout, pages) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Impresión fotográfica</title>
    <style>
      @page { size: ${layout.page.pageSize}; margin: 0; }
      * { box-sizing: border-box; }
      body { margin: 0; background: #fff; }
      .sheet {
        width: ${layout.page.widthIn}in;
        height: ${layout.page.heightIn}in;
        padding: ${layout.page.marginIn}in;
        display: grid;
        grid-template-columns: repeat(${layout.columns}, ${layout.tile.widthIn}in);
        grid-template-rows: repeat(${layout.rows}, ${layout.tile.heightIn}in);
        gap: ${layout.page.gapIn}in;
        page-break-after: always;
      }
      .tile {
        width: ${layout.tile.widthIn}in;
        height: ${layout.tile.heightIn}in;
        overflow: hidden;
        border: 1px dashed #ccc;
      }
      .tile img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      @media print { .sheet:last-child { page-break-after: auto; } }
    </style>
  </head>
  <body>
    ${pages
      .map(
        (page) =>
          `<section class="sheet">${page
            .map((image) => `<figure class="tile"><img alt="${image.name}" src="${image.src}" /></figure>`)
            .join('')}</section>`
      )
      .join('')}
    <script>window.onload = () => window.print();<\/script>
  </body>
</html>`;
}
