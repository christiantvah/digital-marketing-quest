// ===== STATE — estado global del juego =====
import { load, save } from './storage.js';

export const SESSIONS = ['s1', 's2', 's3', 's35', 's4', 'boss'];

const SESSION_META = {
  s1:   { title: 'Los Orígenes',          subtitle: 'Sesión 1 · Definición + Transformación Digital', icon: '🏛️', mode: 'day',   badge: '🏛️ Historiador Digital' },
  s2:   { title: 'El Espía Digital',      subtitle: 'Sesión 2 · Análisis Competitivo + POEM',         icon: '🔍', mode: 'night', badge: '🔍 Espía POEM' },
  s3:   { title: 'Mente del Consumidor',  subtitle: 'Sesión 3 · Consumidor + Funnel + Sesgos',        icon: '🧠', mode: 'day',   badge: '🧠 Lector de Mentes' },
  s35:  { title: 'Era de la IA',          subtitle: 'Sesión 3.5 · Consumidor superempoderado',        icon: '🤖', mode: 'night', badge: '🤖 Domador de IA' },
  s4:   { title: 'Caja de Herramientas',  subtitle: 'Sesión 4 · Investigación + OBED',                icon: '🛠️', mode: 'day',   badge: '🛠️ Maestro de Herramientas' },
  boss: { title: 'Boss Battle',           subtitle: 'Reto final · 15 preguntas cronometradas',         icon: '👑', mode: 'night', badge: '👑 CMO Digital' },
};

export function getSessionMeta(id) { return SESSION_META[id]; }

const DEFAULT_STATE = {
  player: { name: '' },
  progress: {
    sessionsCompleted: [],     // ['s1', 's2', ...]
    sessionScores: {},         // { s1: { points, correct, total, perfect, scenesSeen } }
    currentSession: null,      // sesión activa
    currentScene: 0,           // índice de escena en la sesión actual
  },
  scores: {
    total: 0,
    streak: 0,
    maxStreak: 0,
    correctTotal: 0,
    incorrectTotal: 0,
  },
  badges: [],                  // ['s1', 's2', 'cmo', 'marathon', 'memory']
  settings: {
    sound: true,
    music: false,
    mode: 'day',               // 'day' | 'night'
    autoplay: false,
    typewriter: false,
    reducedMotion: false,
  },
  review: {
    failedQuestions: [],       // [{ id, sessionId, prompt, answer, explanation }]
  },
  flash: {
    perfectSessions: [],       // ['s1', 's2'] sessions where flash quiz was perfect
  },
  meta: {
    skipped: false,            // si saltó alguna sesión (afecta marathon badge)
    firstPlay: true,
    version: 1,
  },
};

let state = deepMerge(DEFAULT_STATE, load() || {});
const listeners = new Set();

function deepMerge(target, src) {
  const out = Array.isArray(target) ? [...target] : { ...target };
  if (typeof src !== 'object' || src === null) return out;
  for (const k of Object.keys(src)) {
    if (src[k] !== null && typeof src[k] === 'object' && !Array.isArray(src[k]) && typeof out[k] === 'object' && out[k] !== null && !Array.isArray(out[k])) {
      out[k] = deepMerge(out[k], src[k]);
    } else {
      out[k] = src[k];
    }
  }
  return out;
}

export function get() { return state; }
export function getSnapshot() { return JSON.parse(JSON.stringify(state)); }

export function update(mutator) {
  if (typeof mutator === 'function') mutator(state);
  else state = deepMerge(state, mutator);
  save(state);
  listeners.forEach(fn => { try { fn(state); } catch (e) { console.warn(e); } });
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function resetAll() {
  state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  save(state);
  listeners.forEach(fn => fn(state));
}

// === Helpers de progreso ===
export function isSessionUnlocked(sessionId) {
  if (sessionId === 's1') return true;
  const idx = SESSIONS.indexOf(sessionId);
  if (idx <= 0) return true;
  const prev = SESSIONS[idx - 1];
  return state.progress.sessionsCompleted.includes(prev);
}

export function isSessionCompleted(sessionId) {
  return state.progress.sessionsCompleted.includes(sessionId);
}

export function getSessionScore(sessionId) {
  return state.progress.sessionScores[sessionId] || { points: 0, correct: 0, total: 0, perfect: false };
}

// === Mutadores ===
export function setPlayerName(name) {
  update(s => { s.player.name = (name || '').trim().slice(0, 32) || 'Marketer'; s.meta.firstPlay = false; });
}

export function setSetting(key, value) {
  update(s => { s.settings[key] = value; });
}

export function applyMode(mode) {
  if (mode !== 'day' && mode !== 'night') return;
  setSetting('mode', mode);
  document.documentElement.setAttribute('data-mode', mode);
}

export function applySound(on) {
  setSetting('sound', !!on);
  document.documentElement.setAttribute('data-sound', on ? 'on' : 'off');
}

export function awardPoints(amount, { isCorrect = true } = {}) {
  update(s => {
    s.scores.total += amount;
    if (isCorrect) {
      s.scores.streak += 1;
      s.scores.correctTotal += 1;
      if (s.scores.streak > s.scores.maxStreak) s.scores.maxStreak = s.scores.streak;
    } else {
      s.scores.streak = 0;
      s.scores.incorrectTotal += 1;
    }
  });
}

export function resetStreak() {
  update(s => { s.scores.streak = 0; });
}

export function addFailedQuestion(q) {
  update(s => {
    if (!s.review.failedQuestions.find(f => f.id === q.id)) {
      s.review.failedQuestions.push(q);
    }
  });
}

export function clearFailedQuestion(id) {
  update(s => {
    s.review.failedQuestions = s.review.failedQuestions.filter(q => q.id !== id);
  });
}

export function recordSessionScore(sessionId, payload) {
  update(s => {
    s.progress.sessionScores[sessionId] = payload;
    if (!s.progress.sessionsCompleted.includes(sessionId)) {
      s.progress.sessionsCompleted.push(sessionId);
    }
    if (payload.flashPerfect && !s.flash.perfectSessions.includes(sessionId)) {
      s.flash.perfectSessions.push(sessionId);
    }
  });
}

export function unlockBadge(id) {
  update(s => {
    if (!s.badges.includes(id)) s.badges.push(id);
  });
}

export function markSkipped() {
  update(s => { s.meta.skipped = true; });
}

export function setCurrentScene(sessionId, sceneIdx) {
  update(s => {
    s.progress.currentSession = sessionId;
    s.progress.currentScene = sceneIdx;
  });
}

export function getTotalSessions() {
  return SESSIONS.filter(id => id !== 'boss').length;
}

export function getOverallProgressPct() {
  const total = SESSIONS.length;
  return Math.round((state.progress.sessionsCompleted.length / total) * 100);
}

// === Inicializar atributos del documento al arranque ===
export function syncDocumentAttributes() {
  document.documentElement.setAttribute('data-mode', state.settings.mode);
  document.documentElement.setAttribute('data-sound', state.settings.sound ? 'on' : 'off');
}
