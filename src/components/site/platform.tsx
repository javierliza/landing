"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import CloudBackground from "@/components/ruixen/cloud-background";
import { Container, Label } from "./brand";

const PRODUCTS = ["RP Speciality", "Leannec", "TurboSurge"];
const OUTSIDE = ["ANMAT", "Superintendencia de Servicios de Salud", "Surge", "Sistemas del cliente"];
const STEPS = [
  "Cada producto resuelve una etapa de la gestión.",
  "Todos comparten una misma base tecnológica.",
  "Y se conectan con los organismos y sistemas del sector.",
];

/** Conectores verticales: la línea crece al mostrarse y un punto la recorre. */
function Connectors({ cols, show, offset = 0 }: { cols: number; show: boolean; offset?: number }) {
  return (
    <div aria-hidden className="grid h-14" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className={`relative justify-self-center ${i > 0 ? "hidden md:block" : ""}`}>
          <span
            className={`absolute inset-y-0 left-1/2 w-px origin-top bg-slate transition-transform duration-700 ease-out ${show ? "scale-y-100" : "scale-y-0"}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          />
          {show && (
            <span
              className="flow-dot absolute -left-[3px] top-0 size-[7px] bg-accent"
              style={{ ["--d" as string]: "52px", animationDelay: `${0.7 + ((i + offset) % 4) * 0.5}s` }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function Platform() {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLElement>(null);
  const [pin, setPin] = useState(false);
  const [stage, setStage] = useState(0);

  // La secuencia fijada solo se usa en pantallas amplias y sin reducción de movimiento.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (min-height: 700px)");
    const on = () => setPin(mq.matches && !reduced);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [reduced]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setStage(v < 0.28 ? 0 : v < 0.62 ? 1 : 2));

  const at = (level: number) => !pin || stage >= level;
  const layer = (level: number) =>
    `transition-[opacity,transform] duration-700 ease-out ${at(level) ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"}`;

  return (
    <section id="plataforma" ref={wrap} className="bg-ink text-on-dark" style={pin ? { height: "175vh" } : undefined}>
      <div className={pin ? "sticky top-[68px] flex h-[calc(100svh-68px)] items-center overflow-hidden" : "relative overflow-hidden py-16 md:py-24"}>
        {/* Fondo animado (bloque Cloud Background de Ruixen) en grafito y turquesa, muy tenue. */}
        {!reduced && (
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
            <CloudBackground darkTheme resolutionScale={0.6} className="absolute inset-0" />
          </div>
        )}
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <div className="lg:col-span-7">
              <Label dark>Plataforma</Label>
              <h2 className="mt-6 max-w-[18ch] text-balance text-[34px] leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
                Una misma plataforma detrás de cada producto
              </h2>
            </div>
            <ol className="lg:col-span-5">
              {STEPS.map((s, i) => {
                const on = pin ? stage === i : true;
                return (
                  <li
                    key={s}
                    className={`flex gap-4 border-t py-3 text-[15px] leading-snug transition-colors duration-500 ${
                      on ? "border-accent text-white" : "border-slate text-on-dark-muted/60"
                    }`}
                  >
                    <span className="[font-variant-numeric:tabular-nums]">{i + 1}</span>
                    {s}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-10 md:mt-14">
            <div className="grid gap-2 md:grid-cols-3">
              {PRODUCTS.map((p) => (
                <div key={p} className="rounded-[4px] border border-slate px-5 py-4 text-center text-lg font-semibold text-white">
                  {p}
                </div>
              ))}
            </div>

            <Connectors cols={3} show={at(1)} />

            <div className={layer(1)}>
              <div className="rounded-[4px] bg-primary px-6 py-6 text-center text-2xl font-semibold tracking-[-0.02em] text-white">
                Plataforma Proel
              </div>
            </div>

            <Connectors cols={4} show={at(2)} offset={2} />

            <div className={`grid gap-2 sm:grid-cols-2 md:grid-cols-4 ${layer(2)}`}>
              {OUTSIDE.map((o) => (
                <div key={o} className="flex items-center justify-center rounded-[4px] border border-slate px-4 py-4 text-center text-[15px] font-medium text-on-dark">
                  {o}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
