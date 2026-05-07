// ===== NARRATIVA SESIÓN 1 — "Los Orígenes" =====
// Modo día. Aula UCV. TINO se presenta y explica qué es el Marketing Digital
// + 5 pilares de la Transformación Digital + caso Blockbuster vs Netflix.

export const narrativeS1 = {
  id: 's1',
  mode: 'day',
  title: 'Los Orígenes',
  subtitle: 'Definición + Transformación Digital',
  scenes: [
    {
      id: 's1-1',
      speaker: 'narrator',
      text: '8:00 a.m. Aula 304 de la UCV. El proyector parpadea. Suena el primer timbre. Un profesor con lentes y aire de YouTuber entra con una taza de café que dice "Datos > Opiniones".',
      visual: { type: 'emoji', payload: '☕' },
    },
    {
      id: 's1-2',
      speaker: 'TINO',
      text: '¡Buenos días, marketers! Soy TINO. Y antes que nada: lo que voy a enseñarles este ciclo, NO es lo que sus papás llaman marketing.',
      visual: { type: 'emoji', payload: '👋' },
    },
    {
      id: 's1-3',
      speaker: 'TINO',
      text: 'Marketing Digital no es solo "hacer publicidad en Instagram". Tampoco es "vender por internet". Y NO es hacer páginas web bonitas.',
      visual: { type: 'emoji', payload: '❌' },
    },
    {
      id: 's1-4',
      speaker: 'TINO',
      text: 'Definición seria, anótala: es el conjunto de estrategias para comunicar y comercializar productos a través de canales digitales… con un objetivo: construir relaciones de valor con el consumidor.',
      visual: { type: 'svg', payload: 'aiSparkle' },
      highlight: { word: 'canales digitales', tooltip: 'Web, redes sociales, email, apps, buscadores, video, mensajería.' },
    },
    {
      id: 's1-5',
      speaker: 'self',
      text: '(Tomas notas. La frase que se queda grabada es: "relaciones de valor, no solo ventas".)',
      visual: { type: 'emoji', payload: '✍️' },
    },
    {
      id: 's1-6',
      speaker: 'TINO',
      text: '¿Por qué importa? Tres razones. Primera: ALCANCE GLOBAL. Una pyme de Trujillo puede vender a Tokio sin oficina física.',
      visual: { type: 'emoji', payload: '🌍' },
    },
    {
      id: 's1-7',
      speaker: 'TINO',
      text: 'Segunda: MEDICIÓN Y ANALÍTICA. Cada click, cada scroll, cada segundo en pantalla queda registrado. El marketing digital es ciencia, no arte adivino.',
      visual: { type: 'emoji', payload: '📊' },
    },
    {
      id: 's1-8',
      speaker: 'TINO',
      text: 'Y tercera, la que les va a cambiar la vida: PERSONALIZACIÓN. La misma marca puede mostrar 10 mensajes distintos a 10 personas distintas, en el mismo segundo.',
      visual: { type: 'emoji', payload: '🎯' },
    },
    {
      id: 's1-9',
      speaker: 'TINO',
      text: 'Pero esto no apareció ayer. Tengamos perspectiva: en los 90s nacieron los primeros sitios web y el e-commerce. Amazon es de 1994. Eso es marketing digital v1.0.',
      visual: { type: 'svg', payload: 'timeline' },
    },
    {
      id: 's1-10',
      speaker: 'TINO',
      text: 'En los 2000s: explotaron las redes sociales y los smartphones. Facebook, YouTube, iPhone. El marketing pasó de un computador en casa a tu bolsillo, 24/7.',
      visual: { type: 'emoji', payload: '📱' },
    },
    {
      id: 's1-11',
      speaker: 'TINO',
      text: 'Y hoy… IA, personalización a escala, análisis predictivo, contenido generado por algoritmos. Tu feed de TikTok te conoce mejor que tu mamá. No exagero.',
      visual: { type: 'svg', payload: 'aiSparkle' },
      dataCard: { number: '2026', label: 'Era de la personalización con IA', source: 'Era actual' },
    },
    {
      id: 's1-12',
      speaker: 'TINO',
      text: 'Caso de estudio. 2000. Reed Hastings, fundador de Netflix, le ofrece su empresa a Blockbuster por 50 millones. Blockbuster se ríe.',
      visual: { type: 'emoji', payload: '🎬' },
    },
    {
      id: 's1-13',
      speaker: 'TINO',
      text: '10 años después, Blockbuster cierra 9.000 tiendas. Netflix tiene 200+ millones de suscriptores. ¿La moraleja?',
      visual: { type: 'emoji', payload: '💀' },
    },
    {
      id: 's1-14',
      speaker: 'TINO',
      text: 'El entorno digital no mató a Blockbuster. Lo mató SU NEGACIÓN del entorno digital. Big difference. Apunta esa frase, te va a aparecer en el examen.',
      visual: { type: 'emoji', payload: '⚠️' },
      highlight: { word: 'su negación', tooltip: 'Blockbuster ignoró las señales del entorno: nuevos hábitos de consumo, conexión por internet, modelos de suscripción. Murió por decisión propia.' },
    },
    {
      id: 's1-15',
      speaker: 'TINO',
      text: 'Para no terminar como Blockbuster, las empresas necesitan TRANSFORMACIÓN DIGITAL. Cinco pilares. Apaguen el celular y memoricen estos:',
      visual: { type: 'svg', payload: 'transformacionDigital' },
    },
    {
      id: 's1-16',
      speaker: 'TINO',
      text: 'Uno: Experiencia del Cliente. Dos: Operaciones Digitales. Tres: Cultura y Organización. Cuatro: Estrategia de Datos. Cinco: Ecosistema Digital.',
      visual: { type: 'emoji', payload: '🏗️' },
      dataCard: { number: '5', label: 'Pilares de la Transformación Digital', source: 'Cuadro 1 — Sesión 1' },
    },
    {
      id: 's1-17',
      speaker: 'TINO',
      text: 'Y aquí va la trampa que casi todos caen: la mayoría empieza la transformación por los SISTEMAS (compran software, instalan apps). El orden CORRECTO es al revés: Visión → Organización → Personas → Procesos → Sistemas.',
      visual: { type: 'emoji', payload: '🧭' },
      highlight: { word: 'Visión → Sistemas', tooltip: 'Visión, luego Organización, luego Personas, luego Procesos y al final Sistemas. Esa secuencia evita comprar tecnología que nadie sabe usar.' },
    },
    {
      id: 's1-18',
      speaker: 'TINO',
      text: 'Y un dato bonus: el mayor obstáculo de la Transformación Digital NO es tecnológico. Es HUMANO. La cultura. Las personas. Por eso este curso empieza por ustedes, no por el software. Nos vemos en el quiz.',
      visual: { type: 'emoji', payload: '🧠' },
      dataCard: { number: '#1', label: 'Obstáculo principal: el factor humano', source: 'Sesión 1' },
    },
  ],
  // Flash quiz: 3 preguntas rápidas de los datos clave del capítulo
  flashQuiz: [
    {
      id: 's1-flash-1',
      type: 'mc',
      prompt: '¿Cuántos pilares tiene la Transformación Digital?',
      options: [
        { text: '3', correct: false },
        { text: '5', correct: true },
        { text: '7', correct: false },
        { text: '10', correct: false },
      ],
    },
    {
      id: 's1-flash-2',
      type: 'mc',
      prompt: '¿Qué decade vio nacer los primeros sitios web y el e-commerce?',
      options: [
        { text: '1980s', correct: false },
        { text: '1990s', correct: true },
        { text: '2000s', correct: false },
        { text: '2010s', correct: false },
      ],
    },
    {
      id: 's1-flash-3',
      type: 'tf',
      prompt: 'El mayor obstáculo en la Transformación Digital es comprar mejor software.',
      answer: false,
    },
  ],
};
