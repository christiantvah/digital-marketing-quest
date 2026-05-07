// ===== START SCREEN =====
import { get, setPlayerName } from '../core/state.js';
import { navigate } from '../core/router.js';
import { playClick, unlock as unlockAudio } from '../core/audio.js';
import { tinoAvatar } from '../ui/svg-icons.js';
import { el } from '../ui/components.js';

export function renderStart(root) {
  const state = get();
  const hasProgress = state.progress.sessionsCompleted.length > 0 || (state.player.name && !state.meta.firstPlay);
  const mode = state.settings.mode || 'day';

  const wrap = el('div', { class: 'start' });

  // Avatar de TINO
  const avatar = el('div', { class: 'start__avatar tino-bobble', html: tinoAvatar(mode) });
  wrap.appendChild(avatar);

  // Hero
  wrap.appendChild(el('h1', { class: 'start__hero text-gradient' }, 'Digital Marketing Quest'));
  wrap.appendChild(el('p', { class: 'start__tagline' }, 'Aprende marketing digital jugando con TINO. 5 capítulos narrativos, retos interactivos y una batalla final.'));

  // Form
  const nameInput = el('input', {
    class: 'input',
    type: 'text',
    placeholder: state.player.name || '¿Cómo te llamamos, marketer?',
    maxlength: '32',
    autocomplete: 'off',
    'aria-label': 'Tu nombre',
  });
  if (state.player.name) nameInput.value = state.player.name;

  const form = el('form', { class: 'start__form', onsubmit: (e) => { e.preventDefault(); start(); } },
    el('label', { class: 'field' },
      el('span', {}, 'Tu nombre de marketer'),
      nameInput
    )
  );

  const buttons = el('div', { class: 'start__buttons' });
  if (hasProgress) {
    buttons.appendChild(el('button', { class: 'btn btn--primary btn--lg', type: 'button', onclick: start }, '▶  Continuar mi quest'));
    buttons.appendChild(el('button', { class: 'btn btn--ghost', type: 'button', onclick: resetGame }, 'Empezar de nuevo'));
  } else {
    buttons.appendChild(el('button', { class: 'btn btn--primary btn--lg', type: 'button', onclick: start }, '▶  Comenzar mi quest'));
  }
  buttons.appendChild(el('button', { class: 'btn btn--ghost', type: 'button', onclick: () => { playClick(); navigate('glossary'); } }, '📖 Glosario'));
  buttons.appendChild(el('button', { class: 'btn btn--ghost', type: 'button', onclick: () => { playClick(); navigate('how-to-play'); } }, '❓ Cómo se juega'));

  wrap.appendChild(form);
  wrap.appendChild(buttons);

  // Features
  const features = el('div', { class: 'start__features' });
  [
    { icon: '🎬', label: 'Historia inmersiva', text: '90 escenas narrativas con TINO' },
    { icon: '🧠', label: 'Aprende jugando', text: '110+ retos interactivos' },
    { icon: '👑', label: 'Boss Battle final', text: '15 preguntas cronometradas' },
    { icon: '🔁', label: 'Modo revisión', text: 'Repasa tus errores' },
  ].forEach(f => {
    features.appendChild(el('div', { class: 'start__feature' },
      el('span', { class: 'icon', 'aria-hidden': 'true' }, f.icon),
      el('div', { class: 'label' }, f.label),
      el('div', { class: 'text' }, f.text)
    ));
  });
  wrap.appendChild(features);

  root.appendChild(wrap);

  setTimeout(() => nameInput.focus(), 200);

  function start() {
    unlockAudio(); // first user gesture
    playClick();
    // Capturamos firstPlay ANTES de setPlayerName porque setPlayerName lo apaga.
    const isFirstTime = state.meta.firstPlay && !hasProgress;
    const name = nameInput.value.trim();
    if (name) setPlayerName(name);
    else if (!state.player.name) setPlayerName('Marketer');

    if (isFirstTime) {
      navigate('tutorial');
    } else {
      navigate('map');
    }
  }

  function resetGame() {
    if (confirm('¿Reiniciar todo el progreso? Esto borrará tus puntos, insignias y avance.')) {
      import('../core/state.js').then(m => {
        m.resetAll();
        navigate('start');
      });
    }
  }
}

// === Pantalla "Cómo se juega" ===
export function renderHowToPlay(root) {
  const wrap = el('div', { class: 'tutorial' });
  wrap.appendChild(el('h1', { class: 'text-gradient' }, '¿Cómo se juega?'));
  wrap.appendChild(el('div', { class: 'card', style: 'text-align: left;' },
    el('h3', { style: 'margin-bottom: var(--space-3); color: var(--primary);' }, '🎓 1. Aprende con la historia'),
    el('p', {}, 'Cada sesión empieza con un capítulo narrativo: TINO te explica los conceptos como si fuera un YouTuber experto. Click para avanzar escena por escena. Las cifras importantes aparecen como tarjetas brillantes (memorízalas).'),
    el('br'),
    el('h3', { style: 'margin-bottom: var(--space-3); color: var(--secondary);' }, '⚡ 2. Flash Quiz inmediato'),
    el('p', {}, 'Al terminar el capítulo, 3 preguntas rápidas tipo flashcard sobre los datos clave. Si sacas las 3 perfecto, ganas una medalla de "Pro Memoria".'),
    el('br'),
    el('h3', { style: 'margin-bottom: var(--space-3); color: var(--accent);' }, '🎯 3. Quiz formal'),
    el('p', {}, 'Después viene el quiz completo con 6 mecánicas: opción múltiple, arrastrar y soltar, emparejar, ordenar, completar frase, verdadero/falso. No hay vidas — fallar no te elimina, solo te enseña la respuesta correcta.'),
    el('br'),
    el('h3', { style: 'margin-bottom: var(--space-3); color: var(--purple);' }, '👑 4. Boss Battle'),
    el('p', {}, '15 preguntas cronometradas mezclando todo lo aprendido. 15 segundos por pregunta. Bonus si respondes en menos de 5 segundos. Insignia 👑 CMO Digital si lo haces perfecto.'),
    el('br'),
    el('h3', { style: 'margin-bottom: var(--space-3); color: var(--error);' }, '💡 Pistas y puntos'),
    el('p', {}, '+100 acierto a la primera. +50 acierto con pista (cuesta 50 pts). Bonus de +50 cada 3 aciertos seguidos (racha 🔥). Tu progreso se guarda automáticamente.'),
  ));
  wrap.appendChild(el('button', { class: 'btn btn--primary btn--lg', onclick: () => { playClick(); navigate('start'); } }, '✓ Entendido'));
  root.appendChild(wrap);
}
