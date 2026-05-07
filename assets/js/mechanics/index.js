// ===== MECHANICS — registry =====
import { renderMultipleChoice } from './multiple-choice.js';
import { renderTrueFalse } from './true-false.js';
import { renderCloze } from './cloze.js';
import { renderMatching } from './matching.js';
import { renderOrdering } from './ordering.js';
import { renderDragDrop } from './drag-drop.js';

const map = {
  mc: renderMultipleChoice,
  tf: renderTrueFalse,
  cloze: renderCloze,
  matching: renderMatching,
  ordering: renderOrdering,
  dragdrop: renderDragDrop,
};

export function renderMechanic(type, container, question, opts) {
  const fn = map[type];
  if (!fn) {
    console.warn('[mechanic] tipo desconocido:', type);
    return null;
  }
  return fn(container, question, opts);
}
