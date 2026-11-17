"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { DotRelief } from "./dot-relief";

const TITLE = "Gestionamos tratamientos médicos de punta a punta";
const EASE = [0.2, 0.7, 0.2, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const words = TITLE.split(" ");
  const after = 0.15 + words.length * 0.06; // cuando termina de entrar el titular

  return (
    <section id="top" className="relative overflow-hidden bg-ink pt-[68px] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Relieve de puntos. En escritorio ocupa todo el fondo y se apaga hacia la izquierda y hacia abajo, para no
            pasar por detrás del texto; en móvil se encuadra arriba a la derecha, sobre el titular. */}
        <DotRelief animated className="hero-art absolute inset-0 size-full" />
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
