// ===== MAP SCREEN — selección de niveles =====
import { get, getSessionMeta, isSessionUnlocked, isSessionCompleted, getSessionScore, SESSIONS, applyMode } from '../core/state.js';
import { navigate } from '../core/router.js';
import { playClick, playWoosh, playWarning } from '../core/audio.js';
import { el } from '../ui/components.js';
import { lockIcon, checkIcon } from '../ui/svg-icons.js';

export function renderMap(root) {
  const state = get();
  const wrap = el('div', { class: 'map' });

  wrap.appendChild(el('div', { class: 'map__header' },
    el('h1', { class: 'text-gradient' }, `Hola, ${state.player.name || 'marketer'} 👋`),
    el('p', { style: 'color: var(--text-soft); font-size: 1.05rem;' }, 'Tu ruta de aprendizaje. Cada hito desbloquea el siguiente.')
  ));

  const path = el('div', { class: 'map__path' });

  SESSIONS.forEach(id => {
    const meta = getSessionMeta(id);
    const unlocked = isSessionUnlocked(id);
    const completed = isSessionCompleted(id);
    const score = getSessionScore(id);

    const node = el('button', {
      class: `map__node ${unlocked ? (completed ? 'map__node--completed' : 'map__node--available') : 'map__node--locked'}`,
      type: 'button',
      'aria-label': `${meta.title}. ${unlocked ? (completed ? 'Completado' : 'Disponible') : 'Bloqueado'}`,
      onclick: () => onSelect(id, unlocked),
    });

    if (!unlocked) {
      node.appendChild(el('div', { class: 'map__node-lock', html: lockIcon() }));
    } else if (completed) {
      node.appendChild(el('div', { class: 'map__node-badge', 'aria-hidden': 'true' }, '✓'));
    }

    node.appendChild(el('div', { class: 'map__node-icon', 'aria-hidden': 'true' }, meta.icon));
    node.appendChild(el('div', { class: 'map__node-title' }, meta.title));
    node.appendChild(el('div', { class: 'map__node-status' }, meta.subtitle));

    if (completed && score.total) {
      node.appendChild(el('div', { class: 'map__node-stars' }, `⭐ ${score.points || 0} pts · ${score.correct || 0}/${score.total || 0}`));
    }

    path.appendChild(node);
  });

  wrap.appendChild(path);

  // Footer info
  const total = state.scores.total;
  const totalCompleted = state.progress.sessionsCompleted.length;
  wrap.appendChild(el('div', { class: 'card', style: 'text-align: center; margin-top: var(--space-5);' },
    el('h3', {}, `Progreso global: ${totalCompleted}/${SESSIONS.length}`),
    el('p', {}, `${total} puntos acumulados · ${state.scores.correctTotal} respuestas correctas · racha máxima 🔥 ${state.scores.maxStreak}`),
    state.review.failedQuestions.length > 0
      ? el('button', { class: 'btn btn--ghost', style: 'margin-top: var(--space-3);', onclick: () => { playClick(); navigate('review'); } }, `📝 Repasar ${state.review.failedQuestions.length} preguntas falladas`)
      : null
  ));

  root.appendChild(wrap);

  function onSelect(id, unlocked) {
    if (!unlocked) {
      playWarning();
      import('../ui/components.js').then(m => m.showToast('🔒 Completa la sesión anterior para desbloquear', ''));
      return;
    }
    playWoosh();
    const meta = getSessionMeta(id);
    if (meta.mode) applyMode(meta.mode);
    if (id === 'boss') navigate('boss', { sessionId: id });
    else navigate('story', { sessionId: id, sceneIndex: 0 });
  }
}
