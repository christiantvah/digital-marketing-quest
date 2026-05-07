// ===== ORDERING — ordena items en secuencia =====
import { playClick, playCorrect, playError } from '../core/audio.js';
import { el, shuffle } from '../ui/components.js';

export function renderOrdering(container, question, { onAnswer } = {}) {
  // question.items = [{ id, text, order: 1..n }]  // order es la posición correcta
  let items = shuffle(question.items.slice());
  // ensure shuffle is not already correct
  if (items.every((it, i) => it.order === i + 1) && items.length > 1) {
    [items[0], items[1]] = [items[1], items[0]];
  }
  const list = el('div', { class: 'order', role: 'list' });
  const submit = el('div', { style: 'margin-top: var(--space-4); display: flex; justify-content: flex-end;' },
    el('button', { class: 'btn btn--primary', type: 'button', onclick: check }, 'Confirmar orden')
  );

  function rerender() {
    list.innerHTML = '';
    items.forEach((it, idx) => {
      const row = el('div', { class: 'order__item', role: 'listitem' },
        el('span', { class: 'order__num', 'aria-hidden': 'true' }, String(idx + 1)),
        el('span', { class: 'order__text' }, it.text),
        el('div', { class: 'order__btns' },
          el('button', { class: 'order__btn', type: 'button', 'aria-label': 'Subir', disabled: idx === 0 ? true : null, onclick: () => move(idx, -1) }, '▲'),
          el('button', { class: 'order__btn', type: 'button', 'aria-label': 'Bajar', disabled: idx === items.length - 1 ? true : null, onclick: () => move(idx, 1) }, '▼'),
        )
      );
      list.appendChild(row);
    });
  }

  function move(idx, dir) {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    [items[idx], items[j]] = [items[j], items[idx]];
    playClick();
    rerender();
  }

  let answered = false;
  function check() {
    if (answered) return;
    answered = true;
    playClick();
    let allCorrect = true;
    items.forEach((it, idx) => {
      const row = list.children[idx];
      const ok = it.order === idx + 1;
      row.classList.add(ok ? 'is-correct' : 'is-incorrect');
      if (!ok) allCorrect = false;
      row.querySelectorAll('button').forEach(b => b.disabled = true);
    });
    submit.querySelector('button').disabled = true;
    setTimeout(() => {
      allCorrect ? playCorrect() : playError();
      onAnswer && onAnswer({ correct: allCorrect });
    }, 320);
  }

  rerender();
  container.appendChild(list);
  container.appendChild(submit);

  return { destroy: () => { list.remove(); submit.remove(); } };
}
