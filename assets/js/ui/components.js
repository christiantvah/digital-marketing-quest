// ===== UI COMPONENTS — modal, toast, confetti =====
import { playClick, playWoosh, playBadgeUnlock } from '../core/audio.js';

// === Modal ===
export function showModal({ title = '', body = '', actions = [], variant = '', onClose = null, dismissable = true } = {}) {
  return new Promise(resolve => {
    const root = document.getElementById('modalRoot');
    if (!root) return resolve(null);

    root.innerHTML = '';
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const modal = document.createElement('div');
    const isFeedback = variant && variant.startsWith('feedback');
    modal.className = `modal ${variant ? `modal--${variant}` : ''}`;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    if (isFeedback) {
      modal.innerHTML = body;
    } else {
      modal.innerHTML = `
        ${title ? `<h2 class="modal__title">${title}</h2>` : ''}
        <div class="modal__body">${body}</div>
        <div class="modal__actions"></div>
      `;
    }
    // Render action buttons (works for feedback too if actions provided)
    let actionsRoot = modal.querySelector('.modal__actions');
    if (!actionsRoot && actions.length) {
      actionsRoot = document.createElement('div');
      actionsRoot.className = 'modal__actions';
      modal.appendChild(actionsRoot);
    }
    if (actionsRoot) {
      actions.forEach((a, i) => {
        const btn = document.createElement('button');
        btn.className = `btn ${a.variant ? `btn--${a.variant}` : 'btn--primary'}`;
        btn.textContent = a.label;
        btn.addEventListener('click', () => {
          playClick();
          close();
          if (a.onClick) a.onClick();
          resolve(a.value !== undefined ? a.value : i);
        });
        actionsRoot.appendChild(btn);
      });
    }

    root.appendChild(overlay);
    root.appendChild(modal);
    root.style.pointerEvents = 'auto';

    function close() {
      root.innerHTML = '';
      root.style.pointerEvents = 'none';
      if (onClose) onClose();
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape' && dismissable) {
        close();
        resolve(null);
      }
    }
    document.addEventListener('keydown', onKey);

    if (dismissable) {
      overlay.addEventListener('click', () => { close(); resolve(null); });
    }

    // Auto-focus first button
    setTimeout(() => {
      const firstBtn = modal.querySelector('button');
      if (firstBtn) firstBtn.focus();
    }, 50);
  });
}

// === Toast ===
let toastId = 0;
export function showToast(message, variant = '') {
  const root = document.getElementById('toastRoot');
  if (!root) return;
  const t = document.createElement('div');
  t.className = `toast ${variant ? `toast--${variant}` : ''}`;
  t.id = `toast-${++toastId}`;
  t.innerHTML = message;
  root.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// === Confetti (canvas) ===
let confettiActive = false;
export function fireConfetti(duration = 2400, count = 120) {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#FBBF24'];
  const pieces = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.4,
    vx: (Math.random() - 0.5) * 4,
    vy: 2 + Math.random() * 4,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.3,
    size: 6 + Math.random() * 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() < 0.5 ? 'rect' : 'circle',
  }));

  if (confettiActive) return; // evitar dobles
  confettiActive = true;
  const start = performance.now();

  function frame(t) {
    const elapsed = t - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.rot += p.vrot;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    if (elapsed < duration) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiActive = false;
    }
  }
  requestAnimationFrame(frame);
}

// === Spotlight (boss intro) ===
export function flashSpotlight(text, ms = 1400) {
  return new Promise(resolve => {
    const root = document.getElementById('modalRoot');
    if (!root) return resolve();
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 100;
      background: radial-gradient(circle at center, rgba(0,0,0,0.7), rgba(0,0,0,0.95));
      display: grid; place-items: center;
      animation: fadeIn 0.4s; pointer-events: auto;
    `;
    overlay.innerHTML = `
      <div style="color: #FBBF24; font-weight: 900; font-size: clamp(2rem, 8vw, 4rem); text-align: center; animation: dataReveal 0.6s; text-shadow: 0 0 24px rgba(251,191,36,0.5);">${text}</div>
    `;
    root.appendChild(overlay);
    root.style.pointerEvents = 'auto';
    playWoosh();
    setTimeout(() => {
      overlay.style.animation = 'fadeOut 0.4s forwards';
      setTimeout(() => {
        overlay.remove();
        if (!root.children.length) root.style.pointerEvents = 'none';
        resolve();
      }, 400);
    }, ms);
  });
}

// === Badge unlock animation ===
export function showBadgeUnlock(badgeText) {
  playBadgeUnlock();
  fireConfetti(1800, 80);
  showToast(`🏆 Insignia desbloqueada: ${badgeText}`, 'accent');
}

// === Helper: copy to clipboard ===
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    return true;
  } catch (err) {
    console.warn('[clipboard]', err);
    return false;
  }
}

// === Normalize text (acentos + minúsculas) ===
export function normalize(s) {
  return (s || '').toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s%]/g, '')
    .replace(/\s+/g, ' ');
}

// === Shuffle ===
export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// === Format ===
export function letterFor(idx) {
  return String.fromCharCode(65 + idx); // A, B, C, D
}

// === Element helper ===
export function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'data') Object.entries(v).forEach(([dk, dv]) => e.dataset[dk] = dv);
    else e.setAttribute(k, v);
  });
  children.flat().forEach(c => {
    if (c == null) return;
    if (typeof c === 'string' || typeof c === 'number') e.appendChild(document.createTextNode(c));
    else e.appendChild(c);
  });
  return e;
}
