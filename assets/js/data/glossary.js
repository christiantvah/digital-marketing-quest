// ===== GLOSARIO — términos clave del curso =====
export const glossary = [
  { term: 'AIDA', def: 'Modelo clásico de marketing: Atención → Interés → Deseo → Acción.', example: 'En digital: SEO/Display (atención), blog/email (interés), reviews/UGC (deseo), CTA/checkout (acción).', tags: ['s3'] },
  { term: 'BOFU', def: 'Bottom Of Funnel. Etapa final del embudo: el cliente está listo para comprar.', example: 'Tácticas BOFU: Google Ads transaccionales, ofertas con FOMO, chat en vivo.', tags: ['s3'] },
  { term: 'BOPIS', def: 'Buy Online, Pickup In Store. Compra online y recoge en tienda.', example: 'Comprar en saga.com.pe y retirar en Saga Real Plaza.', tags: ['s3'] },
  { term: 'Benchmarking', def: 'Proceso de comparar tu desempeño con el de otras empresas para identificar mejores prácticas.', example: '4 tipos: Competitivo Directo, Funcional, Interno, Genérico.', tags: ['s2'] },
  { term: 'Buyer Persona', def: 'Personaje ficticio basado en datos cuali + cuanti que representa a tu cliente ideal.', example: '"Ana López, 28, gerente de marketing en Lima, mamá de Luca". Tiene foto, edad, frustraciones.', tags: ['s3'] },
  { term: 'CAC', def: 'Customer Acquisition Cost — costo de adquirir un nuevo cliente.', example: 'Si gastas S/10,000 en ads y consigues 100 clientes, CAC = S/100.', tags: ['s4'] },
  { term: 'CARE', def: 'Última etapa del modelo See-Think-Do-Care de Google: cliente actual, fidelización.', example: 'Email retention, programa de loyalty, atención post-venta.', tags: ['s3'] },
  { term: 'Customer Journey', def: 'Camino completo del cliente: Descubrir → Considerar → Comprar → Retener → Recomendar.', example: 'NO es lineal en la realidad — el cliente entra y sale en cualquier etapa.', tags: ['s3'] },
  { term: 'CPL', def: 'Cost Per Lead — costo por lead generado.', example: 'Si gastas S/500 en una campaña y consigues 50 leads, CPL = S/10.', tags: ['s3'] },
  { term: 'CTR', def: 'Click-Through Rate — porcentaje de clicks sobre impresiones.', example: 'Si tu anuncio se mostró 1000 veces y recibió 30 clicks, CTR = 3%.', tags: ['s3'] },
  { term: 'CTV', def: 'Connected TV — Smart TV conectado a internet.', example: 'YouTube en Smart TV generó +1B conversiones en 12 meses.', tags: ['s35'] },
  { term: 'Earned Media', def: 'Medios "ganados" — cuando otros hablan de tu marca SIN que pagues.', example: 'Reseñas, hashtags orgánicos, prensa, boca a boca digital. Las negativas también cuentan.', tags: ['s2'] },
  { term: 'FOMO', def: 'Fear Of Missing Out — miedo a perderse algo. Sesgo cognitivo.', example: '"¡Solo quedan 2 unidades!" / "Oferta termina en 00:23:47" — Booking, Rappi, Amazon.', tags: ['s3'] },
  { term: 'Funnel', def: 'Embudo de conversión. Tres etapas: TOFU, MOFU, BOFU.', example: 'TOFU 10K → MOFU 2.5K (25%) → BOFU 250 (10%).', tags: ['s3'] },
  { term: 'GA4', def: 'Google Analytics 4 — herramienta de analítica web por defecto.', example: 'Mide tráfico, fuentes, conversiones, embudos. Reemplazó a Universal Analytics.', tags: ['s4'] },
  { term: 'Gemini', def: 'Modelo de IA propio de Google. Motor del nuevo Buscador y de 15 productos Google.', example: 'Está en Search, Gmail, YouTube, Maps, etc. Suma 500M+ usuarios.', tags: ['s35'] },
  { term: 'Hotjar', def: 'Herramienta de analítica cualitativa: mapas de calor + grabaciones de sesión.', example: 'Descubres qué partes de tu web la gente ignora o donde se atasca.', tags: ['s4'] },
  { term: 'KPI', def: 'Key Performance Indicator — métrica clave de desempeño.', example: 'KPI de TOFU: alcance. KPI de MOFU: leads. KPI de BOFU: ventas.', tags: ['s3'] },
  { term: 'MOFU', def: 'Middle Of Funnel — el cliente está investigando opciones.', example: 'Tácticas MOFU: lead magnets, email nurturing, retargeting.', tags: ['s3'] },
  { term: 'NPS', def: 'Net Promoter Score — métrica de lealtad del cliente, escala 0-10.', example: 'Si te calificarían 9-10 te recomiendan; 0-6 son detractores.', tags: ['s3'] },
  { term: 'OBED', def: 'Framework de elección de herramientas: Objetivo, Budget, Expertise, Dato.', example: '¿Qué quieres saber? ¿Cuánto pagas? ¿Quién la usa? ¿Qué tipo de dato?', tags: ['s4'] },
  { term: 'Owned Media', def: 'Medios propios — la marca los controla 100%.', example: 'Web, app, blog, IG/TikTok oficial, lista de email. No requieren pago para mantenerse.', tags: ['s2'] },
  { term: 'Paid Media', def: 'Medios pagados — anuncios donde la marca paga por aparecer.', example: 'Google Ads, Meta Ads, YouTube pre-roll, influencer pagado.', tags: ['s2'] },
  { term: 'POEM', def: 'Modelo Forrester (2008) que clasifica activos digitales en Paid, Owned, Earned.', example: 'Anuncio Google = Paid. Web saga.com.pe = Owned. Reseña KFC 4.1★ = Earned.', tags: ['s2'] },
  { term: 'ROI', def: 'Return On Investment — retorno sobre inversión.', example: 'Si inviertes S/1,000 y generas S/3,000 en ventas atribuidas, ROI = 200%.', tags: ['s3', 's35'] },
  { term: 'ROPO', def: 'Research Online, Purchase Offline. Investiga online y compra en tienda.', example: 'Buscar reseñas en Google y luego ir a Plaza Vea a comprar el producto.', tags: ['s3'] },
  { term: 'SEM', def: 'Search Engine Marketing — anuncios pagados en buscadores.', example: 'Google Ads en la red de búsqueda.', tags: ['s2'] },
  { term: 'SEO', def: 'Search Engine Optimization — posicionamiento orgánico en buscadores.', example: 'Sin pagar, aparecer arriba en Google cuando alguien busca tu palabra clave.', tags: ['s2', 's4'] },
  { term: 'STDC', def: 'See-Think-Do-Care: modelo de Google para etapas de marketing.', example: 'SEE = awareness, THINK = compara, DO = compra, CARE = fideliza.', tags: ['s3'] },
  { term: 'TOFU', def: 'Top Of Funnel — etapa de descubrimiento, alcance amplio.', example: 'Blog SEO, podcasts, social ads para awareness.', tags: ['s3'] },
  { term: 'Target Audience', def: 'Grupo demográfico amplio definido con datos cuantitativos.', example: '"Mujeres 25-35, NSE B+, Lima Metro". Útil para presupuesto y compra de medios.', tags: ['s3'] },
  { term: 'Transformación Digital', def: '5 pilares: Experiencia del Cliente, Operaciones, Cultura/Organización, Datos, Ecosistema.', example: 'Orden correcto: Visión → Organización → Personas → Procesos → Sistemas.', tags: ['s1'] },
  { term: 'UCP', def: 'Universal Commerce Protocol — estándar abierto para comercio agéntico.', example: 'Permite que distintos agentes de IA intercambien info de compra de forma estándar.', tags: ['s35'] },
  { term: 'UGC', def: 'User-Generated Content — contenido creado por usuarios, no por la marca.', example: 'Una review en YouTube, una foto en IG con un producto. 92% confía más en UGC que en ads.', tags: ['s3'] },
  { term: 'SimilarWeb', def: 'Herramienta que estima tráfico web, fuentes y países de cualquier sitio.', example: 'Útil para entender el tráfico real de tu competencia.', tags: ['s2'] },
  { term: 'SparkToro', def: 'Herramienta de inteligencia de audiencias.', example: 'Te dice qué podcasts, sitios y cuentas sigue tu audiencia objetivo.', tags: ['s4'] },
  { term: 'Phlanx', def: 'Herramienta para calcular Engagement Rate real de perfiles públicos de Instagram.', example: 'Detecta perfiles con seguidores inflados (low engagement vs followers).', tags: ['s2'] },
];

export function searchGlossary(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return glossary;
  return glossary.filter(g =>
    g.term.toLowerCase().includes(q) ||
    g.def.toLowerCase().includes(q) ||
    (g.example || '').toLowerCase().includes(q)
  );
}
