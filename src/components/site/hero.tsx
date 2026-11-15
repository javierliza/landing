"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "./brand";

const TITLE = "Gestionamos tratamientos médicos de punta a punta";
const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Haz de curvas del fondo: salen juntas desde abajo a la izquierda y se abren en abanico hacia la derecha. */
const FLOW = Array.from({ length: 18 }, (_, i) => {
  const sy = 770 - i * 5; // arranque: apretadas
  const ey = 30 + i * 36; // llegada: abiertas
  return { d: `M -40 ${sy} C 560 ${sy}, 800 ${ey}, 1480 ${ey}`, o: 1 - (i % 5) * 0.1 };
});
/** Puntos que recorren algunas líneas: [línea, duración (s), inicio (s), color]. */
const DOTS: [number, number, number, string][] = [
  [3, 11, 1.5, "#ffffff"],
  [9, 14, 4, "#67C8DA"],
  [15, 12, 7.5, "#ffffff"],
];

export function Hero() {
  const reduced = useReducedMotion();
  const words = TITLE.split(" ");
  const after = 0.15 + words.length * 0.06; // cuando termina de entrar el titular

  return (
    <section id="top" className="relative overflow-hidden bg-ink pt-[68px] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Líneas de flujo: un haz de curvas finas que nace abajo a la izquierda y se abre hacia arriba a la derecha
            ("de punta a punta"), con unos puntos cuadrados que las recorren. Se apaga hacia la izquierda (máscara). */}
        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full opacity-60 [mask-image:linear-gradient(to_right,transparent_2%,rgba(0,0,0,0.35)_30%,rgba(0,0,0,0.85)_60%,#000_100%)] md:opacity-100"
        >
          {FLOW.map((f, i) => (
            <motion.path
              key={i}
              id={`flow-${i}`}
              d={f.d}
              fill="none"
              stroke={i % 3 === 0 ? "#67C8DA" : "#1A93B3"}
              strokeWidth={i % 3 === 0 ? 2 : 1.4}
              strokeOpacity={f.o}
              vectorEffect="non-scaling-stroke"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 0.3 + i * 0.06, ease: EASE }}
            />
          ))}
          {!reduced &&
            DOTS.map(([line, dur, begin, fill]) => (
              <rect key={line} x="-4" y="-4" width="8" height="8" fill={fill}>
                <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" calcMode="linear">
                  <mpath href={`#flow-${line}`} />
                </animateMotion>
              </rect>
            ))}
        </svg>
      </div>

      <Container className="relative flex min-h-[calc(100svh-68px)] flex-col justify-end pb-10 pt-16 md:pb-14">
        <h1 aria-label={TITLE} className="max-w-[17ch] text-[42px] leading-[1.04] tracking-[-0.035em] sm:text-[68px] lg:text-[92px]">
          {words.map((w, i) => (
            <span key={i} aria-hidden className="-mb-[0.14em] mr-[0.24em] inline-block overflow-hidden pb-[0.14em] align-bottom">
              <motion.span
                className="inline-block"
                initial={reduced ? false : { y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: EASE }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          aria-hidden
          className="mt-12 h-px origin-left bg-white/70 md:mt-16"
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: after, ease: EASE }}
        />

        <motion.div
          className="grid gap-y-6 pt-6 lg:grid-cols-12 lg:gap-x-10"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: after + 0.35, ease: EASE }}
        >
          <p className="text-sm font-medium text-on-dark-muted lg:col-span-3">
            Proel Medical Technologies
            <span className="block">Argentina, desde 2009</span>
          </p>
          <div className="lg:col-span-7 lg:col-start-5">
            <p className="max-w-2xl text-xl leading-[1.45] text-on-dark sm:text-2xl">
              Software que conecta a obras sociales, prestadores, farmacias y profesionales: de la receta a la
              auditoría, la dispensa y el recupero.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contacto"
                className="inline-flex h-12 items-center rounded-[4px] bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-accent"
              >
                Pedí una demo
              </a>
              <a
                href="#productos"
                className="inline-flex h-12 items-center rounded-[4px] border border-white/40 px-6 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Conocé los productos
              </a>
            </div>
          </div>
          <a
            href="#nosotros"
            aria-label="Bajar a la sección Nosotros"
            className="hidden items-end justify-end lg:col-span-1 lg:flex"
          >
            <span className="relative block h-12 w-px bg-slate">
              <span className="cue absolute inset-0 bg-accent" />
            </span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
