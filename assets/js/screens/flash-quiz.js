// ===== FLASH QUIZ — mini-cuestionario rápido post-capítulo =====
import { navigate } from '../core/router.js';
import { playClick, playCorrect, playError, playStreak, playTick } from '../core/audio.js';
import { getNarrative } from '../data/narrative.js';
import { getSessionMeta, awardPoints, get } from '../core/state.js';
import { el, showToast } from '../ui/components.js';
import { renderMechanic } from '../mechanics/index.js';

const FLASH_TIME = 12; // seg por pregunta

export function renderFlashQuiz(root, params) {
  const sessionId = params.sessionId;
  const narrative = getNarrative(sessionId);
  if (!narrative || !narrative.flashQuiz?.length) return navigate('quiz', { sessionId });

  const questions = narrative.flashQuiz.slice();
  let idx = 0;
  let correctCount = 0;

  const meta = getSessionMeta(sessionId);

  const wrap = el('div', { class: 'flash' });
  wrap.appendChild(el('h1', { style: 'margin-bottom: 0;' }, '⚡ Flash Quiz'));
  wrap.appendChild(el('p', { style: 'color: var(--text-soft);' }, `3 preguntas rápidas sobre los datos clave de "${meta.title}". ¡Velocidad!`));

  const card = el('div', { class: 'flash__card' });
  wrap.appendChild(card);

  root.appendChild(wrap);
  renderQuestion();

  function renderQuestion() {
    if (idx >= questions.length) return finish();
    const q = questions[idx];
    card.innerHTML = '';
    card.classList.add('flash__card');

    card.appendChild(el('div', { class: 'flash__title' }, `Flash ${idx + 1} de ${questions.length}`));
    card.appendChild(el('div', { class: 'flash__question' }, q.prompt));

    // Timer
    const timer = el('div', { class: 'flash__timer' },
      el('div', { class: 'flash__timer-fill', style: 'width: 100%;' })
    );
    card.appendChild(timer);
    const timerFill = timer.querySelector('.flash__timer-fill');

    // Body for mechanic
    const body = el('div', {});
    card.appendChild(body);

    // Timer state (declared first so closures capture safely)
    let timeLeft = FLASH_TIME;
    let tickInt = null;

    // Mechanic
    const mech = renderMechanic(q.type, body, q, {
      onAnswer: ({ correct }) => {
        if (tickInt) clearInterval(tickInt);
        if (correct) {
          correctCount++;
          awardPoints(50, { isCorrect: true });
          if (get().scores.streak > 0 && get().scores.streak % 3 === 0) {
            playStreak();
            awardPoints(50, { isCorrect: true });
            showToast('🔥 Racha de 3! +50 bonus', 'accent');
          }
        } else {
          awardPoints(0, { isCorrect: false });
        }
        setTimeout(() => { idx++; renderQuestion(); }, 1100);
      }
    });

    timerFill.style.transition = 'width 1s linear';
    requestAnimationFrame(() => { timerFill.style.width = '0%'; });
    tickInt = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 3 && timeLeft > 0) playTick();
      if (timeLeft <= 0) {
        clearInterval(tickInt);
        // Time up: auto fail
        playError();
        showToast('⏰ ¡Tiempo!', 'error');
        if (mech && mech.destroy) mech.destroy();
        setTimeout(() => { idx++; renderQuestion(); }, 800);
      }
    }, 1000);
  }

  function finish() {
    const perfect = correctCount === questions.length;
    if (perfect) {
      // Bonus
      awardPoints(50, { isCorrect: true });
      showToast('🎯 Flash perfecto! +50 bonus', 'success');
    }
    setTimeout(() => navigate('quiz', { sessionId, flashPerfect: perfect }), 700);
  }
}
