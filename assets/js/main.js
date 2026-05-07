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

  brandBtn.addEventListener('click', () => { playClick(); navigate('map'); });
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

  menuBtn.addEventListener('click', () => {
    playClick();
    toggleMenu();
  });

  // Update HUD on state changes
  function updateHud() {
    const s = get();
    const hud = document.getElementById('topbarHud');
    if (!hud) return;
    const cur = getCurrent();
    if (cur && (cur.name === 'start' || cur.name === 'tutorial' || cur.name === 'how-to-play')) {
      hud.innerHTML = '';
      return;
    }
    hud.innerHTML = `
      <span class="hud-item">⭐ <strong>${s.scores.total}</strong></span>
      <span class="hud-item">🔥 <strong>${s.scores.streak}</strong></span>
    `;
  }
  subscribe(updateHud);
  updateHud();

  // Show topbar on non-start screens
  function updateTopbarVisibility() {
    const cur = getCurrent();
    const hidden = !cur || cur.name === 'start';
    topbar.hidden = hidden;
  }
  // Patch navigate to update topbar
  const origNavigate = window.__origNavigate || navigate;
  window.__origNavigate = origNavigate;

  // Subscribe via mutation observer on app
  const obs = new MutationObserver(() => {
    updateTopbarVisibility();
    updateHud();
  });
  obs.observe(document.getElementById('app'), { childList: true });
  updateTopbarVisibility();
}

// === Side menu ===
let menuOpen = false;
function toggleMenu() {
  const existing = document.getElementById('sideMenu');
  if (existing) {
    existing.remove();
    menuOpen = false;
    return;
  }
  menuOpen = true;
  const menu = el('div', { class: 'menu', id: 'sideMenu' });
  const items = [
    { icon: '🗺️', label: 'Mapa', action: () => navigate('map') },
    { icon: '📖', label: 'Glosario', action: () => navigate('glossary') },
    { icon: '📋', label: 'Cheat sheet', action: () => navigate('cheatsheet') },
    { icon: '📝', label: 'Modo revisión', action: () => navigate('review') },
    { icon: '❓', label: 'Cómo se juega', action: () => navigate('how-to-play') },
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
      onclick: () => { playClick(); document.getElementById('sideMenu')?.remove(); menuOpen = false; it.action(); }
    },
      el('span', { 'aria-hidden': 'true' }, it.icon),
      el('span', {}, it.label)
    ));
  });
  document.body.appendChild(menu);

  // Close on outside click
  setTimeout(() => {
    const onClick = (e) => {
      if (!menu.contains(e.target) && e.target.id !== 'menuBtn') {
        menu.remove();
        menuOpen = false;
        document.removeEventListener('click', onClick);
      }
    };
    document.addEventListener('click', onClick);
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

  // Restore session if mid-game
  const state = get();
  if (state.player.name && state.progress.currentSession && !state.progress.sessionsCompleted.includes(state.progress.currentSession)) {
    // Could resume mid-story, but safer to land on map for clarity
    navigate('start');
  } else {
    navigate('start');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
