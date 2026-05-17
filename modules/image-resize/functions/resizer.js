/**
 * Carga una imagen desde un archivo
 * @param {File} file - Archivo de imagen
 * @returns {Promise<HTMLImageElement>} - Imagen cargada
 */
export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Error al cargar la imagen'));
      img.src = e.target.result;
    };
    
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
}

/**
 * Redimensiona una imagen y la convierte al formato especificado
 * @param {HTMLImageElement} image - Imagen original
 * @param {number} newWidth - Nuevo ancho
 * @param {number} newHeight - Nuevo alto
 * @param {string} format - Formato de salida ('image/jpeg', 'image/png', 'image/webp')
 * @param {number} quality - Calidad de compresión (0-1)
 * @returns {Promise<Blob>} - Blob de la imagen procesada
 */
export function resizeImage(image, newWidth, newHeight, format, quality) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Configurar suavizado para mejor calidad
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Dibujar imagen redimensionada
      ctx.drawImage(image, 0, 0, newWidth, newHeight);
      
      // Convertir a blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Error al crear el blob'));
          }
        },
        format,
        quality
      );
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Formatea el tamaño de un archivo en bytes a un formato legible
 * @param {number} bytes - Tamaño en bytes
 * @returns {string} - Tamaño formateado (ej: "1.5 MB")
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Obtiene la extensión de archivo correspondiente al tipo MIME
 * @param {string} mimeType - Tipo MIME (ej: 'image/jpeg')
 * @returns {string} - Extensión (ej: 'jpg')
 */
export function getExtensionFromMimeType(mimeType) {
  const extensions = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/bmp': 'bmp'
  };
  
  return extensions[mimeType] || 'jpg';
}
