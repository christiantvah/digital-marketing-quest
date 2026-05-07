// ===== MATCHING — empareja columna izquierda con derecha =====
import { playClick, playCorrect, playError, playHover } from '../core/audio.js';
import { el, shuffle } from '../ui/components.js';

export function renderMatching(container, question, { onAnswer } = {}) {
  // question.pairs = [{ left, right, id }]
  const pairs = question.pairs;
  const lefts = pairs.map(p => ({ id: p.id, text: p.left }));
  const rights = shuffle(pairs.map(p => ({ id: p.id, text: p.right })));

  const wrap = el('div', { class: 'match' });
  const colL = el('div', { class: 'match__column' });
  const colR = el('div', { class: 'match__column' });

  let selected = null;
  const matched = new Set();
  let errors = 0;

  lefts.forEach(item => {
    const it = el('button', { class: 'match__item', type: 'button', data: { id: item.id, side: 'left' }, onclick: () => select(it), onmouseenter: () => playHover() }, item.text);
    colL.appendChild(it);
  });
  rights.forEach(item => {
    const it = el('button', { class: 'match__item', type: 'button', data: { id: item.id, side: 'right' }, onclick: () => select(it), onmouseenter: () => playHover() }, item.text);
    colR.appendChild(it);
  });

  wrap.appendChild(colL);
  wrap.appendChild(colR);
  container.appendChild(wrap);

  function select(node) {
    if (node.classList.contains('is-matched')) return;
    playClick();
    if (!selected) {
      selected = node;
      node.classList.add('is-selected');
      return;
    }
    if (selected === node) {
      node.classList.remove('is-selected');
      selected = null;
      return;
    }
    if (selected.dataset.side === node.dataset.side) {
      // swap selection
      selected.classList.remove('is-selected');
      selected = node;
      node.classList.add('is-selected');
      return;
    }
    // try match
    if (selected.dataset.id === node.dataset.id) {
      [selected, node].forEach(n => {
        n.classList.remove('is-selected');
        n.classList.add('is-matched');
      });
      matched.add(selected.dataset.id);
      playCorrect();
      selected = null;
      if (matched.size === pairs.length) {
        setTimeout(() => onAnswer && onAnswer({ correct: errors === 0, partialErrors: errors }), 400);
      }
    } else {
      errors++;
      [selected, node].forEach(n => n.classList.add('is-error'));
      playError();
      const a = selected, b = node;
      setTimeout(() => {
        a.classList.remove('is-selected', 'is-error');
        b.classList.remove('is-selected', 'is-error');
      }, 600);
      selected = null;
    }
  }

  return { destroy: () => wrap.remove() };
}
