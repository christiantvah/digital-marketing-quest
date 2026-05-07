// ===== SVG ICONS — todos generan strings SVG inline =====

export function tinoAvatar(mode = 'day') {
  if (mode === 'night') {
    // detective: gabardina + sombrero + lupa
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="bgN" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1E293B"/>
          <stop offset="100%" stop-color="#312E81"/>
        </linearGradient>
        <radialGradient id="lensN" cx="50%" cy="50%">
          <stop offset="0%" stop-color="rgba(251,191,36,0.4)"/>
          <stop offset="100%" stop-color="rgba(251,191,36,0)"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#bgN)"/>
      <!-- Gabardina -->
      <path d="M 50 200 Q 60 130 100 130 Q 140 130 150 200 Z" fill="#475569"/>
      <path d="M 100 130 L 100 200" stroke="#1E293B" stroke-width="2"/>
      <!-- Cuello camisa -->
      <path d="M 85 130 L 100 145 L 115 130 Z" fill="#F1F5F9"/>
      <!-- Corbata -->
      <path d="M 96 140 L 104 140 L 102 175 L 98 175 Z" fill="#FBBF24"/>
      <!-- Cara -->
      <ellipse cx="100" cy="92" rx="32" ry="36" fill="#F4C49B"/>
      <!-- Sombrero detective (fedora) -->
      <ellipse cx="100" cy="60" rx="48" ry="10" fill="#0F172A"/>
      <path d="M 70 60 Q 70 32 100 30 Q 130 32 130 60 Z" fill="#1E293B"/>
      <rect x="70" y="55" width="60" height="8" fill="#0F172A"/>
      <rect x="118" y="55" width="6" height="8" fill="#FBBF24"/>
      <!-- Pelo lateral -->
      <path d="M 68 95 Q 65 85 72 78" stroke="#1F2937" stroke-width="3" fill="none"/>
      <!-- Cejas -->
      <path d="M 82 82 Q 88 78 94 82" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 106 82 Q 112 78 118 82" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Ojos -->
      <ellipse cx="88" cy="92" rx="3" ry="3.5" fill="#0F172A"/>
      <ellipse cx="112" cy="92" rx="3" ry="3.5" fill="#0F172A"/>
      <circle cx="89" cy="91" r="1" fill="#fff"/>
      <circle cx="113" cy="91" r="1" fill="#fff"/>
      <!-- Nariz -->
      <path d="M 100 96 L 96 108 Q 100 111 104 108 Z" fill="#E0A074" opacity="0.5"/>
      <!-- Sonrisa carismática -->
      <path d="M 86 116 Q 100 124 114 116" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Lupa flotante -->
      <g transform="translate(40 130) rotate(-15)">
        <circle cx="0" cy="0" r="14" fill="none" stroke="#FBBF24" stroke-width="3"/>
        <circle cx="0" cy="0" r="14" fill="url(#lensN)"/>
        <line x1="10" y1="10" x2="22" y2="22" stroke="#FBBF24" stroke-width="4" stroke-linecap="round"/>
      </g>
    </svg>`;
  }
  // día: profe carismático con lentes + camisa
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="bgD" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#DBEAFE"/>
        <stop offset="100%" stop-color="#FEF3C7"/>
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="95" fill="url(#bgD)"/>
    <!-- Cuerpo / camisa -->
    <path d="M 50 200 Q 55 135 100 135 Q 145 135 150 200 Z" fill="#2563EB"/>
    <!-- Cuello camisa interior -->
    <path d="M 85 135 L 100 150 L 115 135 Z" fill="#FFFFFF"/>
    <!-- Botones -->
    <circle cx="100" cy="160" r="2" fill="#fff"/>
    <circle cx="100" cy="175" r="2" fill="#fff"/>
    <!-- Cara -->
    <ellipse cx="100" cy="92" rx="34" ry="38" fill="#F4C49B"/>
    <!-- Pelo (estilo joven moderno con quiff) -->
    <path d="M 65 75 Q 68 50 95 48 Q 130 46 138 70 Q 138 78 130 78 L 70 80 Q 65 80 65 75 Z" fill="#1F2937"/>
    <path d="M 88 50 Q 95 38 105 42 Q 115 35 125 50" stroke="#1F2937" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Cejas -->
    <path d="M 80 80 Q 88 76 96 80" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M 104 80 Q 112 76 120 80" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- Lentes -->
    <circle cx="88" cy="92" r="10" fill="rgba(255,255,255,0.4)" stroke="#1F2937" stroke-width="2"/>
    <circle cx="112" cy="92" r="10" fill="rgba(255,255,255,0.4)" stroke="#1F2937" stroke-width="2"/>
    <line x1="98" y1="92" x2="102" y2="92" stroke="#1F2937" stroke-width="2"/>
    <!-- Ojos detrás de lentes -->
    <circle cx="88" cy="92" r="2.5" fill="#1F2937"/>
    <circle cx="112" cy="92" r="2.5" fill="#1F2937"/>
    <!-- Nariz -->
    <path d="M 100 100 L 96 112 Q 100 115 104 112 Z" fill="#E0A074" opacity="0.5"/>
    <!-- Sonrisa amplia -->
    <path d="M 84 118 Q 100 130 116 118" stroke="#1F2937" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <!-- Diente blanco asomando (carisma) -->
    <rect x="96" y="120" width="3" height="4" fill="#fff" rx="1"/>
    <rect x="101" y="120" width="3" height="4" fill="#fff" rx="1"/>
    <!-- Auriculares around neck (YouTuber vibe) -->
    <path d="M 65 110 Q 60 125 70 135" stroke="#10B981" stroke-width="3" fill="none"/>
    <path d="M 135 110 Q 140 125 130 135" stroke="#10B981" stroke-width="3" fill="none"/>
  </svg>`;
}

export function levelIcon(id) {
  const map = {
    s1: '🏛️', s2: '🔍', s3: '🧠', s35: '🤖', s4: '🛠️', boss: '👑',
  };
  return `<span style="font-size:2.4rem">${map[id] || '📘'}</span>`;
}

export function dataCard({ number, label, source }) {
  return `<div class="data-card data-reveal" role="figure">
    <div class="data-card__number">${number}</div>
    <div class="data-card__label">${label}</div>
    ${source ? `<div class="data-card__source">${source}</div>` : ''}
  </div>`;
}

export function funnel() {
  return `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-label="Funnel TOFU MOFU BOFU">
    <defs>
      <linearGradient id="fnGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#60A5FA"/>
        <stop offset="50%" stop-color="#A78BFA"/>
        <stop offset="100%" stop-color="#F59E0B"/>
      </linearGradient>
    </defs>
    <polygon points="20,30 300,30 240,100 80,100" fill="#60A5FA" opacity="0.85"/>
    <polygon points="80,110 240,110 200,170 120,170" fill="#A78BFA" opacity="0.85"/>
    <polygon points="120,180 200,180 175,225 145,225" fill="#F59E0B" opacity="0.95"/>
    <text x="160" y="68" text-anchor="middle" fill="#fff" font-weight="800" font-size="22" font-family="system-ui">TOFU · 10K</text>
    <text x="160" y="148" text-anchor="middle" fill="#fff" font-weight="800" font-size="18" font-family="system-ui">MOFU · 2.5K</text>
    <text x="160" y="207" text-anchor="middle" fill="#fff" font-weight="800" font-size="14" font-family="system-ui">BOFU · 250</text>
  </svg>`;
}

export function timeline() {
  return `<svg viewBox="0 0 360 140" xmlns="http://www.w3.org/2000/svg" aria-label="Timeline marketing digital">
    <line x1="20" y1="70" x2="340" y2="70" stroke="#94A3B8" stroke-width="3" stroke-dasharray="6 6"/>
    <circle cx="60" cy="70" r="22" fill="#2563EB"/>
    <text x="60" y="76" text-anchor="middle" fill="#fff" font-weight="800" font-size="14">90s</text>
    <text x="60" y="112" text-anchor="middle" fill="#1F2937" font-size="11">Web + e-commerce</text>
    <circle cx="180" cy="70" r="22" fill="#10B981"/>
    <text x="180" y="76" text-anchor="middle" fill="#fff" font-weight="800" font-size="14">2000s</text>
    <text x="180" y="112" text-anchor="middle" fill="#1F2937" font-size="11">Redes + móvil</text>
    <circle cx="300" cy="70" r="22" fill="#F59E0B"/>
    <text x="300" y="76" text-anchor="middle" fill="#fff" font-weight="800" font-size="13">Hoy</text>
    <text x="300" y="112" text-anchor="middle" fill="#1F2937" font-size="11">IA + datos</text>
  </svg>`;
}

export function poemVenn() {
  return `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" aria-label="Modelo POEM">
    <circle cx="100" cy="100" r="70" fill="#F59E0B" opacity="0.55"/>
    <circle cx="200" cy="100" r="70" fill="#10B981" opacity="0.55"/>
    <circle cx="150" cy="160" r="70" fill="#8B5CF6" opacity="0.55"/>
    <text x="80" y="80" text-anchor="middle" fill="#1F2937" font-weight="800" font-size="18">PAID</text>
    <text x="220" y="80" text-anchor="middle" fill="#1F2937" font-weight="800" font-size="18">OWNED</text>
    <text x="150" y="200" text-anchor="middle" fill="#1F2937" font-weight="800" font-size="18">EARNED</text>
  </svg>`;
}

export function aidaPyramid() {
  return `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" aria-label="Modelo AIDA">
    <polygon points="20,40 280,40 250,80 50,80" fill="#60A5FA" opacity="0.9"/>
    <polygon points="50,90 250,90 220,130 80,130" fill="#A78BFA" opacity="0.9"/>
    <polygon points="80,140 220,140 195,180 105,180" fill="#F472B6" opacity="0.9"/>
    <polygon points="105,190 195,190 175,215 125,215" fill="#F59E0B" opacity="0.95"/>
    <text x="150" y="65" text-anchor="middle" fill="#fff" font-weight="800" font-size="14">ATENCIÓN</text>
    <text x="150" y="115" text-anchor="middle" fill="#fff" font-weight="800" font-size="14">INTERÉS</text>
    <text x="150" y="165" text-anchor="middle" fill="#fff" font-weight="800" font-size="14">DESEO</text>
    <text x="150" y="206" text-anchor="middle" fill="#fff" font-weight="800" font-size="12">ACCIÓN</text>
  </svg>`;
}

export function stdcCompass() {
  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" aria-label="Modelo See Think Do Care">
    <line x1="150" y1="20" x2="150" y2="280" stroke="#94A3B8" stroke-width="2"/>
    <line x1="20" y1="150" x2="280" y2="150" stroke="#94A3B8" stroke-width="2"/>
    <rect x="30" y="30" width="110" height="110" fill="#60A5FA" opacity="0.6" rx="12"/>
    <rect x="160" y="30" width="110" height="110" fill="#A78BFA" opacity="0.6" rx="12"/>
    <rect x="30" y="160" width="110" height="110" fill="#F59E0B" opacity="0.6" rx="12"/>
    <rect x="160" y="160" width="110" height="110" fill="#10B981" opacity="0.6" rx="12"/>
    <text x="85" y="92" text-anchor="middle" fill="#fff" font-weight="800" font-size="20">SEE</text>
    <text x="215" y="92" text-anchor="middle" fill="#fff" font-weight="800" font-size="20">THINK</text>
    <text x="85" y="222" text-anchor="middle" fill="#fff" font-weight="800" font-size="20">DO</text>
    <text x="215" y="222" text-anchor="middle" fill="#fff" font-weight="800" font-size="20">CARE</text>
  </svg>`;
}

export function journeyArrow() {
  const steps = ['Descubrir', 'Considerar', 'Comprar', 'Retener', 'Recomendar'];
  const colors = ['#60A5FA', '#A78BFA', '#F472B6', '#F59E0B', '#10B981'];
  let svg = `<svg viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg" aria-label="Customer Journey">`;
  steps.forEach((step, i) => {
    const x = i * 115;
    svg += `<polygon points="${x},20 ${x + 95},20 ${x + 110},50 ${x + 95},80 ${x},80 ${x + 15},50" fill="${colors[i]}"/>`;
    svg += `<text x="${x + 55}" y="55" text-anchor="middle" fill="#fff" font-weight="800" font-size="13" font-family="system-ui">${step}</text>`;
  });
  svg += `</svg>`;
  return svg;
}

export function obedDiamond() {
  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" aria-label="Framework OBED">
    <polygon points="150,30 270,150 150,270 30,150" fill="none" stroke="#2563EB" stroke-width="3"/>
    <circle cx="150" cy="50" r="34" fill="#2563EB"/>
    <text x="150" y="56" text-anchor="middle" fill="#fff" font-weight="800" font-size="22">O</text>
    <text x="150" y="100" text-anchor="middle" fill="#1F2937" font-size="11">Objetivo</text>
    <circle cx="250" cy="150" r="34" fill="#10B981"/>
    <text x="250" y="156" text-anchor="middle" fill="#fff" font-weight="800" font-size="22">B</text>
    <text x="250" y="200" text-anchor="middle" fill="#1F2937" font-size="11">Budget</text>
    <circle cx="150" cy="250" r="34" fill="#F59E0B"/>
    <text x="150" y="256" text-anchor="middle" fill="#fff" font-weight="800" font-size="22">E</text>
    <text x="150" y="295" text-anchor="middle" fill="#1F2937" font-size="11">Expertise</text>
    <circle cx="50" cy="150" r="34" fill="#8B5CF6"/>
    <text x="50" y="156" text-anchor="middle" fill="#fff" font-weight="800" font-size="22">D</text>
    <text x="50" y="200" text-anchor="middle" fill="#1F2937" font-size="11">Dato</text>
  </svg>`;
}

export function transformacionDigital() {
  // 5 pillars
  const pillars = [
    { x: 30, label: 'Experiencia\nCliente', color: '#2563EB' },
    { x: 90, label: 'Operaciones\nDigitales', color: '#10B981' },
    { x: 150, label: 'Cultura y\nOrganización', color: '#F59E0B' },
    { x: 210, label: 'Estrategia\nde Datos', color: '#8B5CF6' },
    { x: 270, label: 'Ecosistema\nDigital', color: '#F472B6' },
  ];
  let svg = `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" aria-label="5 pilares Transformación Digital">`;
  pillars.forEach(p => {
    svg += `<rect x="${p.x}" y="40" width="50" height="120" fill="${p.color}" rx="8"/>`;
    const lines = p.label.split('\n');
    lines.forEach((l, i) => {
      svg += `<text x="${p.x + 25}" y="${110 + i * 14}" text-anchor="middle" fill="#fff" font-weight="700" font-size="10">${l}</text>`;
    });
  });
  svg += `<line x1="10" y1="170" x2="350" y2="170" stroke="#94A3B8" stroke-width="2"/>`;
  svg += `</svg>`;
  return svg;
}

export function aiSparkle() {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="aiG"><stop offset="0%" stop-color="#A78BFA"/><stop offset="100%" stop-color="#2563EB"/></radialGradient>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#aiG)"/>
    <text x="50" y="62" text-anchor="middle" fill="#fff" font-weight="800" font-size="32">✨</text>
  </svg>`;
}

export function detectiveBadge() {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="50,10 60,30 82,32 65,48 70,72 50,60 30,72 35,48 18,32 40,30" fill="#FBBF24" stroke="#92400E" stroke-width="2"/>
    <text x="50" y="50" text-anchor="middle" fill="#92400E" font-weight="900" font-size="14">CASO</text>
  </svg>`;
}

export function backArrow() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

export function nextArrow() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

export function lockIcon() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
    <path d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11" stroke="currentColor" stroke-width="2"/>
  </svg>`;
}

export function checkIcon() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 12L10 17L20 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}
