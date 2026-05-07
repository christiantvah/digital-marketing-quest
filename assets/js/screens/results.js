// ===== RESULTS SCREEN — resumen de nivel + final =====
import { navigate } from '../core/router.js';
import { playClick, playFinalVictory } from '../core/audio.js';
import { get, getSessionMeta, SESSIONS, getSessionScore } from '../core/state.js';
import { el, showToast, copyToClipboard, fireConfetti } from '../ui/components.js';

const BADGE_DEFS = [
  { id: 's1', emoji: '🏛️', label: 'Historiador Digital' },
  { id: 's2', emoji: '🔍', label: 'Espía POEM' },
  { id: 's3', emoji: '🧠', label: 'Lector de Mentes' },
  { id: 's35', emoji: '🤖', label: 'Domador de IA' },
  { id: 's4', emoji: '🛠️', label: 'Maestro de Herramientas' },
  { id: 'boss', emoji: '⚔️', label: 'Boss vencido' },
  { id: 'cmo', emoji: '👑', label: 'CMO Digital (Boss perfecto)' },
  { id: 'marathon', emoji: '🌟', label: 'Marathonista (5 sesiones sin saltar)' },
  { id: 'memory', emoji: '🎯', label: 'Pro Memoria (Flash perfectos)' },
];

export function renderResults(root, params) {
  const state = get();
  const isFinal = !!params.isFinal;
  const sessionId = params.sessionId;
  const meta = getSessionMeta(sessionId);

  const wrap = el('div', { class: 'results' });

  if (isFinal) {
    const allDone = SESSIONS.every(s => state.progress.sessionsCompleted.includes(s));
    const heroTitle = params.perfect ? '👑 ¡CMO DIGITAL!' : (allDone ? '🎉 ¡QUEST COMPLETO!' : '👑 Boss vencido');
    wrap.appendChild(el('div', { class: 'results__hero' },
      el('h1', {}, heroTitle),
      el('p', { style: 'opacity: 0.9; font-size: 1.1rem;' }, params.perfect
        ? `${state.player.name}, eres oficialmente CMO Digital. Sacaste ${params.correct}/${params.total} en el Boss Battle.`
        : `${state.player.name}, terminaste tu quest con ${state.scores.total} puntos. Buen trabajo.`),
      el('div', { class: 'results__score', style: 'margin-top: var(--space-4);' }, String(state.scores.total))
    ));

    if (params.perfect || allDone) {
      setTimeout(() => fireConfetti(2400, 150), 200);
    }
  } else {
    const accuracy = params.accuracy != null ? Math.round(params.accuracy * 100) : 0;
    wrap.appendChild(el('div', { class: 'results__hero' },
      el('h1', {}, `${meta.icon} ¡${meta.title} completada!`),
      el('p', { style: 'opacity: 0.9;' }, `${params.correct}/${params.total} respuestas correctas · ${accuracy}% de aciertos`),
      el('div', { class: 'results__score', style: 'margin-top: var(--space-4);' }, '+' + (params.points || 0))
    ));
  }

  // Stats
  const stats = el('div', { class: 'results__stats' });
  stats.appendChild(el('div', { class: 'results__stat' },
    el('div', { class: 'num' }, String(state.scores.total)),
    el('div', { class: 'label' }, 'Puntos totales')
  ));
  stats.appendChild(el('div', { class: 'results__stat' },
    el('div', { class: 'num' }, String(state.scores.correctTotal)),
    el('div', { class: 'label' }, 'Aciertos totales')
  ));
  stats.appendChild(el('div', { class: 'results__stat' },
    el('div', { class: 'num' }, '🔥 ' + state.scores.maxStreak),
    el('div', { class: 'label' }, 'Racha máxima')
  ));
  stats.appendChild(el('div', { class: 'results__stat' },
    el('div', { class: 'num' }, String(state.badges.length)),
    el('div', { class: 'label' }, 'Insignias')
  ));
  wrap.appendChild(stats);

  // Chart of session scores (only on final)
  if (isFinal) {
    const chart = el('div', {});
    chart.appendChild(el('h2', { style: 'margin-bottom: var(--space-3);' }, '📊 Puntuación por sesión'));
    const chartBars = el('div', { class: 'results__chart' });
    SESSIONS.forEach(id => {
      const sm = getSessionMeta(id);
      const score = getSessionScore(id);
      const max = SESSIONS.reduce((m, s) => Math.max(m, getSessionScore(s).points || 0), 1);
      const heightPct = score.points ? Math.round((score.points / max) * 90) : 4;
      chartBars.appendChild(el('div', { class: 'results__chart-bar' },
        el('div', { class: 'bar-value' }, String(score.points || 0)),
        el('div', { class: 'bar', style: `height: ${heightPct}%;`, title: `${sm.title}: ${score.points || 0} pts` }),
        el('div', { class: 'bar-label' }, sm.icon)
      ));
    });
    chart.appendChild(chartBars);
    wrap.appendChild(chart);
  }

  // Badges collection
  wrap.appendChild(el('h2', { style: 'margin-top: var(--space-4);' }, '🏆 Insignias'));
  const badges = el('div', { class: 'results__badges' });
  BADGE_DEFS.forEach(b => {
    const has = state.badges.includes(b.id);
    badges.appendChild(el('div', {
      class: `results__badge ${has ? 'results__badge--unlocked' : 'results__badge--locked'}`,
      title: b.label
    },
      el('span', { class: 'emoji', 'aria-hidden': 'true' }, b.emoji),
      el('span', {}, b.label)
    ));
  });
  wrap.appendChild(badges);

  // Actions
  const actions = el('div', { class: 'results__actions' });
  if (!isFinal) {
    actions.appendChild(el('button', { class: 'btn btn--primary btn--lg', onclick: () => { playClick(); navigate('map'); } }, '🗺️ Volver al mapa'));
  } else {
    actions.appendChild(el('button', { class: 'btn btn--primary btn--lg', onclick: () => { playClick(); navigate('map'); } }, '🗺️ Mapa'));
  }
  if (state.review.failedQuestions.length > 0) {
    actions.appendChild(el('button', { class: 'btn btn--ghost', onclick: () => { playClick(); navigate('review'); } }, `📝 Repasar ${state.review.failedQuestions.length} fallos`));
  }
  actions.appendChild(el('button', { class: 'btn btn--ghost', onclick: shareResult }, '📤 Compartir resultado'));
  actions.appendChild(el('button', { class: 'btn btn--ghost', onclick: () => { playClick(); navigate('cheatsheet'); } }, '📋 Cheat sheet'));
  wrap.appendChild(actions);

  root.appendChild(wrap);

  async function shareResult() {
    playClick();
    const badgesGot = state.badges.length;
    const text = `🎮 Soy ${state.player.name || 'marketer'} y completé Digital Marketing Quest:\n` +
      `⭐ ${state.scores.total} puntos\n` +
      `🎯 ${state.scores.correctTotal} respuestas correctas\n` +
      `🔥 Racha máxima: ${state.scores.maxStreak}\n` +
      `🏆 ${badgesGot} insignias desbloqueadas\n` +
      `\n¿Puedes superarme?`;
    const ok = await copyToClipboard(text);
    if (ok) showToast('📋 Copiado al portapapeles', 'success');
    else showToast('No se pudo copiar', 'error');
  }
}
