// ===== REVIEW SCREEN — repasar preguntas falladas =====
import { navigate } from '../core/router.js';
import { playClick } from '../core/audio.js';
import { get, clearFailedQuestion, getSessionMeta } from '../core/state.js';
import { el } from '../ui/components.js';

export function renderReview(root) {
  const state = get();
  const failed = state.review.failedQuestions;

  const wrap = el('div', {});
  wrap.appendChild(el('h1', {}, '📝 Modo Revisión'));
  wrap.appendChild(el('p', { style: 'color: var(--text-soft);' }, `Repasa las preguntas que fallaste. Marca como "ya entendí" para sacarlas de la lista.`));

  if (!failed.length) {
    wrap.appendChild(el('div', { class: 'empty' },
      el('div', { class: 'empty__icon' }, '🎉'),
      el('h2', {}, 'Sin errores pendientes'),
      el('p', {}, 'No tienes preguntas falladas. Todo claro.'),
      el('button', { class: 'btn btn--primary', style: 'margin-top: var(--space-4);', onclick: () => { playClick(); navigate('map'); } }, '🗺️ Volver al mapa')
    ));
    root.appendChild(wrap);
    return;
  }

  const list = el('div', { style: 'display: flex; flex-direction: column; gap: var(--space-4);' });
  failed.forEach(q => {
    const meta = getSessionMeta(q.sessionId) || { title: 'Sesión', icon: '❓' };
    const item = el('div', { class: 'card' },
      el('span', { class: 'badge badge--accent', style: 'margin-bottom: var(--space-2);' }, `${meta.icon} ${meta.title}`),
      el('h3', { style: 'margin-bottom: var(--space-2);' }, q.prompt),
      el('div', { style: 'background: var(--secondary-light); padding: var(--space-3); border-radius: var(--r-md); border-left: 4px solid var(--success);' },
        el('strong', {}, '💡 Respuesta y explicación: '),
        el('span', {}, q.explanation || 'Repasa este tema en el glosario.')
      ),
      el('button', {
        class: 'btn btn--secondary btn--sm',
        style: 'margin-top: var(--space-3);',
        onclick: () => { playClick(); clearFailedQuestion(q.id); renderReview(root); }
      }, '✓ Ya lo entendí')
    );
    list.appendChild(item);
  });
  wrap.appendChild(list);

  wrap.appendChild(el('div', { style: 'margin-top: var(--space-5); display: flex; gap: var(--space-3); justify-content: center;' },
    el('button', { class: 'btn btn--primary', onclick: () => { playClick(); navigate('map'); } }, '🗺️ Mapa')
  ));

  root.innerHTML = '';
  root.appendChild(wrap);
}
