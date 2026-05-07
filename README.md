# hand-particles — PromoUPSA 2026

3000 partículas que forman el texto **PromoUPSA 2026** y reaccionan a tu mano en tiempo real usando MediaPipe Hands.

## Cómo correr

**Con Node.js** (recomendado):
```bash
node server.js
```

**Con Python**:
```bash
python server.py
```

Se abre automáticamente en `http://localhost:8080`.  
Necesitás una webcam y dar permiso de cámara en el navegador.

## Requisitos

- Node.js o Python 3.x
- Navegador moderno (Chrome / Edge recomendado)
- Webcam

## Tecnologías

- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands) — detección de mano en tiempo real
- Canvas API — sistema de partículas
- Python `http.server` — servidor local

## Cómo funciona

1. El canvas muestrea los píxeles del texto "PromoUPSA 2026" para asignar posiciones home a ~2100 partículas.
2. Cada partícula aplica un spring force hacia su home y fricción.
3. Cuando MediaPipe detecta landmarks de la mano, se aplica una fuerza de repulsión radial que dispersa las partículas.
4. Al alejar la mano, las partículas vuelven lentamente a reconstruir el texto.
