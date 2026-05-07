// ===== CHEATSHEET — datos clave por sesión =====
export const cheatsheet = [
  {
    id: 's1',
    title: 'Sesión 1 · Los Orígenes',
    description: 'Definición + Transformación Digital + Caso Blockbuster',
    facts: [
      { num: '3', lbl: 'Pilares de importancia: Alcance Global, Medición/Analítica, Personalización' },
      { num: '5', lbl: 'Pilares Transformación Digital: Cliente, Operaciones, Cultura, Datos, Ecosistema' },
      { num: '1990s', lbl: 'Primeros sitios web + e-commerce (Amazon 1994)' },
      { num: '2000s', lbl: 'Redes sociales + smartphones (iPhone 2007)' },
      { num: 'Hoy', lbl: 'IA, personalización, análisis predictivo' },
      { num: 'V→S', lbl: 'Orden: Visión → Organización → Personas → Procesos → Sistemas' },
      { num: 'Humano', lbl: 'Mayor obstáculo de la Transformación Digital' },
      { num: '50M', lbl: 'Lo que Netflix se ofreció a Blockbuster en 2000 (rechazado)' },
    ],
  },
  {
    id: 's2',
    title: 'Sesión 2 · El Espía Digital',
    description: 'Análisis Competitivo + POEM + Benchmarking',
    facts: [
      { num: 'P-O-E', lbl: 'POEM = Paid (pagado), Owned (propio), Earned (ganado)' },
      { num: '2008', lbl: 'Forrester crea el modelo POEM' },
      { num: '4', lbl: 'Tipos de Benchmarking: Competitivo, Funcional, Interno, Genérico' },
      { num: '4', lbl: 'Fases del proceso: Planificación → Análisis → Integración → Acción' },
      { num: 'Vestidor', lbl: 'Analogía oficial: entrar al vestidor del rival antes del partido' },
      { num: '6+', lbl: 'Herramientas: Meta Ad Library, Google Trends, Phlanx, SimilarWeb, Social Blade, Google Transparency' },
    ],
  },
  {
    id: 's3',
    title: 'Sesión 3 · Mente del Consumidor',
    description: 'Consumidor + AIDA + STDC + Funnel + Sesgos',
    facts: [
      { num: '6h 37min', lbl: 'Tiempo diario en internet (consumidor hiperconectado)' },
      { num: '81%', lbl: 'Investiga online antes de comprar' },
      { num: '53%', lbl: 'Abandona páginas que tardan más de 3 seg' },
      { num: '92%', lbl: 'Confía más en UGC que en publicidad' },
      { num: '70%', lbl: 'Decisiones de compra antes de contactar vendedor' },
      { num: '5x', lbl: 'Más caro adquirir cliente nuevo vs retener' },
      { num: 'A-I-D-A', lbl: 'Atención · Interés · Deseo · Acción' },
      { num: 'STDC', lbl: 'See · Think · Do · Care (Google)' },
      { num: 'TOFU/MOFU/BOFU', lbl: 'Funnel: 10K → 2.5K → 250' },
      { num: '6', lbl: 'Sesgos: FOMO, Prueba Social, Ancla, Confirmación, Reciprocidad, Paradoja Elección' },
      { num: '5', lbl: 'Customer Journey: Descubrir → Considerar → Comprar → Retener → Recomendar' },
    ],
  },
  {
    id: 's35',
    title: 'Sesión 3.5 · Era de la IA',
    description: 'Consumidor superempoderado + Gemini + UCP',
    facts: [
      { num: 'Gemini', lbl: 'Modelo IA del nuevo Buscador de Google' },
      { num: '500M', lbl: 'Usuarios de los 15 productos Google con Gemini' },
      { num: '2.3x', lbl: 'Google es 2.3x más usado que ChatGPT para decidir compras' },
      { num: 'UCP', lbl: 'Universal Commerce Protocol (estándar agéntico)' },
      { num: '1B+', lbl: 'Conversiones desde YouTube CTV en 12 meses' },
      { num: '85%', lbl: 'Mexicanos: YouTube tiene los creadores más confiables' },
      { num: 'I-P-P', lbl: 'Asistencia Inteligente, Personal, Práctica' },
      { num: '3', lbl: 'Buscador más: personalizado, inteligente, AGENTE' },
      { num: '4', lbl: 'Estrategias ROI: consolidar datos, alinear ofertas, adoptar IA, oportunidades' },
    ],
  },
  {
    id: 's4',
    title: 'Sesión 4 · Caja de Herramientas',
    description: 'Investigación de Mercado + OBED',
    facts: [
      { num: '6', lbl: 'Categorías: Tendencias, SEO, Encuestas, Escucha, Audiencias, Analítica' },
      { num: 'O-B-E-D', lbl: 'Framework: Objetivo, Budget, Expertise, Dato' },
      { num: '7', lbl: 'Pasos: Definir → Tendencias → Competencia → Escuchar → Encuestas → Medir → Decidir' },
      { num: '3', lbl: 'Beneficios sobre tradicional: Velocidad, Costo, Escala' },
      { num: 'Tendencias', lbl: 'Google Trends, Exploding Topics' },
      { num: 'SEO', lbl: 'SEMrush, Ahrefs, Ubersuggest' },
      { num: 'Encuestas', lbl: 'Google Forms, Typeform, SurveyMonkey' },
      { num: 'Escucha', lbl: 'Brandwatch, Mention, Hootsuite' },
      { num: 'Audiencias', lbl: 'Meta Insights, SparkToro, GWI' },
      { num: 'Analítica', lbl: 'GA4, Hotjar, Mixpanel' },
    ],
  },
];

export function getCheatsheetText() {
  let out = 'DIGITAL MARKETING QUEST — CHEAT SHEET\n';
  out += '======================================\n\n';
  cheatsheet.forEach(s => {
    out += `### ${s.title}\n${s.description}\n\n`;
    s.facts.forEach(f => {
      out += `  • ${f.num} — ${f.lbl}\n`;
    });
    out += '\n';
  });
  return out;
}
