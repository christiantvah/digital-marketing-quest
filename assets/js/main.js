// ===== MAIN — bootstrap del juego =====
import { register, navigate, getCurrent } from './core/router.js';
import { get, syncDocumentAttributes, applyMode, applySound, subscribe, resetAll } from './core/state.js';
import { unlock as unlockAudio, playClick, playHover } from './core/audio.js';

import { renderStart, renderHowToPlay } from './screens/start.js';
import { renderTutorial } from './screens/tutorial.js';
import { renderMap } from './screens/map.js';
import { renderStory } from './screens/story.js';
import { renderFlashQuiz } from './screens/flash-quiz.js';
import { renderQuiz } from './screens/quiz.js';
import { renderBoss } from './screens/boss.js';
import { renderResults } from './screens/results.js';
import { renderGlossary } from './screens/glossary.js';
import { renderCheatsheet } from './screens/cheatsheet.js';
import { renderReview } from './screens/review.js';

import { el } from './ui/components.js';

// === Register routes ===
register('start', renderStart);
register('how-to-play', renderHowToPlay);
register('tutorial', renderTutorial);
register('map', renderMap);
register('story', renderStory);
register('flash-quiz', renderFlashQuiz);
register('quiz', renderQuiz);
register('boss', renderBoss);
register('results', renderResults);
register('glossary', renderGlossary);
register('cheatsheet', renderCheatsheet);
register('review', renderReview);

// === Apply persisted settings ===
syncDocumentAttributes();

// === Topbar wiring ===
function setupTopbar() {
  const topbar = document.getElementById('topbar');
  const brandBtn = document.getElementById('brandBtn');
  const modeToggle = document.getElementById('modeToggle');
  const soundToggle = document.getElementById('soundToggle');
  const menuBtn = document.getElementById('menuBtn');

  // Topbar always visible (mode/sound/menu accesibles desde toda pantalla)
  topbar.hidden = false;

  brandBtn.addEventListener('click', () => {
    playClick();
    const cur = getCurrent();
    // En start, click sobre brand no hace nada útil (ya estás ahí).
    // En cualquier otra, te lleva al mapa.
    if (cur && cur.name && cur.name !== 'start') navigate('map');
  });
  brandBtn.addEventListener('mouseenter', () => playHover());

  modeToggle.addEventListener('click', () => {
    playClick();
    const cur = get().settings.mode;
    applyMode(cur === 'day' ? 'night' : 'day');
  });

  soundToggle.addEventListener('click', () => {
    const cur = get().settings.sound;
    applySound(!cur);
    if (!cur) { unlockAudio(); playClick(); }
  });

  menuBtn.addEventListener('click', (e) => {
    playClick();
    e.stopPropagation();
    toggleMenu();
  });

  // Update HUD on state changes
  function updateHud() {
    const s = get();
    const hud = document.getElementById('topbarHud');
    if (!hud) return;
    const cur = getCurrent();
    // En pantallas pre-juego no mostramos puntos/racha (no significan nada todavía).
    if (cur && (cur.name === 'start' || cur.name === 'tutorial' || cur.name === 'how-to-play')) {
      hud.innerHTML = '';
      return;
    }
    hud.innerHTML = `
      <span class="hud-item" title="Puntos totales">⭐ <strong>${s.scores.total}</strong></span>
      <span class="hud-item" title="Racha actual">🔥 <strong>${s.scores.streak}</strong></span>
    `;
  }
  subscribe(updateHud);
  updateHud();

  // Refresca el HUD cada vez que el contenido principal cambia (cambio de pantalla).
  const obs = new MutationObserver(() => {
    updateHud();
  });
  obs.observe(document.getElementById('app'), { childList: true });
}

// === Side menu ===
function toggleMenu() {
  const existing = document.getElementById('sideMenu');
  if (existing) {
    existing.remove();
    return;
  }
  const menu = el('div', { class: 'menu', id: 'sideMenu' });
  const items = [
    { icon: '🗺️', label: 'Mapa', action: () => navigate('map') },
    { icon: '📖', label: 'Glosario', action: () => navigate('glossary') },
    { icon: '📋', label: 'Cheat sheet', action: () => navigate('cheatsheet') },
    { icon: '📝', label: 'Modo revisión', action: () => navigate('review') },
    { icon: '❓', label: 'Cómo se juega', action: () => navigate('how-to-play') },
    { icon: '🏠', label: 'Inicio', action: () => navigate('start') },
    { divider: true },
    { icon: '🔄', label: 'Reiniciar todo', danger: true, action: () => {
      if (confirm('¿Reiniciar TODO el progreso? Esto no se puede deshacer.')) {
        resetAll();
        navigate('start');
      }
    } },
  ];
  items.forEach(it => {
    if (it.divider) {
      menu.appendChild(el('div', { class: 'menu__divider' }));
      return;
    }
    menu.appendChild(el('button', {
      class: `menu__item ${it.danger ? 'is-danger' : ''}`,
      type: 'button',
      onclick: () => { playClick(); document.getElementById('sideMenu')?.remove(); it.action(); }
    },
      el('span', { 'aria-hidden': 'true' }, it.icon),
      el('span', {}, it.label)
    ));
  });
  document.body.appendChild(menu);

  // Cerrar al hacer click fuera (excluyendo el botón que lo abre)
  setTimeout(() => {
    const onClick = (e) => {
      if (!menu.contains(e.target) && e.target.id !== 'menuBtn' && !e.target.closest('#menuBtn')) {
        menu.remove();
        document.removeEventListener('click', onClick);
      }
    };
    document.addEventListener('click', onClick);
    // ESC también cierra
    const onKey = (e) => {
      if (e.key === 'Escape') {
        menu.remove();
        document.removeEventListener('click', onClick);
        document.removeEventListener('keydown', onKey);
      }
    };
    document.addEventListener('keydown', onKey);
  }, 50);
}

// === First-time audio unlock on any user gesture ===
function setupAudioUnlock() {
  const unlock = () => {
    unlockAudio();
    document.removeEventListener('click', unlock);
    document.removeEventListener('keydown', unlock);
    document.removeEventListener('touchstart', unlock);
  };
  document.addEventListener('click', unlock);
  document.addEventListener('keydown', unlock);
  document.addEventListener('touchstart', unlock);
}

// === Reduced motion ===
function applyReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--t-fast', '0ms');
    document.documentElement.style.setProperty('--t-base', '0ms');
    document.documentElement.style.setProperty('--t-slow', '0ms');
  }
}

// === Boot ===
function boot() {
  setupTopbar();
  setupAudioUnlock();
  applyReducedMotion();
  navigate('start');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
