# hand-particles — PromoUPSA 2026

Experiencia interactiva de realidad aumentada para la feria de **Ingeniería de Sistemas UPSA**.  
Un solo archivo HTML — sin frameworks, sin dependencias locales.

## Correr

```bash
node server.js
```

Abre `http://localhost:8080` automáticamente. Permite el acceso a la cámara cuando el browser lo pida.

---

## Filtros disponibles

| # | Filtro | Descripción |
|---|--------|-------------|
| 1 | **Particles** | ~2600 partículas forman "PromoUPSA 2026"; la mano las dispersa con física de resorte |
| 2 | **Garden** | Planta central con flor que abre/cierra según la apertura de la mano (capullo → floración completa). Flores: Orquídea, Gerbera, Tajibo, Rosa |
| 3 | **Face** | HUD militar con esquinas estilo reconocimiento facial, scan line, ID aleatorio y coordenadas ficticias |
| 4 | **Two Hands** | Figuras geométricas entre ambas manos: círculo, constelación, ondas según posición relativa |
| 5 | **Binary** | Lluvia de código binario (0s y 1s) que se desvía al detectar la mano |
| 6 | **Circuit** | Trazos PCB generados desde los dedos con vias y snap a grilla |
| 7 | **Wireframe** | Malla triangulada 3D sobre la mano con scan line de escáner |
| 8 | **Sound Wave** | Ondas concéntricas desde la palma + formas de onda horizontales |
| 9 | **Hacker** | Comandos de terminal reales cayendo en lluvia; la mano activa "ACCESO CONCEDIDO" |
| 10 | **AI Scan** | Ciclo automático: escaneo facial → barras de análisis (lógica, creatividad…) → "COMPATIBILIDAD: 99%" |
| 11 | **Game** | Breakout retro a pantalla completa; el dedo índice controla el paddle. Botones Y/X/B/A sobre las puntas de los dedos, 3 vidas, ladrillos multicolor con glow |
| 12 | **Robot Arm** | Brazo industrial articulado con cinemática inversa 2D que sigue el movimiento de la mano |
| 13 | **DNA** | Doble hélice animada que se distorsiona por proximidad de la mano |
| 14 | **Network** | Nodos de red etiquetados (SERVER, API, DATABASE, CLOUD…) que se expanden desde la palma con paquetes de datos animados |

**Botón de cámara** (esquina superior derecha): alterna entre Color / B&W / Sin cámara.

---

## Stack

| Qué | Cómo |
|-----|------|
| Detección de mano | [MediaPipe Hands](https://cdn.jsdelivr.net/npm/@mediapipe/hands/) — CDN |
| Detección facial | [MediaPipe Face Detection](https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/) — CDN |
| Cámara | [MediaPipe Camera Utils](https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/) — CDN |
| Tipografía | [Space Grotesk + Inter](https://fonts.google.com/) — Google Fonts CDN |
| Renderizado | Canvas 2D API — vanilla JS |
| Servidor | Node.js `http` nativo |

---

## Decisiones de diseño

### Un solo archivo HTML
Todo el CSS y JS está embebido en `index.html`. No hay build step, no hay bundler, no hay node_modules. El proyecto se puede abrir directamente con `node server.js` o cualquier servidor HTTP estático.

### Sistema de colores
El color principal es el **verde militar UPSA** (`#5bb53a`). Se usa como único color de acento en toda la interfaz: logo, botones activos, glows de canvas, trazos de filtros, scan lines. El fondo es `#050508` (negro con tinte azul profundo) para máximo contraste.

### Tipografía
- **Space Grotesk 700** — logo PromoUPSA, headings. Carácter geométrico y tecnológico.
- **Inter 400/500/700** — botones, etiquetas, datos HUD. Máxima legibilidad en tamaños pequeños.

### CSS variables
Todos los tokens de diseño (colores, fuentes, transiciones) están en `:root` como variables CSS. Cambiar el color de acento es una sola línea.

### Glassmorphism
Los paneles de UI (barra inferior, toggle de cámara, subbar de flores) usan `backdrop-filter: blur()` + fondo semi-transparente para un look de vidrio esmerilado sobre la imagen de cámara.

### Canvas overlay
El canvas cubre toda la pantalla (`position: fixed; inset: 0`). El video es `display: none` y se dibuja en el canvas al inicio de cada frame con `ctx.scale(-1,1)` para el espejo. Los landmarks de MediaPipe se convierten a coordenadas de pantalla con `sx = (1 - lm.x) * W` para que coincidan con el video espejado.

---

## Requisitos

- Node.js (cualquier versión reciente)
- Chrome o Edge (recomendado — mejor soporte de `backdrop-filter` y Canvas API)
- Webcam
