# Digital Marketing Quest

Juego web educativo para aprender el contenido íntegro del curso **Marketing Digital — Ciclo V (Universidad César Vallejo, 2026-I)**.

Cada sesión combina:
1. **Capítulo narrativo** con TINO, tu mentor, en formato visual novel.
2. **Mini-quiz flash** para fijar los datos clave.
3. **Quiz formal** con 6 mecánicas distintas.

Y al final, un **Boss Battle** cronometrado con preguntas de las 5 sesiones.

---

## Cómo jugar localmente

Como el juego usa módulos ES6, necesitas un servidor estático mínimo:

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node (con npx, sin instalar nada)
npx serve .

# Opción 3: PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

> **Importante:** abrir `index.html` con doble clic NO funciona porque los navegadores bloquean los módulos ES6 con el protocolo `file://`. Usa un servidor.

---

## Deploy a GitHub Pages

1. Crea un repositorio en GitHub y sube todo el contenido de esta carpeta a la rama `main`.
   ```bash
   git init
   git add .
   git commit -m "Digital Marketing Quest"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
   git push -u origin main
   ```
2. Ve a **Settings → Pages** del repositorio.
3. En **Source**, selecciona `Deploy from a branch`.
4. Selecciona la rama `main` y la carpeta `/ (root)`. Click **Save**.
5. Espera 1-2 minutos. Tu juego estará en `https://<tu-usuario>.github.io/<tu-repo>/`.

> El archivo `.nojekyll` evita que GitHub procese tus archivos con Jekyll.

---

## Estructura del proyecto

```
/
├── index.html              Entry point
├── 404.html                Fallback con redirect
├── .nojekyll               Desactiva Jekyll en GH Pages
├── README.md               Este archivo
└── assets/
    ├── css/                6 hojas de estilo
    └── js/
        ├── main.js         Bootstrap
        ├── core/           state, storage, router, audio
        ├── ui/             SVG icons, animaciones, componentes
        ├── data/           Contenido narrativo + quizzes (hardcodeado)
        ├── mechanics/      6 mecánicas de quiz
        └── screens/        Pantallas del juego
```

---

## Controles

- **Click / Tap**: avanzar escenas, responder.
- **Tab / Shift+Tab**: navegar opciones.
- **Enter / Space**: confirmar.
- **Esc**: cerrar modal.
- **Flechas ↑↓**: reordenar elementos en retos de tipo "ordenar".

---

## Contenido cubierto

| Sesión | Tema | Escenas | Retos |
|---|---|---|---|
| 1 | Definición + Transformación Digital | 18 | 12 |
| 2 | Análisis Competitivo + POEM | 18 | 27 |
| 3 | Consumidor Digital + Funnel + Sesgos | 20 | 38 |
| 3.5 | Era de la IA | 16 | 13 |
| 4 | Investigación + OBED | 18 | 25 |
| Boss | Mixto cronometrado | — | 15 |

**Total:** ~90 escenas narrativas + ~125 retos.

---

## Insignias desbloqueables

- 🏛️ Historiador Digital
- 🔍 Espía POEM
- 🧠 Lector de Mentes
- 🤖 Domador de IA
- 🛠️ Maestro de Herramientas
- 👑 CMO Digital (Boss perfecto)
- 🌟 Marathonista (jugar las 5 sesiones sin saltar)
- 🎯 Pro Memoria (todos los flash quiz perfectos)

---

## Créditos

Diseño pedagógico basado en los 5 PDFs del curso de Marketing Digital UCV 2026-I.
Mentor TINO inspirado en el formato YouTuber-experto contemporáneo.

Hecho con HTML, CSS y JavaScript vanilla. Cero dependencias externas.
