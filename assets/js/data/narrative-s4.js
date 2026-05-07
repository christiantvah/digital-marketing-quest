// ===== NARRATIVA SESIÓN 4 — "Caja de Herramientas" =====
// Modo día. Investigación de Mercado Digital + 6 categorías + OBED + 7 pasos.

export const narrativeS4 = {
  id: 's4',
  mode: 'day',
  title: 'Caja de Herramientas',
  subtitle: 'Investigación de Mercado Digital + OBED',
  scenes: [
    {
      id: 's4-1',
      speaker: 'narrator',
      text: 'Última clase oficial. Aula UCV. TINO entra cargando una caja de cartón llena de stickers de logos: SEMrush, Ahrefs, Hotjar, GA4, SparkToro, Brandwatch.',
      visual: { type: 'emoji', payload: '🛠️' },
    },
    {
      id: 's4-2',
      speaker: 'TINO',
      text: 'Hoy vamos a sumar a tu cinturón de herramientas. Pero antes: ¿qué es la INVESTIGACIÓN DE MERCADO DIGITAL? Spoiler, no es lo mismo que la encuesta de tu mamá.',
      visual: { type: 'emoji', payload: '🔬' },
    },
    {
      id: 's4-3',
      speaker: 'TINO',
      text: 'Es el proceso de RECOLECTAR, ANALIZAR e INTERPRETAR datos digitales para tomar decisiones. Tres verbos. Memorízalos.',
      visual: { type: 'emoji', payload: '📊' },
    },
    {
      id: 's4-4',
      speaker: 'TINO',
      text: 'Tres beneficios sobre la investigación tradicional: VELOCIDAD (días vs meses), COSTO (10x más barato), ESCALA (millones de datos vs cientos).',
      visual: { type: 'emoji', payload: '⚡' },
      dataCard: { number: '3', label: 'Ventajas: velocidad, costo y escala', source: 'Investigación digital vs tradicional' },
    },
    {
      id: 's4-5',
      speaker: 'TINO',
      text: 'Las herramientas se agrupan en SEIS CATEGORÍAS. Apunta porque las preguntas clase típicas son "qué herramienta usas para X".',
      visual: { type: 'emoji', payload: '📦' },
    },
    {
      id: 's4-6',
      speaker: 'TINO',
      text: 'CATEGORÍA 1 — TENDENCIAS. Te dicen qué se está buscando ahora. Google Trends (gratis, mata-uno) y Exploding Topics (descubre tendencias antes que sean masivas).',
      visual: { type: 'emoji', payload: '📈' },
    },
    {
      id: 's4-7',
      speaker: 'TINO',
      text: 'CATEGORÍA 2 — SEO Y COMPETENCIA. SEMrush y Ahrefs son las pro (de pago). Ubersuggest es la versión accesible para PYME y estudiantes.',
      visual: { type: 'emoji', payload: '🔍' },
    },
    {
      id: 's4-8',
      speaker: 'TINO',
      text: 'CATEGORÍA 3 — ENCUESTAS. SurveyMonkey, Typeform, Google Forms. Para preguntar directo a tu cliente. Forms es gratis. Forms va.',
      visual: { type: 'emoji', payload: '📝' },
    },
    {
      id: 's4-9',
      speaker: 'TINO',
      text: 'CATEGORÍA 4 — ESCUCHA SOCIAL (social listening). Brandwatch, Mention, Hootsuite. Para saber qué se dice de tu marca SIN que tú preguntes.',
      visual: { type: 'emoji', payload: '👂' },
    },
    {
      id: 's4-10',
      speaker: 'TINO',
      text: 'CATEGORÍA 5 — AUDIENCIAS. Meta Insights, SparkToro, GWI (Global Web Index). Para conocer en profundidad QUIÉN es tu audiencia.',
      visual: { type: 'emoji', payload: '👥' },
    },
    {
      id: 's4-11',
      speaker: 'TINO',
      text: 'CATEGORÍA 6 — ANALÍTICA WEB. GA4 (Google Analytics 4) para tráfico, Hotjar para mapas de calor y grabaciones de sesión, Mixpanel para producto. Esta es la que más usarás.',
      visual: { type: 'emoji', payload: '📉' },
      dataCard: { number: '6', label: 'Categorías: Tendencias, SEO, Encuestas, Escucha, Audiencias, Analítica', source: 'Sesión 4' },
    },
    {
      id: 's4-12',
      speaker: 'TINO',
      text: '¿Y cómo eliges la herramienta correcta? Framework OBED. Cuatro letras. O-B-E-D. Cada vez que un cliente te pida "qué herramienta usar", piensa en esto.',
      visual: { type: 'svg', payload: 'obedDiamond' },
    },
    {
      id: 's4-13',
      speaker: 'TINO',
      text: 'O — OBJETIVO. ¿Qué quieres responder? Si no tienes objetivo claro, ninguna herramienta te sirve. Empieza siempre por "¿qué pregunta quiero contestar?".',
      visual: { type: 'emoji', payload: '🎯' },
    },
    {
      id: 's4-14',
      speaker: 'TINO',
      text: 'B — BUDGET. ¿Cuánto puedes gastar? SEMrush cuesta 130 USD al mes. Ubersuggest 30. Google Trends, cero. Tu presupuesto define tu kit.',
      visual: { type: 'emoji', payload: '💵' },
    },
    {
      id: 's4-15',
      speaker: 'TINO',
      text: 'E — EXPERTISE. ¿Tu equipo sabe usar la herramienta? La mejor herramienta del mundo no sirve si nadie la sabe operar. Hotjar es fácil, Mixpanel es complejo.',
      visual: { type: 'emoji', payload: '🧑‍💻' },
    },
    {
      id: 's4-16',
      speaker: 'TINO',
      text: 'D — DATO. ¿Qué tipo de dato necesitas? Cuanti (números, GA4, encuestas) o cuali (grabaciones de sesión, social listening). El tipo de dato manda.',
      visual: { type: 'emoji', payload: '📦' },
      dataCard: { number: 'OBED', label: 'Objetivo, Budget, Expertise, Dato', source: 'Framework de elección de herramientas' },
    },
    {
      id: 's4-17',
      speaker: 'TINO',
      text: 'Y para cerrar, el FLUJO de investigación de mercado digital tiene 7 pasos. En este orden: 1) definir el problema, 2) tendencias, 3) competencia, 4) escucha, 5) encuestas, 6) medir comportamiento, 7) decidir.',
      visual: { type: 'emoji', payload: '🔁' },
      dataCard: { number: '7', label: 'Pasos del flujo de investigación de mercado digital', source: 'Sesión 4' },
    },
    {
      id: 's4-18',
      speaker: 'TINO',
      text: 'Ya. Tienes definición, transformación, espionaje competitivo, mente del consumidor, IA y caja de herramientas. Eres oficialmente un marketer digital. Solo te falta una cosa: el Boss Battle.',
      visual: { type: 'emoji', payload: '👑' },
    },
  ],
  flashQuiz: [
    {
      id: 's4-flash-1',
      type: 'mc',
      prompt: '¿Qué herramienta GRATUITA usas para ver volumen de búsqueda por región?',
      options: [
        { text: 'SEMrush', correct: false },
        { text: 'Ahrefs', correct: false },
        { text: 'Google Trends', correct: true },
        { text: 'Mixpanel', correct: false },
      ],
    },
    {
      id: 's4-flash-2',
      type: 'cloze',
      prompt: 'Las 4 letras del framework de elección',
      template: 'Las 4 letras del framework para elegir herramientas son __, __, __, __.',
      answers: [
        ['o', 'objetivo'],
        ['b', 'budget'],
        ['e', 'expertise'],
        ['d', 'dato'],
      ],
    },
    {
      id: 's4-flash-3',
      type: 'mc',
      prompt: '¿Cuál es el PRIMER paso del flujo de investigación de mercado digital?',
      options: [
        { text: 'Investigar competencia', correct: false },
        { text: 'Definir el problema', correct: true },
        { text: 'Hacer encuestas', correct: false },
        { text: 'Medir comportamiento', correct: false },
      ],
    },
  ],
};
