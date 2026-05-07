// ===== GLOSSARY SCREEN =====
import { navigate } from '../core/router.js';
import { playClick } from '../core/audio.js';
import { glossary, searchGlossary } from '../data/glossary.js';
import { el } from '../ui/components.js';

export function renderGlossary(root) {
  const wrap = el('div', { class: 'glossary' });
  wrap.appendChild(el('h1', {}, '📖 Glosario'));
  wrap.appendChild(el('p', { style: 'color: var(--text-soft);' }, `${glossary.length} términos clave del curso, ordenados alfabéticamente.`));

  const searchWrap = el('div', { class: 'glossary__search' });
  const search = el('input', {
    class: 'input',
    type: 'search',
    placeholder: '🔍 Buscar término o definición...',
    oninput: e => render(e.target.value)
  });
  searchWrap.appendChild(search);
  wrap.appendChild(searchWrap);

  const list = el('div', { class: 'glossary__list' });
  wrap.appendChild(list);

  wrap.appendChild(el('div', { style: 'margin-top: var(--space-5); display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap;' },
    el('button', { class: 'btn btn--primary', onclick: () => { playClick(); navigate('map'); } }, '🗺️ Mapa'),
    el('button', { class: 'btn btn--ghost', onclick: () => { playClick(); navigate('cheatsheet'); } }, '📋 Cheat sheet')
  ));

  function render(query) {
    const items = searchGlossary(query);
    list.innerHTML = '';
    if (!items.length) {
      list.appendChild(el('div', { class: 'empty' },
        el('div', { class: 'empty__icon' }, '🤷'),
        el('p', {}, 'Ningún término coincide.')
      ));
      return;
    }
    items
      .slice()
      .sort((a, b) => a.term.localeCompare(b.term))
      .forEach(g => {
        const item = el('div', { class: 'glossary__item' },
          el('div', { class: 'glossary__term' }, g.term),
          el('div', { class: 'glossary__def' }, g.def),
          g.example ? el('div', { class: 'glossary__example' }, g.example) : null
        );
        list.appendChild(item);
      });
  }

  render('');
  root.appendChild(wrap);
}
