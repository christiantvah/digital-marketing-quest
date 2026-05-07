// ===== CLOZE — completar frase =====
import { playClick, playCorrect, playError } from '../core/audio.js';
import { el, normalize } from '../ui/components.js';

export function renderCloze(container, question, { onAnswer } = {}) {
  // question.template = "El __% confía más en UGC que en publicidad."
  // question.answers = [['92'], ['noventa y dos']] // matrix: blanks × validAnswers
  const template = question.template;
  const blanks = (template.match(/__+/g) || []).length;
  const wrap = el('div', { class: 'cloze' });

  const inputs = [];
  let html = '';
  let blankIdx = 0;
  template.split(/(__+)/).forEach(part => {
    if (/^_+$/.test(part)) {
      html += `<input class="cloze__input" data-blank="${blankIdx}" type="text" placeholder="…" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Espacio en blanco ${blankIdx + 1}" />`;
      blankIdx++;
    } else {
      html += part;
    }
  });
  wrap.innerHTML = html;
  wrap.querySelectorAll('input').forEach(i => inputs.push(i));

  // Add submit button below
  const submit = el('div', { style: 'margin-top: var(--space-4); display: flex; justify-content: flex-end;' },
    el('button', { class: 'btn btn--primary', type: 'button', onclick: check }, 'Confirmar respuesta')
  );

  container.appendChild(wrap);
  container.appendChild(submit);

  let answered = false;
  inputs.forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const next = inputs[inputs.indexOf(input) + 1];
        if (next) next.focus(); else check();
      }
    });
  });
  if (inputs[0]) inputs[0].focus();

  function check() {
    if (answered) return;
    answered = true;
    playClick();
    let allCorrect = true;
    inputs.forEach((input, i) => {
      const validAnswers = question.answers[i] || [];
      const userVal = normalize(input.value);
      const ok = validAnswers.some(a => normalize(a) === userVal);
      input.classList.add(ok ? 'is-correct' : 'is-incorrect');
      input.disabled = true;
      if (!ok) {
        allCorrect = false;
        input.value = `${input.value} → ${validAnswers[0]}`;
      }
    });
    submit.querySelector('button').disabled = true;
    setTimeout(() => {
      allCorrect ? playCorrect() : playError();
      onAnswer && onAnswer({ correct: allCorrect });
    }, 320);
  }

  return { destroy: () => { wrap.remove(); submit.remove(); } };
}
