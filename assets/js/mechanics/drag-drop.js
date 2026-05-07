// ===== DRAG & DROP — clasificación con soporte mouse + touch =====
import { playClick, playCorrect, playError, playHover } from '../core/audio.js';
import { el, shuffle } from '../ui/components.js';

export function renderDragDrop(container, question, { onAnswer } = {}) {
  // question.items = [{ id, text, zone: 'paid'|'owned'|'earned' }]
  // question.zones = [{ id, label, color }]
  const wrap = el('div', { class: 'dnd' });
  const pool = el('div', { class: 'dnd__pool', 'aria-label': 'Elementos sin clasificar' });
  const zonesEl = el('div', { class: 'dnd__zones' });

  const items = shuffle(question.items.slice());
  const zones = question.zones;

  // Pool: chips
  items.forEach(it => {
    const chip = makeChip(it);
    pool.appendChild(chip);
  });

  // Zones
  zones.forEach(z => {
    const zone = el('div', { class: 'dnd__zone', data: { zone: z.id, color: z.color || z.id } },
      el('div', { class: 'dnd__zone-title' }, z.label),
      el('div', { class: 'dnd__zone-items', data: { dropTarget: 'true' } })
    );
    zonesEl.appendChild(zone);
  });

  wrap.appendChild(pool);
  wrap.appendChild(zonesEl);

  const submit = el('div', { style: 'margin-top: var(--space-4); display: flex; justify-content: space-between; gap: var(--space-3); flex-wrap: wrap;' },
    el('span', { class: 'hint', style: 'color: var(--text-muted); font-size: 0.85rem;' }, 'Arrastra cada elemento a la columna correcta. En móvil: toca y arrastra.'),
    el('button', { class: 'btn btn--primary', type: 'button', onclick: check }, 'Confirmar clasificación')
  );

  container.appendChild(wrap);
  container.appendChild(submit);

  function makeChip(item) {
    const chip = el('div', {
      class: 'dnd__chip',
      data: { id: item.id, zone: item.zone },
      tabindex: '0',
      role: 'button',
      'aria-label': `${item.text}. Usa Tab y Enter para mover.`,
      draggable: 'true'
    }, item.text);
    bindDrag(chip);
    return chip;
  }

  function bindDrag(chip) {
    // === HTML5 drag ===
    chip.addEventListener('dragstart', e => {
      chip.classList.add('is-dragging');
      e.dataTransfer.setData('text/plain', chip.dataset.id);
      e.dataTransfer.effectAllowed = 'move';
    });
    chip.addEventListener('dragend', () => {
      chip.classList.remove('is-dragging');
      cleanupZones();
    });

    // === Touch drag ===
    let floating = null;
    let startTouch = null;
    let touchOffsetX = 0, touchOffsetY = 0;

    chip.addEventListener('touchstart', e => {
      const t = e.touches[0];
      startTouch = { x: t.clientX, y: t.clientY };
      const rect = chip.getBoundingClientRect();
      touchOffsetX = t.clientX - rect.left;
      touchOffsetY = t.clientY - rect.top;
      // Don't preventDefault yet — wait for movement to allow tap to do nothing weird.
    }, { passive: true });

    chip.addEventListener('touchmove', e => {
      if (!startTouch) return;
      const t = e.touches[0];
      const dx = Math.abs(t.clientX - startTouch.x);
      const dy = Math.abs(t.clientY - startTouch.y);
      if (!floating && (dx > 8 || dy > 8)) {
        // Start floating
        floating = chip.cloneNode(true);
        floating.classList.add('dnd__chip--floating');
        floating.style.width = chip.offsetWidth + 'px';
        document.body.appendChild(floating);
        chip.classList.add('is-dragging');
      }
      if (floating) {
        e.preventDefault();
        floating.style.left = (t.clientX - touchOffsetX) + 'px';
        floating.style.top = (t.clientY - touchOffsetY) + 'px';
        // Highlight zone under finger
        const target = document.elementFromPoint(t.clientX, t.clientY);
        cleanupZones();
        const zone = target ? target.closest('.dnd__zone') : null;
        if (zone) zone.classList.add('is-hover');
      }
    }, { passive: false });

    chip.addEventListener('touchend', e => {
      if (floating) {
        const t = e.changedTouches[0];
        const target = document.elementFromPoint(t.clientX, t.clientY);
        const zone = target ? target.closest('.dnd__zone') : null;
        if (zone) {
          dropInto(chip, zone);
        }
        floating.remove();
        floating = null;
      }
      chip.classList.remove('is-dragging');
      cleanupZones();
      startTouch = null;
    });
    chip.addEventListener('touchcancel', () => {
      if (floating) { floating.remove(); floating = null; }
      chip.classList.remove('is-dragging');
      cleanupZones();
      startTouch = null;
    });

    // === Keyboard ===
    chip.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cycleToNextZone(chip);
      }
    });
  }

  function cycleToNextZone(chip) {
    const allTargets = [pool, ...zonesEl.querySelectorAll('.dnd__zone-items')];
    const current = chip.parentElement;
    const idx = allTargets.indexOf(current);
    const next = allTargets[(idx + 1) % allTargets.length];
    if (next) {
      next.appendChild(chip);
      chip.focus();
      playClick();
    }
  }

  function cleanupZones() {
    zonesEl.querySelectorAll('.dnd__zone').forEach(z => z.classList.remove('is-hover'));
  }

  function dropInto(chip, zone) {
    const items = zone.querySelector('.dnd__zone-items');
    items.appendChild(chip);
    playClick();
  }

  // === Drop targets ===
  zonesEl.querySelectorAll('.dnd__zone').forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('is-hover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('is-hover'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('is-hover');
      const id = e.dataTransfer.getData('text/plain');
      const chip = wrap.querySelector(`.dnd__chip[data-id="${id}"]`);
      if (chip) dropInto(chip, zone);
    });
  });
  // Pool is also a drop target (return chips)
  pool.addEventListener('dragover', e => { e.preventDefault(); pool.classList.add('is-hover'); });
  pool.addEventListener('dragleave', () => pool.classList.remove('is-hover'));
  pool.addEventListener('drop', e => {
    e.preventDefault();
    pool.classList.remove('is-hover');
    const id = e.dataTransfer.getData('text/plain');
    const chip = wrap.querySelector(`.dnd__chip[data-id="${id}"]`);
    if (chip) pool.appendChild(chip);
  });

  let answered = false;
  function check() {
    if (answered) return;
    answered = true;
    playClick();
    // Verify each chip is in correct zone
    let allCorrect = true;
    let anyMisplaced = false;
    wrap.querySelectorAll('.dnd__chip').forEach(chip => {
      const parentZone = chip.closest('.dnd__zone');
      const placed = parentZone ? parentZone.dataset.zone : null;
      const expected = chip.dataset.zone;
      const ok = placed === expected;
      chip.classList.add(ok ? 'is-correct' : 'is-incorrect');
      if (!ok) { allCorrect = false; anyMisplaced = true; }
      // Move misplaced chip to correct zone (visual reveal)
      if (!ok) {
        const correctZone = zonesEl.querySelector(`.dnd__zone[data-zone="${expected}"] .dnd__zone-items`);
        if (correctZone) {
          setTimeout(() => correctZone.appendChild(chip), 600);
        }
      }
    });
    submit.querySelector('button').disabled = true;
    setTimeout(() => {
      allCorrect ? playCorrect() : playError();
      onAnswer && onAnswer({ correct: allCorrect });
    }, 400);
  }

  return { destroy: () => { wrap.remove(); submit.remove(); } };
}
