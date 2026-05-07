// ===== BOSS BATTLE SCREEN =====
import { navigate } from '../core/router.js';
import { playClick, playCorrect, playError, playStreak, playFinalVictory, playTick, playWarning } from '../core/audio.js';
import { get, awardPoints, addFailedQuestion, recordSessionScore, unlockBadge } from '../core/state.js';
import { getQuiz } from '../data/quizzes.js';
import { el, showModal, showToast, showBadgeUnlock, fireConfetti, flashSpotlight, shuffle } from '../ui/components.js';
import { renderMechanic } from '../mechanics/index.js';

export function renderBoss(root, params) {
  const quiz = getQuiz('boss');
  if (!quiz) return navigate('map');

  let started = false;
  const intro = el('div', { class: 'boss', style: 'text-align: center; justify-content: center; align-items: center;' });
  intro.appendChild(el('div', { style: 'font-size: 5rem;', 'aria-hidden': 'true' }, '👑'));
  intro.appendChild(el('h1', { class: 'boss__title' }, 'BOSS BATTLE'));
  intro.appendChild(el('p', { style: 'font-size: 1.1rem; max-width: 540px; color: #CBD5E1;' }, '15 preguntas. 15 segundos cada una. Bonus +25 si respondes en <5 seg. Penalización -25 si usas pista. ¿Listo, marketer?'));
  intro.appendChild(el('button', {
    class: 'btn btn--accent btn--lg',
    style: 'margin-top: var(--space-5);',
    onclick: () => { playClick(); start(); }
  }, '⚔️ ¡Que empiece!'));
  intro.appendChild(el('button', {
    class: 'btn btn--ghost',
    style: 'margin-top: var(--space-3); color: #FBBF24; border-color: #FBBF24;',
    onclick: () => navigate('map')
  }, '← Volver al mapa'));
  root.appendChild(intro);

  function start() {
    if (started) return;
    started = true;
    flashSpotlight('FIGHT!', 1100).then(() => {
      root.innerHTML = '';
      runBattle();
    });
  }

  function runBattle() {
    const questions = shuffle(quiz.questions.slice());
    let idx = 0;
    let correct = 0;
    let pointsBoss = 0;
    let usedHint = false;
    let questionStart = 0;
    let timeLeft = quiz.timePerQuestion;
    let timerInt = null;

    const wrap = el('div', { class: 'boss' });
    const header = el('div', {},
      el('h2', { class: 'boss__title' }, '👑 BOSS BATTLE'),
      el('div', { style: 'display: flex; gap: var(--space-3); margin-top: var(--space-2); justify-content: center; flex-wrap: wrap;' },
        el('span', { class: 'hud-item' }, `Pregunta `, el('strong', { id: 'bossQ' }, '1'), ` de ${questions.length}`),
        el('span', { class: 'hud-item' }, `⭐ `, el('strong', { id: 'bossPts' }, '0')),
        el('span', { class: 'hud-item' }, `⏱️ `, el('strong', { id: 'bossTime' }, String(timeLeft)), 's')
      )
    );
    wrap.appendChild(header);

    const timerBar = el('div', { class: 'boss__timer' },
      el('div', { class: 'boss__timer-fill', id: 'bossTimerFill', style: 'width: 100%' })
    );
    wrap.appendChild(timerBar);

    const questionEl = el('div', { class: 'boss__question' });
    wrap.appendChild(questionEl);

    const body = el('div', {});
    wrap.appendChild(body);

    const footer = el('div', { style: 'display: flex; justify-content: space-between; gap: var(--space-3); flex-wrap: wrap;' });
    wrap.appendChild(footer);

    root.appendChild(wrap);
    askQuestion();

    function askQuestion() {
      if (idx >= questions.length) return finish();
      const q = questions[idx];
      usedHint = false;
      questionStart = performance.now();
      timeLeft = quiz.timePerQuestion;

      document.getElementById('bossQ').textContent = String(idx + 1);
      document.getElementById('bossPts').textContent = String(pointsBoss);
      document.getElementById('bossTime').textContent = String(timeLeft);
      document.getElementById('bossTimerFill').style.width = '100%';

      questionEl.textContent = q.prompt;
      body.innerHTML = '';
      footer.innerHTML = '';

      const mech = renderMechanic(q.type, body, q, {
        onAnswer: ({ correct: isCorrect }) => {
          if (timerInt) clearInterval(timerInt);
          handleAnswer(q, isCorrect, mech);
        }
      });

      if (q.hint) {
        const hintBtn = el('button', {
          class: 'btn btn--ghost btn--sm',
          style: 'color: #FBBF24; border-color: #FBBF24;',
          onclick: () => {
            playClick();
            usedHint = true;
            hintBtn.disabled = true;
            showToast(`💡 ${q.hint} · -25 pts`, 'accent');
          }
        }, '💡 Pista (-25 pts)');
        footer.appendChild(hintBtn);
      } else {
        footer.appendChild(el('span', {}));
      }

      // Start countdown
      const tFill = document.getElementById('bossTimerFill');
      tFill.style.transition = `width ${quiz.timePerQuestion}s linear`;
      requestAnimationFrame(() => { tFill.style.width = '0%'; });
      timerInt = setInterval(() => {
        timeLeft--;
        document.getElementById('bossTime').textContent = String(timeLeft);
        if (timeLeft <= 5 && timeLeft > 0) playTick();
        if (timeLeft <= 0) {
          clearInterval(timerInt);
          playWarning();
          showToast('⏰ ¡Tiempo!', 'error');
          handleAnswer(q, false, mech, true);
        }
      }, 1000);
    }

    function handleAnswer(q, isCorrect, mech, timeOut = false) {
      const elapsed = (performance.now() - questionStart) / 1000;
      let earned = 0;

      if (isCorrect) {
        correct++;
        earned = usedHint ? 50 - 25 : 100;
        if (elapsed < quiz.fastBonusThreshold && !timeOut) {
          earned += 25;
          showToast('⚡ ¡Velocidad! +25 bonus', 'accent');
        }
        // Streak
        const streakNow = get().scores.streak + 1;
        if (streakNow > 0 && streakNow % 3 === 0) {
          earned += 50;
          playStreak();
        }
        awardPoints(earned, { isCorrect: true });
      } else {
        awardPoints(0, { isCorrect: false });
        addFailedQuestion({ id: q.id, sessionId: 'boss', prompt: q.prompt, explanation: q.explanation, type: q.type });
      }
      pointsBoss += earned;
      document.getElementById('bossPts').textContent = String(pointsBoss);

      // Mini feedback (no modal in boss to keep tempo)
      showToast(isCorrect ? `✅ +${earned} puntos` : `❌ ${q.explanation || 'Sigue.'}`, isCorrect ? 'success' : 'error');

      setTimeout(() => { idx++; askQuestion(); }, isCorrect ? 700 : 1800);
    }

    function finish() {
      if (timerInt) clearInterval(timerInt);
      const perfect = correct === questions.length;
      recordSessionScore('boss', {
        points: pointsBoss,
        correct,
        total: questions.length,
        perfect,
        timestamp: Date.now(),
      });
      unlockBadge('boss');
      if (perfect) {
        unlockBadge('cmo');
        playFinalVictory();
        fireConfetti(3500, 200);
        flashSpotlight('👑 ¡CMO DIGITAL! 👑', 1800).then(() => {
          showBadgeUnlock('👑 CMO Digital — Boss perfecto');
          setTimeout(() => navigate('results', { sessionId: 'boss', points: pointsBoss, correct, total: questions.length, accuracy: 1, isFinal: true, perfect: true }), 1200);
        });
      } else {
        playFinalVictory();
        setTimeout(() => navigate('results', { sessionId: 'boss', points: pointsBoss, correct, total: questions.length, accuracy: correct / questions.length, isFinal: true, perfect: false }), 600);
      }
    }
  }
}
