export async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`No se pudo cargar: ${path}`);
  }
  return response.json();
}

export function chunkArray(items, size) {
  const chunks = [];
  for (let startIndex = 0; startIndex < items.length; startIndex += size) {
    chunks.push(items.slice(startIndex, startIndex + size));
  }
  return chunks;
}

export async function readFilesAsDataURLs(files) {
  const validFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));

  const images = await Promise.all(
    validFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ name: file.name, src: String(reader.result) });
          reader.onerror = () => reject(new Error(`No se pudo leer ${file.name}`));
          reader.readAsDataURL(file);
        })
    )
  );

  return images;
}

export function getBestLayout(pageConfigs, tileConfigs) {
  let best = null;

  for (const page of pageConfigs) {
    for (const tile of tileConfigs) {
      const columns = Math.floor((page.widthIn - page.marginIn * 2 + page.gapIn) / (tile.widthIn + page.gapIn));
      const rows = Math.floor((page.heightIn - page.marginIn * 2 + page.gapIn) / (tile.heightIn + page.gapIn));
      const perPage = Math.max(0, columns * rows);

      if (!best || perPage > best.perPage) {
        best = { page, tile, columns, rows, perPage };
      }
    }
  }

  return best;
}
