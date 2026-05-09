import { copyToClipboard, generateQRCodeUrl } from './profile-manager.js';

/**
 * Renderiza la lista de perfiles en el contenedor
 * @param {Array} profiles - Array de perfiles
 * @param {HTMLElement} container - Contenedor DOM
 * @param {Function} showToast - Función para mostrar notificaciones
 */
export function renderProfiles(profiles, container, showToast) {
  container.innerHTML = '';

  profiles.forEach(profile => {
    const card = createProfileCard(profile, showToast);
    container.appendChild(card);
  });
}

/**
 * Crea una tarjeta de perfil individual
 * @param {Object} profile - Objeto de perfil
 * @param {Function} showToast - Función para mostrar notificaciones
 * @returns {HTMLElement} Elemento de tarjeta
 */
function createProfileCard(profile, showToast) {
  const card = document.createElement('div');
  card.className = 'profile-card';

  card.innerHTML = `
    <div class="profile-icon">${profile.icon}</div>
    <div class="profile-name">${profile.name}</div>
    <div class="profile-url" title="${profile.url}">${shortenUrl(profile.url)}</div>
    ${profile.description ? `<p class="helper" style="margin-bottom: 12px;">${profile.description}</p>` : ''}
    <div class="profile-actions">
      <button class="visit-btn" data-url="${profile.url}">Visitar</button>
      <button class="copy-btn" data-url="${profile.url}">Copiar</button>
      <button class="qr-btn" data-url="${profile.url}" data-name="${profile.name}">QR</button>
    </div>
  `;

  // Agregar event listeners
  const visitBtn = card.querySelector('.visit-btn');
  const copyBtn = card.querySelector('.copy-btn');
  const qrBtn = card.querySelector('.qr-btn');

  visitBtn.addEventListener('click', () => {
    window.open(profile.url, '_blank');
  });

  copyBtn.addEventListener('click', async () => {
    await copyToClipboard(profile.url);
    showToast(`✓ ${profile.name} copiado`);
  });

  qrBtn.addEventListener('click', () => {
    showQRCodeModal(profile.url, profile.name);
  });

  return card;
}

/**
 * Acorta una URL para visualización
 * @param {string} url - URL completa
 * @returns {string} URL acortada
 */
function shortenUrl(url) {
  if (url.length <= 40) return url;
  return url.substring(0, 37) + '...';
}

/**
 * Muestra un modal con el código QR
 * @param {string} url - URL para generar QR
 * @param {string} name - Nombre del perfil
 */
function showQRCodeModal(url, name) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 24px;
    border-radius: 8px;
    text-align: center;
    max-width: 90%;
  `;

  const qrUrl = generateQRCodeUrl(url);
  
  content.innerHTML = `
    <h2 style="margin-top: 0;">${name}</h2>
    <img src="${qrUrl}" alt="QR Code" style="max-width: 100%; height: auto;" />
    <p style="color: #666; font-size: 0.9rem; margin: 12px 0;">Escanea para acceder</p>
    <button style="padding: 10px 20px; cursor: pointer;">Cerrar</button>
  `;

  const closeBtn = content.querySelector('button');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });

  modal.appendChild(content);
  document.body.appendChild(modal);
}
