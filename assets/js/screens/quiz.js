// ===== QUIZ SCREEN — quiz formal de la sesión =====
import { navigate } from '../core/router.js';
import { playClick, playCorrect, playError, playStreak } from '../core/audio.js';
import { get, awardPoints, addFailedQuestion, recordSessionScore, getSessionMeta, unlockBadge, SESSIONS } from '../core/state.js';
import { getQuiz } from '../data/quizzes.js';
import { el, showModal, showToast, showBadgeUnlock, shuffle } from '../ui/components.js';
import { renderMechanic } from '../mechanics/index.js';

export function renderQuiz(root, params) {
  const sessionId = params.sessionId;
  const flashPerfect = !!params.flashPerfect;
  const quiz = getQuiz(sessionId);
  if (!quiz) return navigate('map');

  const meta = getSessionMeta(sessionId);
  const questions = quiz.questions.slice();
  let idx = 0;
  let correct = 0;
  let pointsThisSession = 0;
  let usedHint = false;

  const wrap = el('div', { class: 'quiz' });

  const header = el('div', { class: 'quiz__header' },
    el('div', { class: 'quiz__title-row' },
      el('h2', {},
        el('span', { 'aria-hidden': 'true' }, meta.icon + ' '),
        el('span', {}, meta.title + ' — Quiz')
      ),
      el('div', { class: 'quiz__hud' },
        el('span', { class: 'hud-item' }, '🎯 ', el('strong', {}, '0'), '/' + questions.length),
        el('span', { class: 'hud-item hud-points' }, '⭐ +0'),
      )
    ),
    el('div', { class: 'progress' },
      el('div', { class: 'progress__fill', style: 'width: 0%' })
    )
  );
  wrap.appendChild(header);

  const questionEl = el('div', { class: 'quiz__question' });
  wrap.appendChild(questionEl);

  const body = el('div', { class: 'quiz__body' });
  wrap.appendChild(body);

  const footer = el('div', { class: 'quiz__footer' });
  wrap.appendChild(footer);

  root.appendChild(wrap);

  renderQuestion();

  function renderQuestion() {
    if (idx >= questions.length) return finish();
    const q = questions[idx];
    usedHint = false;

    // Update HUD
    const hudItems = header.querySelectorAll('.hud-item');
    hudItems[0].innerHTML = `🎯 <strong>${idx + 1}</strong>/${questions.length}`;
    hudItems[1].textContent = `⭐ +${pointsThisSession}`;
    header.querySelector('.progress__fill').style.width = `${(idx / questions.length) * 100}%`;

    questionEl.textContent = q.prompt;
    body.innerHTML = '';
    footer.innerHTML = '';

    // Render mechanic
    const mech = renderMechanic(q.type, body, q, {
      onAnswer: ({ correct: isCorrect }) => onAnswer(q, isCorrect),
    });

    // Footer: hint + skip
    if (q.hint) {
      const hintBtn = el('button', { class: 'btn btn--ghost btn--sm', onclick: () => {
        playClick();
        usedHint = true;
        hintBtn.disabled = true;
        showToast(`💡 Pista: ${q.hint}`, 'accent');
      }}, '💡 Pista (-50 pts)');
      footer.appendChild(hintBtn);
    } else {
      footer.appendChild(el('span', {}));
    }
    footer.appendChild(el('button', { class: 'btn btn--ghost btn--sm', onclick: () => skip(q) }, 'Saltar →'));
  }

  function onAnswer(q, isCorrect) {
    let earned = 0;
    if (isCorrect) {
      earned = usedHint ? 50 : 100;
      correct++;
      // Streak bonus every 3
      const streakNow = get().scores.streak + 1;
      if (streakNow > 0 && streakNow % 3 === 0) {
        earned += 50;
        playStreak();
        showToast('🔥 ¡Racha de 3! +50 bonus', 'accent');
      }
      awardPoints(earned, { isCorrect: true });
    } else {
      awardPoints(0, { isCorrect: false });
      addFailedQuestion({ id: q.id, sessionId, prompt: q.prompt, explanation: q.explanation, type: q.type });
    }
    pointsThisSession += earned;

    // Show feedback modal
    const explanation = q.explanation || (isCorrect ? '¡Bien hecho!' : 'Revisa este concepto en el glosario.');
    const feedbackHtml = `
      <div class="modal__header">
        <span aria-hidden="true">${isCorrect ? '✅' : '❌'}</span>
        <span>${isCorrect ? '¡Correcto!' : 'Incorrecto'}</span>
      </div>
      <div class="modal__body">
        ${isCorrect
          ? `<p style="font-size: 1.05rem; margin-bottom: var(--space-3);">¡Sumas <strong>+${earned}</strong> puntos!</p>`
          : `<p style="font-size: 1.05rem; margin-bottom: var(--space-3);">No te preocupes — aprender es errar primero.</p>`
        }
        <div class="modal__explanation">
          <strong>💡 Lo que tienes que recordar:</strong><br>
          ${explanation}
        </div>
      </div>
    `;
    showModal({
      body: feedbackHtml,
      variant: `feedback ${isCorrect ? 'is-correct' : 'is-incorrect'}`,
      dismissable: false,
      actions: [{
        label: 'Continuar →',
        variant: 'primary',
        onClick: () => { idx++; renderQuestion(); }
      }],
    });
  }

  function skip(q) {
    if (!confirm('¿Saltar esta pregunta? No recibirás puntos por ella.')) return;
    playClick();
    awardPoints(0, { isCorrect: false });
    addFailedQuestion({ id: q.id, sessionId, prompt: q.prompt, explanation: q.explanation, type: q.type });
    idx++;
    renderQuestion();
  }

  function finish() {
    const total = questions.length;
    const accuracy = total ? (correct / total) : 0;
    const perfect = correct === total;

    recordSessionScore(sessionId, {
      points: pointsThisSession,
      correct,
      total,
      perfect,
      flashPerfect,
      timestamp: Date.now(),
    });

    // Unlock session badge
    unlockBadge(sessionId);
    showBadgeUnlock(getSessionMeta(sessionId).badge);

    // Marathon badge: completed all 5 sessions without skip
    const state = get();
    const completedAll = SESSIONS.filter(s => s !== 'boss').every(s => state.progress.sessionsCompleted.includes(s));
    if (completedAll && !state.meta.skipped && !state.badges.includes('marathon')) {
      unlockBadge('marathon');
      setTimeout(() => showBadgeUnlock('🌟 Marathonista'), 1200);
    }

    // Pro Memoria badge: all flash perfect
    const flashPerfects = state.flash.perfectSessions.length;
    if (flashPerfects >= 5 && !state.badges.includes('memory')) {
      unlockBadge('memory');
      setTimeout(() => showBadgeUnlock('🎯 Pro Memoria'), 2000);
    }

    setTimeout(() => navigate('results', { sessionId, points: pointsThisSession, correct, total, accuracy }), 800);
  }
}
