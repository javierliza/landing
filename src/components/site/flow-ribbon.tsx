"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Cinta de líneas de flujo: el arte de la portada, que se repite en Contacto para cerrar la página.
 * La cinta principal nace apretada abajo a la izquierda y se abre hacia arriba a la derecha ("de punta a punta");
 * la secundaria, más tenue, la cruza por detrás. La opacidad varía de línea a línea para darle brillo de superficie.
 */
const ribbon = (n: number, d: (t: number) => string, base: number) =>
  Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    // Redondeado: el seno puede diferir en el último decimal entre servidor y navegador.
    return { d: d(t), o: Math.round(base * (0.45 + 0.55 * Math.abs(Math.sin(t * Math.PI * 1.5))) * 100) / 100 };
  });
const MAIN = ribbon(
  44,
  (t) => {
    const sy = Math.round(772 - t * 84);
    const ey = Math.round(24 + t * 430);
    return `M -60 ${sy} C 540 ${sy}, 800 ${ey}, 1500 ${ey}`;
  },
  1,
);
const BACK = ribbon(
  22,
  (t) => {
    const sy = Math.round(690 - t * 150);
    const ey = Math.round(380 + t * 240);
    return `M -60 ${sy} C 520 ${sy - 60}, 860 ${ey + 80}, 1500 ${ey}`;
  },
  0.45,
);
/** Largo del destello y de su punta brillante, como fracción de la línea. */
const TAIL = 0.04;
const TIP = 0.006;
/** Destellos que recorren algunas líneas de la cinta principal: [línea, duración (s), inicio (s)]. */
const PULSES: [number, number, number][] = [
  [6, 9, 2.6],
  [20, 12, 5],
  [35, 10, 8],
];

/**
 * @param id        Prefijo de los degradés del SVG (único por uso en la página).
 * @param animated  Las líneas se dibujan al entrar y llevan destellos (portada). Sin esto, la cinta queda quieta.
 */
export function FlowRibbon({ id, animated = false, className = "" }: { id: string; animated?: boolean; className?: string }) {
  const reduced = useReducedMotion();
  const draw = animated && !reduced;
  // Sin `vector-effect: non-scaling-stroke`: con él, el trazo punteado que usa la animación se mide en píxeles de
  // pantalla y en monitores anchos las líneas quedaban cortadas antes del borde.
  const line = (f: { d: string; o: number }, key: string, stroke: string, width: number, delay: number, duration: number) => (
    <motion.path
      key={key}
      d={f.d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeOpacity={f.o}
      initial={draw ? { pathLength: 0 } : false}
      animate={{ pathLength: 1 }}
      transition={{ duration, delay, ease: EASE }}
    />
  );

  return (
    <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden className={className}>
      <defs>
        <linearGradient id={`${id}-linea`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0" style={{ stopColor: "var(--color-primary)", stopOpacity: 0 }} />
          <stop offset="0.4" style={{ stopColor: "var(--color-primary-light)", stopOpacity: 0.85 }} />
          <stop offset="1" style={{ stopColor: "var(--color-accent)" }} />
        </linearGradient>
        <linearGradient id={`${id}-fondo`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0.2" style={{ stopColor: "var(--color-primary)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--color-primary-light)" }} />
        </linearGradient>
        <filter id={`${id}-halo`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Halo: unas pocas líneas gruesas y desenfocadas que le dan luz a la cinta */}
      <g filter={`url(#${id}-halo)`} opacity={0.5}>
        {MAIN.filter((_, i) => i % 9 === 4).map((f, i) => (
          <path key={i} d={f.d} fill="none" stroke={`url(#${id}-linea)`} strokeWidth={10} />
        ))}
      </g>

      {BACK.map((f, i) => line(f, `b${i}`, `url(#${id}-fondo)`, 1, 0.5 + i * 0.04, 2.4))}
      {MAIN.map((f, i) => line(f, `m${i}`, `url(#${id}-linea)`, i % 11 === 0 ? 1.6 : 1, 0.3 + i * 0.03, 2.2))}
      {draw &&
        PULSES.map(([n, dur, begin]) => {
          // Un tramo corto del color de la línea y, en su punta, un punto de luz más brillante. Los dos avanzan juntos.
          const common = { d: MAIN[n].d, pathLength: 1, fill: "none", strokeLinecap: "round" as const };
          const move = (from: number, to: number) => (
            <animate attributeName="stroke-dashoffset" from={from} to={to} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
          );
          return (
            <g key={n}>
              <path {...common} className="stroke-accent" strokeWidth={2.2} strokeDasharray={`${TAIL} 1`} strokeDashoffset={1 + TAIL}>
                {move(1 + TAIL, 0)}
              </path>
              <path {...common} className="stroke-white" strokeWidth={3} strokeDasharray={`${TIP} ${1 + TAIL - TIP}`} strokeDashoffset={1 + TIP}>
                {move(1 + TIP, TIP - TAIL)}
              </path>
            </g>
          );
        })}
    </svg>
  );
}
