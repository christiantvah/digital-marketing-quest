// ===== ANIMATIONS — utility para transiciones programáticas =====

export function animate(el, animationName, duration = 320) {
  return new Promise(resolve => {
    if (!el) return resolve();
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = `${animationName} ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    const onEnd = () => {
      el.style.animation = '';
      el.removeEventListener('animationend', onEnd);
      resolve();
    };
    el.addEventListener('animationend', onEnd);
    setTimeout(onEnd, duration + 100);
  });
}

export function shake(el) { return animate(el, 'shake', 400); }
export function pulse(el) { return animate(el, 'pulse', 600); }
export function fadeIn(el) { return animate(el, 'fadeIn', 320); }
export function dataReveal(el) { return animate(el, 'dataReveal', 700); }
export function bounce(el) { return animate(el, 'correctBounce', 500); }

export function typewriter(el, text, speed = 25) {
  return new Promise(resolve => {
    if (!el) return resolve();
    el.textContent = '';
    let i = 0;
    function tick() {
      if (i >= text.length) return resolve();
      el.textContent += text[i++];
      setTimeout(tick, speed);
    }
    tick();
  });
}

export function smoothScrollTo(target, offset = 80) {
  if (typeof target === 'string') target = document.querySelector(target);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
