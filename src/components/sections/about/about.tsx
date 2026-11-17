"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Split } from "@/components/ui/split";

const SENTENCE =
  "Desde 2009 gestionamos 10.000 tratamientos médicos por mes, con 270.000 usuarios en la aplicación mobile y 320 farmacias conectadas en todo el país.";
const ACCENT = new Set(["10.000", "270.000", "320"]);

const MILESTONES = [
  ["2009", "Primera plataforma", "Nace la gestión online de tratamientos médicos de alto costo."],
  ["2011", "Leannec", "La plataforma se consolida como producto."],
  ["2016", "Suite completa", "Trazabilidad, compras, recupero, mobile y auditor."],
  ["Hoy", "Ecosistema Proel", "Se suman RP Speciality, TurboSurge y Onco-Office."],
];

/** Cada palabra pasa de tenue a plena según el avance del scroll. */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={ACCENT.has(children) ? "whitespace-nowrap text-primary" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

export function About() {
  const reduced = useReducedMotion();
  const words = SENTENCE.split(" ");

  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: textProgress } = useScroll({ target: textRef, offset: ["start 0.9", "end 0.55"] });

  const lineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress: lineProgress } = useScroll({ target: lineRef, offset: ["start 0.9", "start 0.4"] });
  const [reached, setReached] = useState(0);
  useMotionValueEvent(lineProgress, "change", (v) => setReached(Math.ceil(v * MILESTONES.length)));
  const lit = reduced ? MILESTONES.length : reached;

  return (
    <section id="nosotros" className="bg-white py-16 md:py-24">
      <Split label="Nosotros">
        <p ref={textRef} className="text-[30px] font-semibold leading-[1.14] tracking-[-0.03em] sm:text-[44px] lg:text-[52px]">
          {reduced
            ? SENTENCE
            : words.map((w, i) => {
                const start = i / words.length;
                return (
                  <Word key={i} progress={textProgress} range={[start, Math.min(1, start + 3 / words.length)]}>
                    {w}
                  </Word>
                );
              })}
        </p>
        <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-slate">
          Somos un equipo especializado en el mercado de la salud. Nuestra misión es asegurar, con conocimiento,
          tecnología e integración, la calidad y la costo-eficiencia de los servicios médicos asistenciales,
          cumpliendo la normativa vigente.
        </p>

        {/* Trayectoria: una línea continua con nodos cuadrados que se va llenando al bajar. */}
        <ol ref={lineRef} className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {MILESTONES.map(([y, t, d], i) => {
            const on = i < lit;
            const last = i === MILESTONES.length - 1;
            return (
              <li key={y} className="relative pt-10">
                <span aria-hidden className={`absolute left-0 top-[5px] h-0.5 bg-line-strong ${last ? "right-0" : "right-0 lg:-right-8"}`} />
                <span
                  aria-hidden
                  className={`absolute left-0 top-[5px] h-0.5 origin-left bg-primary transition-transform duration-700 ease-out ${last ? "right-0" : "right-0 lg:-right-8"} ${on ? "scale-x-100" : "scale-x-0"}`}
                />
                <span aria-hidden className={`absolute left-0 top-0 size-3 transition-colors duration-500 ${on ? "bg-primary" : "bg-line-strong"}`} />
                <p
                  className={`text-[40px] font-semibold leading-none tracking-[-0.03em] transition-colors duration-500 [font-variant-numeric:tabular-nums] ${
                    on ? "text-ink" : "text-line-strong"
                  }`}
                >
                  {y}
                </p>
                <div className={`transition-opacity duration-700 ${on ? "opacity-100" : "opacity-40"}`}>
                  <p className="mt-5 text-base font-semibold">{t}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-gray">{d}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Split>
    </section>
  );
}
