// ===== STORY SCREEN — player de escenas narrativas =====
import { get, applyMode, setCurrentScene, getSessionMeta } from '../core/state.js';
import { navigate } from '../core/router.js';
import { playClick, playSceneTransition, playDataReveal, playPageFlip } from '../core/audio.js';
import { getNarrative } from '../data/narrative.js';
import { tinoAvatar, dataCard, funnel, timeline, poemVenn, aidaPyramid, stdcCompass, journeyArrow, obedDiamond, transformacionDigital, aiSparkle } from '../ui/svg-icons.js';
import { el } from '../ui/components.js';

const VISUAL_REGISTRY = {
  funnel, timeline, poemVenn, aidaPyramid, stdcCompass, journeyArrow, obedDiamond, transformacionDigital, aiSparkle,
};

export function renderStory(root, params) {
  const sessionId = params.sessionId;
  const narrative = getNarrative(sessionId);
  if (!narrative) {
    root.innerHTML = '<div class="empty"><div class="empty__icon">⚠️</div><p>Capítulo no encontrado.</p></div>';
    return;
  }

  // Apply mode (day/night) of this session
  const meta = getSessionMeta(sessionId);
  if (meta.mode) applyMode(meta.mode);

  let idx = Math.max(0, Math.min(params.sceneIndex || 0, narrative.scenes.length - 1));

  const wrap = el('div', { class: 'story' });

  // Header
  const header = el('div', { class: 'story__header' });
  header.appendChild(el('span', { class: 'story__chip' },
    el('span', {}, meta.icon),
    el('strong', {}, narrative.title)
  ));
  const progressLabel = el('span', { class: 'label' }, `${idx + 1}/${narrative.scenes.length}`);
  const progressFill = el('div', { class: 'progress__fill', style: `width: ${((idx + 1) / narrative.scenes.length) * 100}%` });
  const progressBar = el('div', { class: 'story__progress' },
    el('span', { class: 'label' }, 'Capítulo'),
    el('div', { class: 'progress' }, progressFill),
    progressLabel
  );
  header.appendChild(progressBar);
  header.appendChild(el('button', { class: 'btn btn--ghost btn--sm', onclick: skipChapter }, 'Saltar capítulo →'));
  wrap.appendChild(header);

  const stage = el('div', { class: 'story__stage' });
  wrap.appendChild(stage);

  const navRow = el('div', { class: 'story__nav' },
    el('button', { class: 'btn btn--ghost', onclick: prev, disabled: idx === 0 }, '← Atrás'),
    el('span', { class: 'hint' }, 'Click en cualquier parte para avanzar'),
    el('button', { class: 'btn btn--primary', onclick: next }, idx === narrative.scenes.length - 1 ? 'Ir al quiz →' : 'Siguiente →')
  );
  wrap.appendChild(navRow);

  // Click anywhere on stage advances
  stage.addEventListener('click', e => {
    if (e.target.closest('button, a, input')) return;
    next();
  });

  function renderScene() {
    const scene = narrative.scenes[idx];
    if (!scene) return finish();

    setCurrentScene(sessionId, idx);

    // Update progress
    progressLabel.textContent = `${idx + 1}/${narrative.scenes.length}`;
    progressFill.style.width = `${((idx + 1) / narrative.scenes.length) * 100}%`;

    // Update buttons (querySelectorAll('button') -> [back, next])
    const navButtons = navRow.querySelectorAll('button');
    if (navButtons[0]) navButtons[0].disabled = idx === 0;
    if (navButtons[1]) navButtons[1].textContent = idx === narrative.scenes.length - 1 ? 'Ir al quiz →' : 'Siguiente →';

    // Apply scene-specific mode if needed
    if (scene.mode && scene.mode !== 'auto') applyMode(scene.mode);

    stage.dataset.speaker = scene.speaker;
    stage.innerHTML = '';
    stage.classList.add('scene-transition-in');

    // Avatar
    if (scene.speaker !== 'narrator') {
      const avatarMode = (scene.mode === 'night' || meta.mode === 'night') ? 'night' : 'day';
      const av = el('div', { class: 'story__avatar tino-enter', html: tinoAvatar(avatarMode) });
      stage.appendChild(av);
    }

    // Visual (top right)
    if (scene.visual) {
      const v = el('div', { class: 'story__visual', 'aria-hidden': 'true' });
      if (scene.visual.type === 'svg' && VISUAL_REGISTRY[scene.visual.payload]) {
        v.innerHTML = VISUAL_REGISTRY[scene.visual.payload]();
      } else if (scene.visual.type === 'emoji') {
        v.textContent = scene.visual.payload;
      }
      stage.appendChild(v);
    }

    // Bubble
    const bubble = el('div', { class: `story__bubble ${scene.speaker === 'narrator' ? 'story__bubble--narrator' : ''}` });
    if (scene.speaker !== 'narrator') {
      bubble.appendChild(el('span', { class: `story__speaker story__speaker--${scene.speaker}` },
        scene.speaker === 'TINO' ? '🎤 TINO' :
        scene.speaker === 'self' ? `🧠 Tú (${get().player.name || 'marketer'})` :
        scene.speaker === 'other' ? '🗨️ Voz' : ''
      ));
    }

    // Highlight glossary terms
    let textHtml = scene.text;
    if (scene.highlight) {
      const word = scene.highlight.word;
      const re = new RegExp(`(${escapeRe(word)})`, 'i');
      textHtml = textHtml.replace(re, `<span class="term" tabindex="0">$1<span class="term__tip">${scene.highlight.tooltip}</span></span>`);
    }
    const textEl = el('div', { html: textHtml });
    bubble.appendChild(textEl);
    stage.appendChild(bubble);

    // Data card (below stage)
    if (scene.dataCard) {
      const dataWrap = el('div', { class: 'story__data-card', html: dataCard(scene.dataCard) });
      stage.appendChild(dataWrap);
      setTimeout(() => playDataReveal(), 280);
    } else {
      playPageFlip();
    }

    // Trigger CSS animation
    setTimeout(() => stage.classList.remove('scene-transition-in'), 320);
  }

  function next() {
    playSceneTransition();
    if (idx < narrative.scenes.length - 1) {
      idx++;
      renderScene();
    } else {
      finish();
    }
  }

  function prev() {
    if (idx === 0) return;
    playClick();
    idx--;
    renderScene();
  }

  function skipChapter() {
    if (!confirm('¿Saltar el capítulo y pasar directo al quiz? Podrás volver luego.')) return;
    playClick();
    import('../core/state.js').then(m => m.markSkipped());
    finish();
  }

  function finish() {
    playClick();
    navigate('flash-quiz', { sessionId });
  }

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  root.appendChild(wrap);
  renderScene();
}
