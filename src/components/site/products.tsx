"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
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
  /** Etapas de la plataforma que cubre (índices de STAGES). A confirmar con Proel. */
  stages: number[];
  /** Conexiones externas con las que se vincula (índices de OUTSIDE), además de las etapas. */
  conns?: number[];
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
    conns: [0], // Validador
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
    conns: [1, 2, 3], // ANMAT, SSS, Sistemas del cliente
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
    conns: [4], // Surge
  },
];

type Cta = { cta: string; href: string; external: boolean };

function ProductLink({ p }: { p: Cta }) {
  return (
    <a
      href={p.href}
      {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex h-12 w-fit items-center gap-2 rounded-[4px] bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-accent"
    >
      {p.cta}
      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
    </a>
  );
}

const STAGES = ["Receta", "Auditoría", "Dispensa", "Recupero"];
const OUTSIDE = ["Validador", "ANMAT", "Superintendencia de Servicios de Salud", "Sistemas del cliente", "Surge"];
/** Nombres cortos para dibujar sobre la capa de conexiones (el nombre completo va en el detalle). */
const OUTSIDE_SHORT = ["Validador", "ANMAT", "SSS", "Clientes", "Surge"];

/** Las otras dos capas, que se eligen igual que un producto. */
const LAYERS = [
  {
    audience: "La base común",
    name: "Plataforma Proel",
    description: "Una misma base tecnológica sostiene todo el circuito de gestión, de la receta al recupero.",
    listTitle: "Etapas de la gestión",
    items: STAGES,
  },
  {
    audience: "El entorno",
    name: "Conectada con",
    description: "La plataforma se integra con los organismos y sistemas con los que trabaja el sector.",
    listTitle: "Se integra con",
    items: OUTSIDE,
  },
];
const DEMO: Cta = { cta: "Pedí una demo", href: "#contacto", external: false };

/* ── Geometría de la ilustración (isométrica 2:1) ── */
const W = 560;
const H = 520;
const CX = 372; // eje de las capas (desplazado a la derecha para dejar lugar a los rótulos)
const HALF = 90; // medio lado de cada capa, en su propio plano
const THICK = 14;
const LAYER_Y = [100, 250, 400]; // productos, plataforma, conexiones
const TILE_X = [260, 372, 484]; // un mosaico por producto
const NODE_X = [243, 329, 415, 501]; // etapas de la plataforma
const CONN_X = [232, 302, 372, 442, 512]; // conexiones
const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
/** Lleva el plano de una capa (u, v) a la pantalla: todo lo dibujado adentro queda "acostado" sobre la capa. */
const ISO = "matrix(1 0.5 -1 0.5 0 0)";
/** Punto del plano que en pantalla queda `dx` a la derecha del centro de la capa, a su misma altura. */
const onPlane = (dx: number) => ({ u: dx / 2, v: -dx / 2 });

/**
 * Punto de la plataforma del que sale la línea hacia la conexión `c`: el centro del tramo de etapas del producto
 * que la usa (sus etapas ya están unidas entre sí sobre la plataforma) o, si ninguno la usa, la etapa más cercana.
 */
function connOrigin(c: number) {
  const owner = PRODUCTS.find((x) => x.conns?.includes(c));
  if (owner) return owner.stages.reduce((sum, n) => sum + NODE_X[n], 0) / owner.stages.length;
  return NODE_X.reduce((a, b) => (Math.abs(b - CONN_X[c]) < Math.abs(a - CONN_X[c]) ? b : a));
}

type Tone = "vidrio" | "plataforma" | "mosaico" | "activo";

/** Placa isométrica con espesor y esquinas redondeadas. Los hijos se dibujan sobre su cara superior. */
function Plate({
  x,
  y,
  half,
  rx,
  t,
  tone,
  edge,
  children,
}: {
  x: number;
  y: number;
  half: number;
  rx: number;
  t: number;
  tone: Tone;
  edge: string;
  children?: React.ReactNode;
}) {
  const xr = 2 * half - rx * (2 - Math.SQRT2); // extremo horizontal de la placa (por el redondeo)
  const face = { x: -half, y: -half, width: 2 * half, height: 2 * half, rx };
  const sides = (fill: string) => (
    <g style={{ fill }}>
      <rect {...face} transform={`translate(0 ${t}) ${ISO}`} />
      <rect x={-xr} y={0} width={2 * xr} height={t} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      {sides(`var(--p-${tone}-izq)`)}
      <g clipPath="url(#capa-mitad-der)">{sides(`var(--p-${tone}-der)`)}</g>
      <rect {...face} transform={ISO} fill={`url(#capa-${tone})`} className={edge} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <g transform={ISO}>{children}</g>
    </g>
  );
}

/**
 * Dibujo de cada mosaico: receta, verificación y automatización. Van sobre la placa pero girados 45° en su plano,
 * así quedan derechos hacia quien mira (acostados, sin torcerse).
 */
const GLYPHS = [
  <g key="rp">
    <rect x={-12} y={-10} width={24} height={4} rx={2} />
    <rect x={-12} y={-2} width={24} height={4} rx={2} />
    <rect x={-12} y={6} width={14} height={4} rx={2} />
  </g>,
  <path key="leannec" d="M-11 0 L-4 8 L11 -8" fill="none" stroke="currentColor" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />,
  <path key="turbo" d="M3 -14 L-9 2 H-1 L-3 14 L9 -2 H1 Z" />,
];

/** Línea entre capas; si está activa lleva un pulso de luz que la recorre. */
function Beam({ x1, y1, x2, y2, on, pulse, delay = 0 }: { x1: number; y1: number; x2: number; y2: number; on: boolean; pulse: boolean; delay?: number }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className={on ? "stroke-accent" : "stroke-white/20"} strokeWidth={on ? 1.5 : 1} vectorEffect="non-scaling-stroke" />
      {on && pulse && (
        <circle r={2.5} className="fill-white">
          <animateMotion dur="1.6s" begin={`${delay}s`} repeatCount="indefinite" path={`M${x1} ${y1} L${x2} ${y2}`} />
        </circle>
      )}
    </>
  );
}

/**
 * Productos y plataforma como una vista por capas: tres planos isométricos apilados (productos, plataforma,
 * conexiones). Cada producto es un mosaico en la capa superior; al elegirlo se levanta y unos haces bajan hasta
 * las etapas de la plataforma que cubre. Las capas de abajo se eligen igual y abren su propio detalle.
 */
export function Products() {
  const reduced = useReducedMotion();
  // 0-2: producto · 3: plataforma · 4: conexiones
  const [sel, setSel] = useState(1);
  const product = sel < 3 ? PRODUCTS[sel] : null;
  const layer = sel >= 3 ? LAYERS[sel - 3] : null;
  const activeLayer = sel < 3 ? 0 : sel - 2; // capa resaltada en la ilustración
  const litStages = product ? product.stages : sel === 3 ? [0, 1, 2, 3] : [];
  const litConn = sel === 4 ? OUTSIDE.map((_, i) => i) : (product?.conns ?? []);

  const tab = (i: number, on: boolean) => ({
    role: "tab" as const,
    "aria-selected": on,
    "aria-controls": "capa-detalle",
    onClick: () => setSel(i),
  });

  return (
    <section id="productos" className="relative overflow-hidden bg-ink py-16 text-on-dark md:py-24">
      <Container className="relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <Label dark>Productos</Label>
            <h2 className="reveal mt-6 max-w-[18ch] text-balance text-[34px] leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[56px]">
              Tres productos, una sola plataforma
            </h2>
          </div>
          <p className="reveal max-w-md text-lg leading-relaxed text-on-dark lg:col-span-5">
            Cada producto resuelve una etapa de la gestión. Todos se apoyan en una misma base tecnológica y se
            conectan con los organismos y sistemas del sector.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-stretch lg:gap-x-10">
          {/* Vista por capas */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto w-full max-w-[680px] lg:mx-0" style={{ aspectRatio: `${W} / ${H}` }}>
              {/* Luz quieta detrás de la pila */}
              <div aria-hidden className="bg-glow-stack pointer-events-none absolute -inset-[14%]" />
              <svg viewBox={`0 0 ${W} ${H}`} aria-hidden className="capas absolute inset-0 size-full overflow-visible">
                <defs>
                  {/* Caras superiores: más claras al fondo, más oscuras al frente */}
                  {(
                    [
                      ["vidrio", "var(--p-vidrio-a)", "var(--p-vidrio-b)"],
                      ["plataforma", "var(--color-primary-light)", "var(--color-primary-dark)"],
                      ["mosaico", "var(--p-mosaico-a)", "var(--p-mosaico-b)"],
                      ["activo", "var(--color-accent)", "var(--color-primary-light)"],
                    ] as const
                  ).map(([id, from, to]) => (
                    <linearGradient key={id} id={`capa-${id}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" style={{ stopColor: from }} />
                      <stop offset="1" style={{ stopColor: to }} />
                    </linearGradient>
                  ))}
                  <pattern id="capa-puntos" width="15" height="15" patternUnits="userSpaceOnUse">
                    <circle cx="7.5" cy="7.5" r="0.9" className="fill-white" />
                  </pattern>
                  <clipPath id="capa-mitad-der">
                    <rect x="0" y="-300" width="400" height="600" />
                  </clipPath>
                  <filter id="capa-difuso" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="9" />
                  </filter>
                </defs>

                {/* Resplandor bajo la pila */}
                <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} rx={12} transform={`translate(${CX} ${LAYER_Y[2] + 52}) ${ISO}`} className="fill-primary opacity-40" filter="url(#capa-difuso)" />

                {/* Capa 3: conexiones */}
                <Plate x={CX} y={LAYER_Y[2]} half={HALF} rx={12} t={THICK} tone="vidrio" edge={activeLayer === 2 ? "stroke-accent" : "stroke-white/25"}>
                  <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} fill="url(#capa-puntos)" opacity={0.18} />
                  {CONN_X.map((x, n) => {
                    const { u, v } = onPlane(x - CX);
                    const lit = litConn.includes(n);
                    return (
                      <g key={n}>
                        <circle cx={u} cy={v} r={9} fill="none" className={`transition-[stroke] duration-500 ${lit ? "stroke-accent/60" : "stroke-white/15"}`} strokeWidth={1} vectorEffect="non-scaling-stroke" />
                        <circle cx={u} cy={v} r={4.5} className={`transition-[fill] duration-500 ${lit ? "fill-accent" : "fill-white/35"}`} />
                      </g>
                    );
                  })}
                </Plate>
                {/* Sombra de la plataforma y enlaces hacia las conexiones (salen por debajo de la capa 2) */}
                <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} rx={12} transform={`translate(${CX} ${LAYER_Y[1] + 70}) scale(0.92) ${ISO}`} className="fill-black opacity-30" filter="url(#capa-difuso)" />
                {OUTSIDE.map((_, c) => {
                  // Cada conexión sale siempre del mismo punto, esté o no elegido su producto, para que la línea no
                  // cambie de inclinación al encenderse.
                  const on = sel === 4 || !!product?.conns?.includes(c);
                  return <Beam key={`${c}-${on ? sel : "r"}`} x1={connOrigin(c)} y1={LAYER_Y[1] + 4} x2={CONN_X[c]} y2={LAYER_Y[2] - 3} on={on} pulse={on && !reduced} delay={0.5} />;
                })}

                {/* Capa 2: plataforma, con el recorrido de etapas */}
                <Plate x={CX} y={LAYER_Y[1]} half={HALF} rx={12} t={THICK} tone="plataforma" edge={activeLayer === 1 ? "stroke-white" : "stroke-accent/70"}>
                  <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} fill="url(#capa-puntos)" opacity={0.3} />
                  {(() => {
                    const a = onPlane(NODE_X[0] - CX);
                    const b = onPlane(NODE_X[3] - CX);
                    const lo = onPlane(NODE_X[Math.min(...litStages, 3)] - CX);
                    const hi = onPlane(NODE_X[Math.max(...litStages, 0)] - CX);
                    return (
                      <>
                        <line x1={a.u} y1={a.v} x2={b.u} y2={b.v} className="stroke-white/30" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                        {litStages.length > 1 && <line x1={lo.u} y1={lo.v} x2={hi.u} y2={hi.v} className="stroke-white" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />}
                      </>
                    );
                  })()}
                  {NODE_X.map((x, n) => {
                    const { u, v } = onPlane(x - CX);
                    const lit = litStages.includes(n);
                    return (
                      <g key={n}>
                        <rect x={u - 9} y={v - 9} width={18} height={18} rx={4} fill="none" className={`transition-[stroke] duration-500 ${lit ? "stroke-white/70" : "stroke-white/0"}`} strokeWidth={1} vectorEffect="non-scaling-stroke" />
                        <rect x={u - 5} y={v - 5} width={10} height={10} rx={2} className={`transition-[fill] duration-500 ${lit ? "fill-white" : "fill-white/40"}`} />
                      </g>
                    );
                  })}
                </Plate>

                {/* Sombra de la capa de productos y haces hacia las etapas (salen por debajo de la capa 1) */}
                <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} rx={12} transform={`translate(${CX} ${LAYER_Y[0] + 70}) scale(0.92) ${ISO}`} className="fill-black opacity-30" filter="url(#capa-difuso)" />
                {product &&
                  product.stages.map((n, k) => (
                    <Beam key={`${product.id}-${n}`} x1={TILE_X[sel]} y1={LAYER_Y[0] + 10} x2={NODE_X[n]} y2={LAYER_Y[1] - 3} on pulse={!reduced} delay={k * 0.3} />
                  ))}

                {/* Capa 1: productos */}
                <Plate x={CX} y={LAYER_Y[0]} half={HALF} rx={12} t={THICK} tone="vidrio" edge={activeLayer === 0 ? "stroke-accent" : "stroke-white/25"}>
                  <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} fill="url(#capa-puntos)" opacity={0.18} />
                  {product && (
                    <rect
                      key={product.id}
                      x={onPlane(TILE_X[sel] - CX).u - 25}
                      y={onPlane(TILE_X[sel] - CX).v - 25}
                      width={50}
                      height={50}
                      rx={6}
                      className="rise fill-accent opacity-50"
                      filter="url(#capa-difuso)"
                    />
                  )}
                </Plate>
                {PRODUCTS.map((x, i) => {
                  const on = sel === i;
                  return (
                    <g key={x.id} style={{ transform: `translateY(${on ? -16 : 0}px)`, transition: "transform .5s cubic-bezier(.2,.7,.2,1)" }}>
                      <Plate x={TILE_X[i]} y={LAYER_Y[0]} half={25} rx={6} t={6} tone={on ? "activo" : "mosaico"} edge={on ? "stroke-white/70" : "stroke-white/30"}>
                        <g transform="rotate(-45)" className={on ? "fill-ink text-ink" : "fill-white/60 text-white/60"}>
                          {GLYPHS[i]}
                        </g>
                      </Plate>
                    </g>
                  );
                })}

                {/* Guías de los rótulos de capa */}
                {LAYER_Y.map((cy, i) => (
                  <g key={i}>
                    <line x1={150} y1={cy} x2={CX - 2 * HALF - 2} y2={cy} className={activeLayer === i ? "stroke-accent" : "stroke-white/25"} strokeWidth={1} vectorEffect="non-scaling-stroke" />
                    <circle cx={150} cy={cy} r={2.5} className={activeLayer === i ? "fill-accent" : "fill-white/40"} />
                  </g>
                ))}
              </svg>

              {/* Controles y rótulos (texto real, sobre el dibujo) */}
              <div role="tablist" aria-label="Productos y capas de la plataforma" className="pointer-events-none absolute inset-0">
                {PRODUCTS.map((x, i) => (
                  <button
                    key={x.id}
                    type="button"
                    {...tab(i, sel === i)}
                    onMouseEnter={() => setSel(i)}
                    style={{ ...pct(TILE_X[i], 28), width: `${(112 / W) * 100}%`, height: `${(112 / H) * 100}%` }}
                    className="pointer-events-auto absolute flex -translate-x-1/2 items-start justify-center rounded-[4px] outline-offset-2"
                  >
                    <span
                      className={`text-center text-[11px] font-semibold leading-tight transition-colors duration-300 sm:text-sm lg:text-[15px] ${sel === i ? "text-white" : "text-on-dark"}`}
                    >
                      {x.name}
                    </span>
                  </button>
                ))}
                {LAYERS.map((l, k) => {
                  const i = k + 3;
                  const on = sel === i;
                  return (
                    <button
                      key={l.name}
                      type="button"
                      {...tab(i, on)}
                      style={{ ...pct(0, LAYER_Y[k + 1] - 24), width: `${(146 / W) * 100}%` }}
                      className="pointer-events-auto absolute rounded-[4px] text-left outline-offset-2"
                    >
                      <span className="block text-[11px] font-medium text-on-dark-muted sm:text-xs lg:text-[13px]">Capa {k + 2}</span>
                      <span className={`block text-sm font-semibold leading-tight transition-colors duration-300 sm:text-base lg:text-[17px] ${on ? "text-white" : "text-on-dark"}`}>
                        {l.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* Rótulo de la capa de productos (sin acción propia: los productos son los mosaicos) */}
              <div aria-hidden className="pointer-events-none absolute" style={{ ...pct(0, LAYER_Y[0] - 24), width: `${(146 / W) * 100}%` }}>
                <span className="block text-[11px] font-medium text-on-dark-muted sm:text-xs lg:text-[13px]">Capa 1</span>
                <span className="block text-sm font-semibold leading-tight text-on-dark sm:text-base lg:text-[17px]">Productos</span>
              </div>
              {/* Etapas y conexiones */}
              {[STAGES, OUTSIDE_SHORT].map((names, k) =>
                names.map((n, i) => (
                  <span
                    key={`${k}-${n}`}
                    aria-hidden
                    style={pct((k === 0 ? NODE_X : CONN_X)[i], LAYER_Y[k + 1] + 14)}
                    className={`pointer-events-none absolute -translate-x-1/2 whitespace-nowrap text-[10px] font-medium transition-colors duration-500 sm:text-xs lg:text-[13px] ${
                      (k === 0 ? litStages : litConn).includes(i) ? "text-white" : "text-on-dark-muted"
                    }`}
                  >
                    {n}
                  </span>
                )),
              )}
            </div>
          </div>

          {/* Detalle de lo elegido: panel sólido, con el mismo tratamiento que las placas. Para un producto, la captura va dentro de un marco de ventana que
              se sale por el borde inferior derecho; para completarla, cargar `image` en PRODUCTS (mientras tanto se
              muestra un espacio reservado). */}
          <article
            id="capa-detalle"
            role="tabpanel"
            key={sel}
            className="rise relative flex flex-col overflow-hidden rounded-[6px] border border-white/15 bg-ink-2 p-6 text-white shadow-[0_40px_80px_-50px_rgb(0_0_0/.9)] md:p-9 lg:col-span-5"
          >
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-grad-edge-white" />
            {(() => {
              const d = product ?? layer!;
              return (
                <div>
                  <p className="text-sm font-medium text-on-dark-muted">{d.audience}</p>
                  <h3 className="mt-1 text-[28px] font-semibold tracking-[-0.025em] md:text-[40px]">{d.name}</h3>
                  <p className="mt-4 max-w-[44ch] text-lg leading-snug text-on-dark md:text-xl">{d.description}</p>
                </div>
              );
            })()}

            {product && product.includes.length > 0 && (
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] font-medium text-white sm:grid-cols-3 lg:grid-cols-2" aria-label={product.includesTitle}>
                {product.includes.map((x) => (
                  <li key={x} className="flex items-center gap-2.5">
                    <span aria-hidden className="size-1.5 shrink-0 bg-accent" />
                    {x}
                  </li>
                ))}
              </ul>
            )}
            {layer && (
              <ul className="mt-8 grid sm:grid-cols-2 sm:gap-x-10" aria-label={layer.listTitle}>
                {layer.items.map((x, i) => (
                  <li key={x} className="flex items-baseline gap-4 border-t border-white/15 py-3.5 text-lg font-semibold">
                    <span aria-hidden className="w-5 text-sm font-medium tabular-nums text-on-dark-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8">
              <ProductLink p={product ?? DEMO} />
            </div>

            {product && (
              <div className="-mb-6 -mr-6 mt-8 flex min-h-[220px] flex-1 md:-mb-9 md:-mr-9">
                <div className="flex w-full flex-col overflow-hidden rounded-tl-[6px] border border-b-0 border-r-0 border-white/20 bg-ink/70 shadow-[0_30px_60px_-30px_rgb(0_0_0/.6)]">
                  <div aria-hidden className="flex h-9 shrink-0 items-center gap-1.5 border-b border-white/15 bg-white/[0.06] px-4">
                    <span className="size-2 bg-white/30" />
                    <span className="size-2 bg-white/30" />
                    <span className="size-2 bg-accent" />
                    <span className="ml-3 h-1.5 w-28 bg-white/15" />
                  </div>
                  {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.image} alt={`Captura de ${product.name}`} className="min-h-0 w-full flex-1 object-cover object-left-top" />
                  ) : (
                    <div role="img" aria-label={`Espacio reservado: captura de ${product.name}`} className="grid flex-1 place-items-center">
                      <p className="px-6 text-center text-sm font-medium text-on-dark-muted">Captura de {product.name}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </article>
        </div>
      </Container>
    </section>
  );
}
