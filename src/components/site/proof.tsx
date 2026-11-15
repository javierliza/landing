"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Container, Split } from "./brand";

/** Testimonios publicados en proelmedtech.com. */
const TESTIMONIALS = [
  {
    quote:
      "Mediante Proel integramos la gestión de compra de medicamentos de alto costo en todas las delegaciones del interior del país.",
    who: "Ricardo Altamirano",
    org: "OSPIA",
  },
  {
    quote:
      "Proel es una herramienta de trabajo práctica y eficaz, que brinda transparencia en la gestión de compra. Indispensable en este siglo XXI para las organizaciones de la salud.",
    who: "Elizabeth Borja",
    org: "OSTEL",
  },
  {
    quote:
      "La última versión de Proel es muy interesante y rápida, sobre todo en la dispensación de medicamentos ante la ANMAT.",
    who: "Leopoldo Festino",
    org: "Farmacia Gran Pacífico",
  },
];

const INTERVAL = 7000;
const CTRL = "grid size-9 place-items-center rounded-[4px] transition-colors hover:bg-chip hover:text-ink";

/**
 * Clientes publicados en proelmedtech.com y leannec.com.
 * Para mostrar el logo en lugar del nombre: guardar el archivo en public/clients/ y completar `logo`.
 */
const CLIENTS: { name: string; logo?: string }[] = [
  { name: "OSPIA" },
  { name: "OSTEL" },
  { name: "OSFATUN" },
  { name: "OSPAT" },
  { name: "Farmacity" },
  { name: "OSPLAD" },
  { name: "Red Salud" },
  { name: "ANDAR" },
  { name: "OSDIPP" },
  { name: "Avantfar" },
  { name: "SETIA" },
  { name: "Farmacia Gran Pacífico" },
  { name: "OSPE" },
  { name: "OSPEC" },
  { name: "Cofarma" },
  { name: "Drofar" },
  { name: "Femani" },
  { name: "Italfarma" },
];
/**
 * Clientes en una sola línea que se desliza. Al pasar el cursor la fila se detiene,
 * el cliente señalado se resalta y los demás se atenúan.
 */
function ClientSlider() {
  return (
    <div className="marquee group/row overflow-hidden border-y border-line [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
      <div className="marquee-track flex w-max">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {CLIENTS.map((c) => (
              <li key={c.name} className="flex h-20 items-center md:h-24">
                <span className="group/item flex h-full cursor-default items-center px-7 transition-opacity duration-300 group-hover/row:opacity-30 hover:!opacity-100 md:px-10">
                  {c.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="max-h-9 w-auto object-contain opacity-70 mix-blend-multiply grayscale transition-[filter,opacity,transform] duration-300 group-hover/item:scale-110 group-hover/item:opacity-100 group-hover/item:grayscale-0"
                    />
                  ) : (
                    <span className="relative whitespace-nowrap text-xl font-semibold tracking-[-0.02em] text-slate transition-[color,transform] duration-300 after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 group-hover/item:scale-105 group-hover/item:text-ink group-hover/item:after:scale-x-100 md:text-2xl">
                      {c.name}
                    </span>
                  )}
                </span>
                <span aria-hidden className="size-1.5 bg-line-strong" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Clients() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false); // cursor o foco encima
  const [stopped, setStopped] = useState(false); // pausa elegida por la persona
  const n = TESTIMONIALS.length;
  const t = TESTIMONIALS[i];
  const auto = !reduced && !paused && !stopped;

  // Avance automático; se reinicia al cambiar de testimonio y se pausa con el cursor o el foco encima.
  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % n), INTERVAL);
    return () => window.clearTimeout(id);
  }, [auto, i, n]);

  return (
    <section
      id="clientes"
      className="bg-bg py-16 md:py-24"
    >
      <Split label="Clientes">
        <figure
          className={`relative overflow-hidden rounded-[6px] border border-line bg-white p-6 shadow-[0_24px_60px_-40px_rgb(0_0_0/.3)] sm:p-9 lg:p-12 ${paused || stopped ? "is-paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-grad-bar-primary" />
          <div className="lg:min-h-[12.5rem]" aria-live={stopped || reduced ? "polite" : "off"}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={i}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                className="text-balance text-[28px] font-semibold leading-[1.18] tracking-[-0.03em] sm:text-[36px] lg:text-[42px]"
              >
                “{t.quote}”
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line-strong pt-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figcaption
                key={i}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-base"
              >
                <span className="font-semibold">{t.who}</span>
                <span className="text-gray"> · {t.org}</span>
              </motion.figcaption>
            </AnimatePresence>

            {/* Controles compactos: segmentos finos con el avance, y pausa y flechas sin borde. */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((x, idx) => {
                  const on = idx === i;
                  return (
                    <button
                      key={x.org}
                      type="button"
                      aria-label={`Ver testimonio de ${x.org}`}
                      aria-current={on}
                      onClick={() => setI(idx)}
                      className="group flex h-8 items-center"
                    >
                      <span
                        className={`relative block h-0.5 overflow-hidden transition-all duration-300 ${on ? "w-10 bg-line-strong" : "w-5 bg-line-strong group-hover:bg-gray"}`}
                      >
                        {on && <span key={`${i}-${reduced}`} className={`absolute inset-0 bg-primary ${reduced ? "" : "auto-progress"}`} />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center text-gray">
                {!reduced && (
                  <button
                    type="button"
                    aria-pressed={stopped}
                    aria-label={stopped ? "Reanudar el avance automático de testimonios" : "Pausar el avance automático de testimonios"}
                    onClick={() => setStopped((v) => !v)}
                    className={CTRL}
                  >
                    {stopped ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
                  </button>
                )}
                <button type="button" aria-label="Testimonio anterior" onClick={() => setI((v) => (v - 1 + n) % n)} className={CTRL}>
                  <ArrowLeft className="size-4" />
                </button>
                <button type="button" aria-label="Testimonio siguiente" onClick={() => setI((v) => (v + 1) % n)} className={CTRL}>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </figure>
      </Split>

      <div className="mt-16 md:mt-20">
        <Container>
          <div className="reveal flex flex-wrap items-end justify-between gap-4 pb-6">
            <h3 className="text-2xl tracking-[-0.02em] sm:text-[28px]">Confían en nosotros</h3>
          </div>
        </Container>
        <ClientSlider />
      </div>
    </section>
  );
}
