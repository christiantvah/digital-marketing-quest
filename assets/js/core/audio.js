// ===== AUDIO — Web Audio API engine + biblioteca de SFX =====
import { get } from './state.js';

let ctx = null;
let masterGain = null;
let unlocked = false;

function ensureContext() {
  if (ctx) return ctx;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.55;
    masterGain.connect(ctx.destination);
  } catch (err) {
    console.warn('[audio] no disponible', err);
    ctx = null;
  }
  return ctx;
}

// Need a user gesture to unlock audio in most browsers
export function unlock() {
  ensureContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  unlocked = true;
}

function isMuted() {
  return !get().settings.sound;
}

// === Building blocks ===
function note(freq, dur, type = 'sine', startTime = 0, gain = 0.2, attack = 0.005, release = 0.06) {
  if (isMuted() || !ensureContext()) return;
  const t0 = ctx.currentTime + startTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + attack);
  g.gain.linearRampToValueAtTime(gain * 0.7, t0 + dur - release);
  g.gain.linearRampToValueAtTime(0, t0 + dur);
  osc.connect(g).connect(masterGain);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function noiseBurst(dur, startTime = 0, gain = 0.18, filterFreq = 1200, filterType = 'lowpass') {
  if (isMuted() || !ensureContext()) return;
  const t0 = ctx.currentTime + startTime;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = filterFreq;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.005);
  g.gain.linearRampToValueAtTime(0, t0 + dur);
  src.connect(filter).connect(g).connect(masterGain);
  src.start(t0);
  src.stop(t0 + dur + 0.02);
}

// === SFX library ===
export function playClick() { note(800, 0.06, 'sine', 0, 0.18); }
export function playHover() { note(1200, 0.04, 'sine', 0, 0.06); }

export function playCorrect() {
  // arpegio C5-E5-G5
  note(523.25, 0.12, 'sine', 0, 0.22);
  note(659.25, 0.12, 'sine', 0.06, 0.22);
  note(783.99, 0.18, 'sine', 0.12, 0.24);
  note(1046.5, 0.22, 'triangle', 0.18, 0.18);
}

export function playError() {
  note(200, 0.18, 'square', 0, 0.18);
  note(180, 0.22, 'square', 0.04, 0.14);
}

export function playStreak() {
  // fanfarria C-E-G-C
  const seq = [523.25, 659.25, 783.99, 1046.5];
  seq.forEach((f, i) => note(f, 0.18, 'triangle', i * 0.08, 0.22));
}

export function playSceneTransition() {
  noiseBurst(0.32, 0, 0.16, 800, 'lowpass');
  note(220, 0.18, 'sine', 0, 0.1);
}

export function playDataReveal() {
  note(880, 0.08, 'triangle', 0, 0.22);
  note(1318.51, 0.18, 'triangle', 0.05, 0.22);
  note(1760, 0.32, 'sine', 0.12, 0.18);
  noiseBurst(0.18, 0.03, 0.06, 6000, 'highpass');
}

export function playBadgeUnlock() {
  // chord C major + ascending
  const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
  notes.forEach((f, i) => note(f, 0.4, 'triangle', i * 0.04, 0.14));
  note(1046.5, 0.6, 'sine', 0.32, 0.22);
}

export function playPageFlip() {
  noiseBurst(0.12, 0, 0.08, 4000, 'bandpass');
}

export function playWoosh() {
  noiseBurst(0.4, 0, 0.18, 600, 'bandpass');
}

export function playTick() {
  note(1500, 0.04, 'square', 0, 0.06);
}

export function playWarning() {
  note(880, 0.1, 'square', 0, 0.18);
  note(880, 0.1, 'square', 0.18, 0.18);
}

export function playFinalVictory() {
  // longer fanfare
  const sequence = [
    [523.25, 0.12], [523.25, 0.12], [523.25, 0.12], [523.25, 0.36],
    [415.30, 0.36], [466.16, 0.36], [523.25, 0.24], [466.16, 0.12], [523.25, 0.6]
  ];
  let t = 0;
  sequence.forEach(([f, d]) => {
    note(f, d * 0.95, 'triangle', t, 0.22);
    note(f * 2, d * 0.95, 'sine', t, 0.08);
    t += d;
  });
}

export function setVolume(v) {
  ensureContext();
  if (masterGain) masterGain.gain.value = Math.max(0, Math.min(1, v));
}
