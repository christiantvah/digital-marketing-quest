// ===== CHEAT SHEET SCREEN =====
import { navigate } from '../core/router.js';
import { playClick } from '../core/audio.js';
import { cheatsheet, getCheatsheetText } from '../data/cheatsheet.js';
import { el, copyToClipboard, showToast } from '../ui/components.js';

export function renderCheatsheet(root) {
  const wrap = el('div', { class: 'cheatsheet' });
  wrap.appendChild(el('h1', {}, '📋 Cheat sheet'));
  wrap.appendChild(el('p', { style: 'color: var(--text-soft);' }, 'Todos los datos clave del curso en una vista. Ideal para repasar antes del examen.'));

  const actions = el('div', { style: 'display: flex; gap: var(--space-3); margin-bottom: var(--space-5); flex-wrap: wrap;' });
  actions.appendChild(el('button', { class: 'btn btn--primary', onclick: copyText }, '📋 Copiar todo'));
  actions.appendChild(el('button', { class: 'btn btn--ghost', onclick: () => window.print() }, '🖨️ Imprimir'));
  actions.appendChild(el('button', { class: 'btn btn--ghost', onclick: () => { playClick(); navigate('map'); } }, '🗺️ Mapa'));
  wrap.appendChild(actions);

  cheatsheet.forEach(s => {
    const sec = el('div', { class: 'cheatsheet__section' },
      el('h2', {}, s.title),
      el('p', { style: 'color: var(--text-muted); margin-bottom: var(--space-2);' }, s.description)
    );
    const data = el('div', { class: 'cheatsheet__data' });
    s.facts.forEach(f => {
      data.appendChild(el('div', { class: 'cheatsheet__fact' },
        el('span', { class: 'num' }, f.num),
        el('div', { class: 'lbl' }, f.lbl)
      ));
    });
    sec.appendChild(data);
    wrap.appendChild(sec);
  });

  root.appendChild(wrap);

  async function copyText() {
    playClick();
    const ok = await copyToClipboard(getCheatsheetText());
    showToast(ok ? '📋 Copiado al portapapeles' : 'No se pudo copiar', ok ? 'success' : 'error');
  }
}
