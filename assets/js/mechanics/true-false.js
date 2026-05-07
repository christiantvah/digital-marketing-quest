// ===== TRUE/FALSE =====
import { playClick, playCorrect, playError } from '../core/audio.js';
import { el } from '../ui/components.js';

export function renderTrueFalse(container, question, { onAnswer } = {}) {
  let answered = false;
  const wrap = el('div', { class: 'tf', role: 'group' });

  const btnTrue = el('button', { class: 'tf__btn', type: 'button', data: { value: 'true' }, 'aria-label': 'Verdadero', onclick: () => answer(true, btnTrue) },
    el('span', { class: 'icon', 'aria-hidden': 'true' }, '✅'),
    el('span', {}, 'Verdadero')
  );
  const btnFalse = el('button', { class: 'tf__btn', type: 'button', data: { value: 'false' }, 'aria-label': 'Falso', onclick: () => answer(false, btnFalse) },
    el('span', { class: 'icon', 'aria-hidden': 'true' }, '❌'),
    el('span', {}, 'Falso')
  );
  wrap.appendChild(btnTrue);
  wrap.appendChild(btnFalse);
  container.appendChild(wrap);

  function answer(value, btn) {
    if (answered) return;
    answered = true;
    playClick();
    const isCorrect = value === question.answer;
    btn.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
    if (!isCorrect) {
      const correctBtn = question.answer ? btnTrue : btnFalse;
      correctBtn.classList.add('is-correct');
    }
    [btnTrue, btnFalse].forEach(b => b.disabled = true);
    setTimeout(() => {
      isCorrect ? playCorrect() : playError();
      onAnswer && onAnswer({ correct: isCorrect, choice: value });
    }, 280);
  }

  return { destroy: () => wrap.remove() };
}
