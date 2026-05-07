// ===== STORAGE — wrapper sobre localStorage con fallback =====
const KEY = 'dmq_v1';
let memoryFallback = null;
let warnedAboutFallback = false;

function isLocalStorageAvailable() {
  try {
    const t = '__dmq_test__';
    localStorage.setItem(t, '1');
    localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

const HAS_LS = isLocalStorageAvailable();

export function load() {
  try {
    if (HAS_LS) {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    }
    return memoryFallback;
  } catch (err) {
    console.warn('[storage] load error', err);
    return null;
  }
}

export function save(data) {
  try {
    const json = JSON.stringify(data);
    if (HAS_LS) {
      localStorage.setItem(KEY, json);
    } else {
      memoryFallback = JSON.parse(json);
      if (!warnedAboutFallback) {
        console.warn('[storage] localStorage no disponible — usando memoria (no persiste)');
        warnedAboutFallback = true;
      }
    }
    return true;
  } catch (err) {
    console.warn('[storage] save error', err);
    return false;
  }
}

export function reset() {
  try {
    if (HAS_LS) localStorage.removeItem(KEY);
    memoryFallback = null;
  } catch (err) {
    console.warn('[storage] reset error', err);
  }
}

export const isPersistent = HAS_LS;
