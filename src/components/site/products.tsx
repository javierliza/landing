"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import CloudBackground from "@/components/ruixen/cloud-background";
import { Container, Label, LINKS } from "./brand";

/** Un producto nuevo = un objeto más en este arreglo (una columna más sobre la plataforma). */
const PRODUCTS: {
  id: string;
  name: string;
  audience: string;
  description: string;
  includesTitle: string;
  includes: string[];
  cta: string;
  href: string;
  external: boolean;
  /** Etapas del circuito que cubre (índices de STAGES). A confirmar con Proel. */
  stages: number[];
  /** Ruta de la captura (por ejemplo "/products/leannec.png"). Sin valor se muestra el espacio reservado. */
  image?: string;
}[] = [
  {
    id: "rp",
    name: "RP Speciality",
    audience: "Para profesionales de la salud",
    description:
      "Todo lo necesario para la gestión médica, desde recetas digitales hasta historiales clínicos y comunicación con pacientes.",
    includesTitle: "Incluye",
    includes: ["Recetas digitales", "Órdenes médicas", "Formularios médicos", "Historiales clínicos"],
    cta: "Visitar RP Speciality",
    href: LINKS.rp,
    external: true,
    stages: [0],
  },
  {
    id: "leannec",
    name: "Leannec",
    audience: "Para obras sociales, prepagas y farmacias",
    description:
      "Gestión de tratamientos médicos integrada con ANMAT y la Superintendencia de Servicios de Salud: información clara, confiable y segura.",
    includesTitle: "Módulos",
    includes: ["Auditor", "Trazabilidad", "S.U.R.", "Compras", "Farmacias", "Mobile"],
    cta: "Visitar Leannec",
    href: LINKS.leannec,
    external: true,
    stages: [1, 2],
  },
  {
    id: "turbosurge",
    name: "TurboSurge",
    audience: "Para la gestión operativa en Surge",
    description: "Bot de automatización de gestión en Surge.",
    includesTitle: "",
    includes: [],
    cta: "Consultar por TurboSurge",
    href: "#contacto",
    external: false,
    stages: [3],
  },
];

function ProductLink({ p, className = "" }: { p: (typeof PRODUCTS)[number]; className?: string }) {
  return (
    <a
      href={p.href}
      {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex h-12 w-fit items-center gap-2 rounded-[4px] bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-accent ${className}`}
    >
      {p.cta}
      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
    </a>
  );
}

const STAGES = ["Receta", "Auditoría", "Dispensa", "Recupero"];
const OUTSIDE = ["ANMAT", "Superintendencia de Servicios de Salud", "Surge", "Sistemas del cliente"];

/**
 * Productos y plataforma en una sola pieza, contada como circuito: una línea con las etapas de la gestión
 * (la plataforma), y cada producto ubicado sobre el tramo que cubre. Al elegir un producto se ilumina su tramo
 * y se abre su detalle. Al pie, la base común y los organismos con los que conecta.
 */
export function Products() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(1);
  const p = PRODUCTS[active];

  return (
    <section id="productos" className="relative overflow-hidden bg-ink py-16 text-on-dark md:py-24">
      {!reduced && (
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25">
          <CloudBackground darkTheme resolutionScale={0.6} className="absolute inset-0" />
        </div>
      )}

      <Container className="relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <Label dark>Productos</Label>
            <h2 className="reveal mt-6 max-w-[18ch] text-balance text-[34px] leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[56px]">
              Tres productos, un solo circuito de gestión
            </h2>
          </div>
          <p className="reveal max-w-md text-lg leading-relaxed text-on-dark lg:col-span-5">
            Cada producto resuelve una etapa de la gestión. Todos comparten una misma base tecnológica y se conectan
            con los organismos y sistemas del sector.
          </p>
        </div>

        {/* Productos en una sola línea; cada botón nombra las etapas que cubre y, al elegirlo, se ilumina ese tramo del circuito. */}
        <div role="tablist" aria-label="Productos" className="mt-12 flex flex-wrap gap-2 md:mt-16 md:grid md:grid-cols-3 md:gap-3">
          {PRODUCTS.map((x, i) => {
            const on = active === i;
            return (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="producto-detalle"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`h-12 rounded-[4px] border px-4 text-left text-[15px] font-semibold transition-colors duration-300 md:flex md:h-14 md:items-center md:justify-between md:gap-4 md:px-5 md:text-lg ${
                  on ? "border-white bg-white text-ink" : "border-white/20 bg-ink-2 text-white hover:border-white/50"
                }`}
              >
                <span>{x.name}</span>
                <span className={`hidden text-sm font-medium lg:inline ${on ? "text-gray" : "text-on-dark-muted"}`}>
                  {x.stages.map((n) => STAGES[n]).join(" · ")}
                </span>
              </button>
            );
          })}
        </div>

        {/* El circuito: una línea con las etapas; se ilumina el tramo del producto elegido. */}
        <ol className="mt-5 grid grid-cols-4" aria-label="Etapas de la gestión">
          {STAGES.map((s, i) => {
            const lit = p.stages.includes(i);
            return (
              <li key={s} className="relative pt-[5px]">
                <span aria-hidden className={`block h-0.5 transition-colors duration-500 ${lit ? "bg-accent" : "bg-slate"}`} />
                <span
                  aria-hidden
                  className={`absolute left-1/2 top-0 size-3 -translate-x-1/2 transition-colors duration-500 ${lit ? "bg-accent" : "bg-slate"}`}
                />
                <span
                  className={`mt-4 block text-center text-[13px] font-medium transition-colors duration-500 sm:text-[15px] ${lit ? "text-white" : "text-on-dark-muted"}`}
                >
                  {s}
                  {lit && <span className="sr-only"> (cubierta por {p.name})</span>}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Detalle del producto elegido: panel translúcido. A la izquierda el texto; a la derecha la captura dentro de
            un marco de ventana que se sale por el borde inferior derecho del panel. Para cargarla, completar `image`
            en PRODUCTS; mientras tanto el marco muestra un espacio reservado. */}
        <article
          id="producto-detalle"
          role="tabpanel"
          key={p.id}
          className="rise relative mt-8 overflow-hidden rounded-[6px] border border-white/15 bg-white/[0.07] p-6 text-white backdrop-blur-md md:mt-10 md:p-9"
        >
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(255,255,255,0.6),rgba(255,255,255,0.1)_70%,transparent)]" />
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col justify-between gap-7 lg:col-span-5 lg:min-h-[360px]">
              <div>
                <p className="text-sm font-medium text-on-dark-muted">{p.audience}</p>
                <h3 className="mt-1 text-[28px] font-semibold tracking-[-0.025em] md:text-[40px]">{p.name}</h3>
                <p className="mt-4 max-w-[36ch] text-lg leading-snug text-on-dark md:text-xl">{p.description}</p>
                {p.includes.length > 0 && (
                  <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] font-medium text-white" aria-label={p.includesTitle}>
                    {p.includes.map((x) => (
                      <li key={x} className="flex items-center gap-2.5">
                        <span aria-hidden className="size-1.5 shrink-0 bg-accent" />
                        {x}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <ProductLink p={p} />
            </div>

            <div className="relative lg:col-span-7">
              <div className="overflow-hidden rounded-[6px] border border-white/20 bg-ink/70 shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)] lg:absolute lg:-bottom-9 lg:-right-9 lg:left-0 lg:top-0 lg:rounded-b-none lg:rounded-tr-none lg:border-b-0 lg:border-r-0">
                {/* Barra de la ventana */}
                <div aria-hidden className="flex h-9 items-center gap-1.5 border-b border-white/15 bg-white/[0.06] px-4">
                  <span className="size-2 bg-white/30" />
                  <span className="size-2 bg-white/30" />
                  <span className="size-2 bg-accent" />
                  <span className="ml-3 h-1.5 w-28 bg-white/15" />
                </div>
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={`Captura de ${p.name}`}
                    className="block aspect-[16/10] w-full object-cover object-left-top lg:aspect-auto lg:h-[calc(100%-2.25rem)]"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={`Espacio reservado: captura de ${p.name}`}
                    className="grid aspect-[16/10] w-full place-items-center lg:aspect-auto lg:h-[calc(100%-2.25rem)]"
                  >
                    <p className="px-6 text-center text-sm font-medium text-on-dark-muted">Captura de {p.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* La base común y el entorno, en una sola pieza translúcida: el turquesa de la plataforma se funde hacia la
            derecha (hacia abajo en móvil) con los organismos, sin división entre los dos bloques. */}
        <div className="reveal relative mt-3 overflow-hidden rounded-[6px] border border-white/10 bg-white/[0.04] backdrop-blur-md">
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(14,116,144,0.9)_0%,rgba(14,116,144,0.5)_30%,rgba(14,116,144,0.1)_60%,transparent_85%)] lg:bg-[linear-gradient(to_right,rgba(14,116,144,0.9)_0%,rgba(14,116,144,0.5)_26%,rgba(14,116,144,0.12)_50%,transparent_75%)]"
          />
          {/* Brillo fino en el borde superior */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(103,200,218,0.9),rgba(103,200,218,0.15)_60%,transparent)]" />

          <div className="relative grid lg:grid-cols-12">
            <div className="px-6 py-7 text-white lg:col-span-4 lg:px-9 lg:py-9">
              <p className="text-sm font-medium text-white/85">La base común</p>
              <p className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.025em] md:text-[34px]">Plataforma Proel</p>
              <p className="mt-3 max-w-[26ch] text-[15px] leading-snug text-white/90">
                Una misma base tecnológica en todo el circuito
              </p>
            </div>

            <div className="px-6 pb-7 pt-2 lg:col-span-8 lg:px-9 lg:py-9">
              <p className="text-sm font-medium text-on-dark">Conectada con</p>
              <div className="relative mt-5">
                {/* Línea que sale de la plataforma y se apaga hacia la derecha (solo escritorio) */}
                <span
                  aria-hidden
                  className="absolute -left-9 right-0 top-0 hidden h-px bg-[linear-gradient(to_right,rgba(103,200,218,0.9),rgba(103,200,218,0.25))] lg:block"
                />
                <ul className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 md:gap-x-6">
                  {OUTSIDE.map((o, i) => (
                    <li key={o}>
                      <div aria-hidden className="hidden lg:block">
                        <div className="relative ml-[5px] h-9 w-px bg-accent/50">
                          <span
                            className="flow-dot absolute -left-[3px] top-0 size-[7px] bg-white"
                            style={{ ["--d" as string]: "30px", animationDelay: `${0.3 + i * 0.45}s` }}
                          />
                        </div>
                      </div>
                      <span aria-hidden className="block size-3 bg-accent" />
                      <p className="mt-3 max-w-[16ch] text-[15px] font-semibold leading-snug text-white md:text-base">{o}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
