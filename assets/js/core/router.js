// ===== ROUTER — navegación entre pantallas =====
const routes = new Map();
const history = [];
let currentScreen = null;
let currentParams = null;

export function register(name, renderFn) {
  routes.set(name, renderFn);
}

export function navigate(name, params = {}) {
  if (!routes.has(name)) {
    console.warn(`[router] ruta desconocida: ${name}`);
    return;
  }
  if (currentScreen) history.push({ name: currentScreen, params: currentParams });
  currentScreen = name;
  currentParams = params;
  render();
}

export function replace(name, params = {}) {
  currentScreen = name;
  currentParams = params;
  render();
}

export function back() {
  const prev = history.pop();
  if (prev) {
    currentScreen = prev.name;
    currentParams = prev.params;
    render();
  } else {
    navigate('start');
  }
}

export function getCurrent() {
  return { name: currentScreen, params: currentParams };
}

function render() {
  const app = document.getElementById('app');
  if (!app) return;
  const renderFn = routes.get(currentScreen);
  if (!renderFn) return;

  // Apply transition
  app.classList.add('scene-transition-out');
  setTimeout(() => {
    app.innerHTML = '';
    app.classList.remove('scene-transition-out');
    app.classList.add('scene-transition-in');
    try {
      renderFn(app, currentParams || {});
    } catch (err) {
      console.error('[router] error renderizando', currentScreen, err);
      app.innerHTML = `<div class="empty"><div class="empty__icon">⚠️</div><h2>Algo se rompió</h2><p>${err.message}</p></div>`;
    }
    setTimeout(() => app.classList.remove('scene-transition-in'), 320);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 180);
}

// Browser back button support
window.addEventListener('popstate', (e) => {
  if (history.length > 0) back();
});
