// ===== MULTIPLE CHOICE =====
import { playClick, playHover, playCorrect, playError } from '../core/audio.js';
import { letterFor, shuffle, el } from '../ui/components.js';

export function renderMultipleChoice(container, question, { onAnswer, randomize = true } = {}) {
  const opts = randomize ? shuffle(question.options.map((o, i) => ({ ...o, _origIdx: i }))) : question.options.map((o, i) => ({ ...o, _origIdx: i }));

  const list = el('div', { class: 'quiz__options', role: 'group', 'aria-label': 'Opciones de respuesta' });
  let answered = false;

  opts.forEach((opt, idx) => {
    const btn = el('button', {
      class: 'option-card',
      type: 'button',
      'aria-label': `Opción ${letterFor(idx)}`,
      onclick: () => answer(opt, btn),
      onmouseenter: () => playHover(),
    },
      el('span', { class: 'option-card__letter', 'aria-hidden': 'true' }, letterFor(idx)),
      el('span', { class: 'option-card__text' }, opt.text)
    );
    list.appendChild(btn);
  });

  container.appendChild(list);

  function answer(opt, btn) {
    if (answered) return;
    answered = true;
    playClick();
    list.querySelectorAll('.option-card').forEach(b => b.classList.add('is-disabled'));

    const isCorrect = opt.correct === true;
    btn.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');

    // Reveal correct one if user picked wrong
    if (!isCorrect) {
      list.querySelectorAll('.option-card').forEach((b, i) => {
        if (opts[i].correct) b.classList.add('is-correct');
      });
    }

    setTimeout(() => {
      isCorrect ? playCorrect() : playError();
      onAnswer && onAnswer({ correct: isCorrect, choice: opt });
    }, 280);
  }

  return { destroy: () => list.remove() };
}
