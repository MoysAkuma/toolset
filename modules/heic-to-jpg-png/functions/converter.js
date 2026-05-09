/**
 * Convierte archivos HEIC al formato especificado
 * @param {File[]} files - Array de archivos HEIC a convertir
 * @param {string} format - Formato de salida ('image/jpeg' o 'image/png')
 * @param {string} extension - Extensión del archivo ('jpg' o 'png')
 * @param {HTMLElement} statusElement - Elemento para mostrar el progreso
 */
export async function convertHeicFiles(files, format, extension, statusElement) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    statusElement.textContent = `Convirtiendo ${i + 1} de ${files.length}: ${file.name}...`;
    
    try {
      const blob = await heic2any({ 
        blob: file, 
        toType: format,
        quality: 0.9
      });
      
      // Si heic2any devuelve un array (múltiples imágenes), usar el primero
      const convertedBlob = Array.isArray(blob) ? blob[0] : blob;
      
      downloadFile(convertedBlob, file.name, extension);
    } catch (error) {
      console.error(`Error convirtiendo ${file.name}:`, error);
      throw error;
    }
  }
}

/**
 * Descarga un archivo convertido
 * @param {Blob} blob - Blob del archivo convertido
 * @param {string} originalName - Nombre original del archivo
 * @param {string} extension - Nueva extensión
 */
function downloadFile(blob, originalName, extension) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Reemplazar la extensión .heic por la nueva
  const newName = originalName.replace(/\.(heic|HEIC)$/i, `.${extension}`);
  
  link.href = url;
  link.download = newName;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Liberar el URL después de un tiempo
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Renderiza la lista de archivos seleccionados
 * @param {File[]} files - Array de archivos
 * @param {HTMLElement} listElement - Elemento DOM de la lista
 */
export function renderFileList(files, listElement) {
  listElement.innerHTML = '';
  
  if (files.length === 0) {
    return;
  }
  
  files.forEach((file) => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.style.cssText = 'padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 4px;';
    item.innerHTML = `
      <strong>${file.name}</strong>
      <span style="color: #666; font-size: 0.9em; margin-left: 8px;">
        (${(file.size / 1024).toFixed(1)} KB)
      </span>
    `;
    listElement.appendChild(item);
  });
}
