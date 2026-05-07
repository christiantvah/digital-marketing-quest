// ===== TUTORIAL — 3 pasos onboarding =====
import { navigate } from '../core/router.js';
import { playClick } from '../core/audio.js';
import { el } from '../ui/components.js';

const STEPS = [
  {
    icon: '🎬',
    title: 'Primero: la HISTORIA',
    body: 'Cada sesión arranca con un capítulo narrativo. TINO te explica los conceptos como un YouTuber experto. Solo haz click para avanzar. Sin presión.',
  },
  {
    icon: '⚡',
    title: 'Después: el QUIZ',
    body: 'Una vez terminada la historia, vienen los retos: opción múltiple, drag & drop, emparejar, ordenar, completar frases. Cada respuesta te enseña algo nuevo, incluso si fallas.',
  },
  {
    icon: '👑',
    title: 'Al final: el BOSS BATTLE',
    body: '15 preguntas cronometradas mezclando todo. Modo permisivo: NO hay game over. El objetivo es que aprendas, no que te frustres. Empieza cuando estés listo.',
  },
];

export function renderTutorial(root) {
  let step = 0;
  const wrap = el('div', { class: 'tutorial' });
  const dots = el('div', { class: 'tutorial__dots', 'aria-hidden': 'true' });
  STEPS.forEach((_, i) => {
    dots.appendChild(el('div', { class: 'tutorial__dot' + (i === 0 ? ' is-active' : '') }));
  });

  function render() {
    wrap.innerHTML = '';
    const s = STEPS[step];
    wrap.appendChild(el('div', { class: 'tutorial__step-icon' }, s.icon));
    wrap.appendChild(el('h1', {}, s.title));
    wrap.appendChild(el('p', { style: 'font-size: 1.1rem; max-width: 480px; margin: 0 auto;' }, s.body));
    const dotsClone = dots.cloneNode(true);
    dotsClone.querySelectorAll('.tutorial__dot').forEach((d, i) => {
      d.classList.toggle('is-active', i === step);
    });
    wrap.appendChild(dotsClone);

    const buttons = el('div', { style: 'display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap;' });
    if (step > 0) {
      buttons.appendChild(el('button', { class: 'btn btn--ghost', onclick: prev }, '← Atrás'));
    }
    if (step < STEPS.length - 1) {
      buttons.appendChild(el('button', { class: 'btn btn--primary btn--lg', onclick: next }, 'Siguiente →'));
    } else {
      buttons.appendChild(el('button', { class: 'btn btn--primary btn--lg', onclick: finish }, '🚀 Empezar mi primer capítulo'));
    }
    if (step === 0) {
      buttons.appendChild(el('button', { class: 'btn btn--ghost', onclick: finish }, 'Saltar tutorial'));
    }
    wrap.appendChild(buttons);
  }

  function next() { playClick(); step++; render(); }
  function prev() { playClick(); step--; render(); }
  function finish() { playClick(); navigate('map'); }

  render();
  root.appendChild(wrap);
}
