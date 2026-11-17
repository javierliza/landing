"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Relieve de puntos: el arte de la portada, que se repite quieto en Contacto para cerrar la página.
 * Es una superficie de puntos cuadrados (el motivo de la marca) que nace apretada abajo a la izquierda y se abre
 * hacia arriba a la derecha ("de punta a punta"). Una ondulación lenta la recorre: las crestas se agrandan y se
 * aclaran, así que se lee como relieve. Se dibuja en un canvas con los colores de la paleta activa.
 */

/** Lienzo de referencia: la composición se piensa en 1440 × 800 y se escala a la sección. */
const VW = 1440;
const VH = 800;
const ROWS = 36;
const COLS = 230;
const SHADES = 16;

/** Posición horizontal y peso del arranque de cada columna, sobre la misma curva para todas las filas. */
const COL = Array.from({ length: COLS }, (_, i) => {
  // Más separadas hacia la derecha, donde la superficie está "cerca": con eso la trama queda pareja, casi cuadrada.
  const u = (i / (COLS - 1)) ** 1.3;
  const a = (1 - u) ** 3;
  const b = 3 * (1 - u) ** 2 * u;
  const c = 3 * (1 - u) * u ** 2;
  const d = u ** 3;
  return { u, x: a * -60 + b * 540 + c * 800 + d * 1500, start: a + b };
});

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

type Rgb = [number, number, number];

/** Lee un color de la paleta (variable CSS) como RGB, usando el propio canvas para interpretarlo. */
function readColor(ctx: CanvasRenderingContext2D, name: string, fallback: string): Rgb {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  ctx.fillStyle = fallback;
  ctx.fillStyle = value;
  const hex = String(ctx.fillStyle);
  if (!hex.startsWith("#")) return [111, 211, 199];
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
}

/** Escala de tonos de valle a cresta: primario claro → acento → blanco. */
function buildShades(ctx: CanvasRenderingContext2D): string[] {
  const low = readColor(ctx, "--color-primary-light", "#1f9690");
  const mid = readColor(ctx, "--color-accent", "#6fd3c7");
  const high: Rgb = [255, 255, 255];
  const mix = (p: Rgb, q: Rgb, t: number) => p.map((v, i) => Math.round(v + (q[i] - v) * t));
  return Array.from({ length: SHADES }, (_, i) => {
    const t = i / (SHADES - 1);
    const [r, g, b] = t < 0.6 ? mix(low, mid, t / 0.6) : mix(mid, high, (t - 0.6) / 0.4);
    return `rgb(${r} ${g} ${b})`;
  });
}

/**
 * @param animated  Ondula y se despliega al entrar (portada). Sin esto queda quieto (Contacto).
 */
export function DotRelief({ animated = false, className = "" }: { animated?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const moving = animated && !reduced;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let shades = buildShades(ctx);
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const started = performance.now();

    const draw = (now: number) => {
      const t = moving ? (now - started) / 1000 : 0;
      const reveal = moving ? Math.min(1, t / 2.4) : 1; // despliegue de izquierda a derecha al entrar
      // Encuadre: en escritorio cubre toda la sección; en móvil va arriba a la derecha, sobre el titular.
      const mobile = width < 768;
      const scale = mobile ? (height * 0.68) / VH : Math.max(width / VW, height / VH);
      const ox = mobile ? width - VW * scale : (width - VW * scale) / 2;
      const oy = mobile ? 0 : (height - VH * scale) / 2;

      ctx.clearRect(0, 0, width, height);
      for (let r = 0; r < ROWS; r++) {
        const v = r / (ROWS - 1);
        const sy = 772 - v * 84;
        const ey = 24 + v * 430;
        for (let i = 0; i < COLS; i++) {
          const { u, x, start } = COL[i];
          if (u > reveal) break;
          const fade = smooth(0.05, 0.42, u) * Math.min(1, (reveal - u) * 8);
          if (fade <= 0.01) continue;
          // Tres ondas cruzadas (una larga, una diagonal y una fina). De cada una se toma la altura y la pendiente:
          // la altura mueve y agranda el punto; la pendiente lo ilumina, como si la luz llegara de costado.
          const p1 = u * 7 - t * 0.5 + v * 3;
          const p2 = u * 3.1 - v * 5 + t * 0.3;
          const p3 = u * 13 + v * 9 - t * 0.7;
          const wave = Math.sin(p1) * 0.55 + Math.sin(p2) * 0.3 + Math.sin(p3) * 0.15;
          const slope = (Math.cos(p1) * 3.85 + Math.cos(p2) * 0.93 + Math.cos(p3) * 1.95) / 6.73;
          const crest = (wave + 1) / 2;
          const light = Math.min(1, Math.max(0, 0.5 - 0.62 * slope + 0.18 * wave));
          const px = ox + x * scale;
          const py = oy + (sy * start + ey * (1 - start) - wave * (4 + 46 * u)) * scale;
          if (px < -8 || px > width + 8 || py < -8 || py > height + 8) continue;
          const size = Math.max(1, (0.6 + 3.2 * u ** 1.5) * (0.65 + 0.85 * crest) * scale);
          ctx.globalAlpha = fade * (0.16 + 0.84 * light);
          ctx.fillStyle = shades[Math.min(SHADES - 1, Math.floor(light ** 1.4 * SHADES))];
          ctx.fillRect(px - size / 2, py - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      if (moving && visible) frame = requestAnimationFrame(loop);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      restart();
    };

    const sizes = new ResizeObserver(resize);
    sizes.observe(canvas);
    // Se detiene cuando la sección no está a la vista.
    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) restart();
    });
    view.observe(canvas);
    // Al cambiar de paleta se recalculan los tonos.
    const palette = new MutationObserver(() => {
      shades = buildShades(ctx);
      restart();
    });
    palette.observe(document.documentElement, { attributes: true, attributeFilter: ["data-palette"] });

    return () => {
      cancelAnimationFrame(frame);
      sizes.disconnect();
      view.disconnect();
      palette.disconnect();
    };
  }, [moving]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
