# hand-particles — PromoUPSA 2026

3000 partículas que forman el texto **PromoUPSA 2026** y reaccionan a tu mano en tiempo real.

## Correr

```bash
node server.js
```

Se abre solo en `http://localhost:8080`.  
Dale permiso de cámara al browser cuando lo pida.

## Stack

| Qué | Cómo |
|-----|------|
| Detección de mano | [MediaPipe Hands](https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js) |
| Cámara | [MediaPipe Camera Utils](https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js) |
| Partículas | Canvas API — vanilla JS |
| Servidor | Node.js `http` nativo |

Un solo archivo HTML, sin frameworks ni dependencias locales.

## Cómo funciona

1. Se renderea "PromoUPSA 2026" en un canvas offscreen y se muestrean los píxeles para asignar posiciones home a ~2250 partículas.
2. Cada partícula aplica un spring force hacia su home y fricción.
3. MediaPipe detecta los 21 landmarks de cada mano; se aplica repulsión radial que dispersa las partículas cercanas.
4. Al alejar la mano las partículas vuelven lentamente a reconstruir el texto.
5. El color de cada partícula se desplaza de azul/dorado a naranja/rojo según cuánto la perturba la mano.

## Requisitos

- Node.js (cualquier versión reciente)
- Chrome o Edge (recomendado)
- Webcam
