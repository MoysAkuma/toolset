/**
 * Obtiene la lista de perfiles configurados
 * @returns {Array} Array de perfiles con nombre, URL e icono
 */
export function getProfiles() {
  return [
    {
      id: 'github',
      name: 'GitHub',
      icon: '🐙',
      url: 'https://github.com/MoysAkuma',
      description: 'Proyectos y código'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/in/MoysAkuma',
      description: 'Perfil profesional'
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      icon: '🐦',
      url: 'https://twitter.com/MoysAkuma',
      description: 'Actualizaciones'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📸',
      url: 'https://instagram.com/MoysAkuma',
      description: 'Instagram personal'
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: '🌐',
      url: 'https://moysakuma.github.io/No.CV/',
      description: 'Online CV y proyectos destacados'
    },
    {
      id: 'email',
      name: 'Email',
      icon: '📧',
      url: 'mailto:moises.moran.dev@gmail.com',
      description: 'Contacto directo'
    }
  ];
}

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<void>}
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback para navegadores que no soportan clipboard API
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

/**
 * Genera texto formateado para compartir todos los perfiles
 * @param {Array} profiles - Array de perfiles
 * @returns {string} Texto formateado
 */
export function generateShareText(profiles) {
  const lines = ['🔗 Mis perfiles:', ''];
  
  profiles.forEach(profile => {
    lines.push(`${profile.icon} ${profile.name}: ${profile.url}`);
  });
  
  return lines.join('\n');
}

/**
 * Genera QR code data URL para un texto dado
 * @param {string} text - Texto para el QR
 * @returns {string} URL de QR code
 */
export function generateQRCodeUrl(text) {
  const encodedText = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedText}`;
}
