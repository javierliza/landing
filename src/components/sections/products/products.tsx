"use client";

import { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { LINKS } from "@/constants/site";

/** Un producto nuevo = un objeto más en este arreglo (un mosaico más en la capa de productos) y su dibujo en GLYPHS. */
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
  /** Nodos de la plataforma con los que se vincula (índices de STAGES). */
  stages: number[];
  /** Etapas a las que puede vincularse o no, según el caso (índices de STAGES). Se dibujan con trazo punteado. */
  optionalStages?: number[];
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
    stages: [1], // Receta
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
    stages: [2, 3], // Auditoría, Dispensa
    conns: [1, 2, 3], // ANMAT, SSS, Sistemas del cliente
  },
  {
    id: "onco",
    name: "Onco-Office",
    audience: "Para médicos y pacientes oncológicos",
    description: "Ecosistema que vincula a médico y paciente para la gestión de tratamientos oncológicos.",
    includesTitle: "",
    includes: [],
    cta: "Consultar por Onco-Office",
    href: "#contacto",
    external: false,
    // Se vincula con todos los nodos de la plataforma y con todas las conexiones (confirmado por Proel).
    stages: [0, 1, 2, 3, 4],
    conns: [0, 1, 2, 3, 4],
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
    stages: [4], // Recupero
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

/** Nodos de la plataforma, todos sobre una misma línea y en este orden. */
const STAGES = ["Historia clínica digital", "Receta", "Auditoría", "Dispensa", "Recupero"];
/** Nombres cortos para dibujar sobre la capa (el nombre completo va en el detalle). */
const STAGES_SHORT = ["Historia clínica", "Receta", "Auditoría", "Dispensa", "Recupero"];
const OUTSIDE = ["Validador", "ANMAT", "Superintendencia de Servicios de Salud", "Sistemas del cliente", "Surge"];
/** Nombres cortos para dibujar sobre la capa de conexiones (el nombre completo va en el detalle). */
const OUTSIDE_SHORT = ["Validador", "ANMAT", "SSS", "Clientes", "Surge"];

/** Las otras dos capas, que se eligen igual que un producto. */
const LAYERS = [
  {
    audience: "La base común",
    name: "Plataforma Proel",
    description: "Una misma base tecnológica, con inteligencia artificial integrada, sostiene todo el circuito de gestión, de la receta al recupero.",
    listTitle: "Recorrido de la plataforma",
    items: STAGES,
    // Capacidad de toda la plataforma, no un nodo del recorrido: va destacada sobre la lista.
    highlight: { title: "Integración de IA", note: "En toda la plataforma" },
    // Rótulo que acompaña al nombre de la capa en la ilustración.
    tag: "IA integrada",
  },
  {
    audience: "El entorno",
    name: "Conectada con",
    description: "La plataforma se integra con los organismos y sistemas con los que trabaja el sector.",
    listTitle: "Se integra con",
    items: OUTSIDE,
    highlight: undefined as { title: string; note: string } | undefined,
    tag: undefined as string | undefined,
  },
];
/** Para el título de la sección, que nombra cuántos productos hay. */
const COUNT_WORD: Record<number, string> = { 2: "Dos", 3: "Tres", 4: "Cuatro", 5: "Cinco", 6: "Seis" };
const DEMO: Cta = { cta: "Pedí una demo", href: "#contacto", external: false };

/* ── Geometría de la ilustración (isométrica 2:1) ── */
const W = 560;
const H = 560;
const CX = 364; // eje de las capas (desplazado a la derecha para dejar lugar a los rótulos)
const HALF = 96; // medio lado de cada capa, en su propio plano
const THICK = 14;
const LAYER_Y = [104, 266, 428]; // productos, plataforma, conexiones
const LABEL_W = 132; // ancho de la columna de rótulos de capa
// Un mosaico por producto, en fila sobre la capa 1. Hasta tres van grandes; con más se achican para entrar.
const N = PRODUCTS.length;
const TILE_GAP = N <= 3 ? 116 : Math.min(90, 310 / (N - 1));
const TILE_HALF = N <= 3 ? 26 : Math.min(21, TILE_GAP * 0.235);
const TILE_X = PRODUCTS.map((_, i) => CX + (i - (N - 1) / 2) * TILE_GAP);
/** Índices de selección: primero los productos y después las otras dos capas. */
const SEL_PLATFORM = N;
const SEL_CONNS = N + 1;
const NODE_GAP = 68;
/** Posición del emblema de IA en el plano de la capa 2: al frente, centrado. */
const AI_AT = 58;
const NODE_X = STAGES.map((_, i) => CX + (i - (STAGES.length - 1) / 2) * NODE_GAP); // nodos de la plataforma
const CONN_X = OUTSIDE.map((_, i) => CX + (i - (OUTSIDE.length - 1) / 2) * NODE_GAP); // conexiones
/** Altura del canto inferior de la capa `layer` en la horizontal `x`: de ahí salen las líneas hacia la capa de abajo. */
const portY = (layer: number, x: number) => LAYER_Y[layer] + HALF - Math.abs(x - CX) / 2 + THICK;
const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
/** Lleva el plano de una capa (u, v) a la pantalla: todo lo dibujado adentro queda "acostado" sobre la capa. */
const ISO = "matrix(1 0.5 -1 0.5 0 0)";
/** Punto del plano que en pantalla queda `dx` a la derecha del centro de la capa, a su misma altura. */
const onPlane = (dx: number) => ({ u: dx / 2, v: -dx / 2 });

type Tone = "vidrio" | "base" | "plataforma" | "mosaico" | "activo";

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
  /** Clase de trazo del borde. Sin valor, el borde lleva luz: claro al fondo y tenue al frente. */
  edge?: string;
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
      <rect {...face} transform={ISO} fill={`url(#capa-${tone})`} className={edge} stroke={edge ? undefined : "url(#capa-borde)"} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <g transform={ISO}>{children}</g>
    </g>
  );
}

/**
 * Dibujo de cada mosaico, por id de producto: receta, verificación, automatización y vínculo médico-paciente. Van sobre la placa pero girados 45° en su plano,
 * así quedan derechos hacia quien mira (acostados, sin torcerse).
 */
const GLYPHS: Record<string, React.ReactNode> = {
  rp: (
    <g>
      <rect x={-12} y={-10} width={24} height={4} rx={2} />
      <rect x={-12} y={-2} width={24} height={4} rx={2} />
      <rect x={-12} y={6} width={14} height={4} rx={2} />
    </g>
  ),
  leannec: <path d="M-11 0 L-4 8 L11 -8" fill="none" stroke="currentColor" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />,
  turbosurge: <path d="M3 -14 L-9 2 H-1 L-3 14 L9 -2 H1 Z" />,
  onco: (
    <g>
      <circle cx={-8} cy={0} r={5.5} />
      <circle cx={8} cy={0} r={5.5} />
      <rect x={-8} y={-1.75} width={16} height={3.5} />
    </g>
  ),
};

/**
 * Vista previa dibujada para el marco de captura, mientras no haya una captura real: un esquema abstracto de pantalla
 * (barra lateral, indicadores y filas), sin datos. Se reemplaza sola al cargar `image` en PRODUCTS.
 */
function Wireframe({ name }: { name: string }) {
  return (
    <div role="img" aria-label={`Vista previa ilustrativa de ${name}`} className="flex min-h-0 flex-1 gap-4 p-4 md:p-5">
      <div aria-hidden className="hidden w-[22%] shrink-0 flex-col gap-2.5 sm:flex">
        <span className="h-2 w-3/4 bg-accent/70" />
        {[100, 80, 90, 65, 85].map((w, i) => (
          <span key={i} className="h-1.5 bg-white/12" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div aria-hidden className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-2/5 bg-white/25" />
          <span className="h-5 w-16 rounded-[3px] bg-white/10" />
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[60, 45, 70].map((w, i) => (
            <div key={i} className="rounded-[4px] border border-white/10 bg-white/[0.04] p-2.5">
              <span className="block h-1.5 w-1/2 bg-white/15" />
              <span className={`mt-2 block h-2.5 ${i === 0 ? "bg-accent/80" : "bg-white/30"}`} style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col justify-start gap-2.5 rounded-[4px] border border-white/10 bg-white/[0.03] p-2.5">
          {[92, 78, 86, 70, 82, 64].map((w, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className={`size-1.5 shrink-0 ${i % 3 === 0 ? "bg-accent" : "bg-white/25"}`} />
              <span className="h-1.5 bg-white/12" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Punto de luz en el canto de una capa, de donde sale una línea hacia la capa de abajo. */
function Port({ x, y }: { x: number; y: number }) {
  return (
    <g className="rise">
      <circle cx={x} cy={y} r={7} className="fill-accent" opacity={0.45} filter="url(#capa-brillo)" />
      <circle cx={x} cy={y} r={3} className="fill-white" />
    </g>
  );
}

/**
 * Línea entre capas (recta, o en curva si se pide). Si está activa lleva un resplandor y un pulso de luz que la recorre.
 */
function Beam({
  x1,
  y1,
  x2,
  y2,
  on,
  pulse,
  delay = 0,
  optional = false,
  curved = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  on: boolean;
  pulse: boolean;
  delay?: number;
  /** Vínculo opcional: trazo punteado, más tenue y sin pulso. */
  optional?: boolean;
  /** Traza una curva en S en lugar de una recta. */
  curved?: boolean;
}) {
  const lit = on && !optional;
  // Curva en S: sale y llega en vertical, como un cable. Si no, recta.
  const ym = (y1 + y2) / 2;
  const path = curved ? `M${x1} ${y1} C${x1} ${ym} ${x2} ${ym} ${x2} ${y2}` : `M${x1} ${y1} L${x2} ${y2}`;
  return (
    <>
      {/* Resplandor bajo el haz activo */}
      {lit && <path d={path} fill="none" className="stroke-accent" strokeWidth={5} opacity={0.4} filter="url(#capa-brillo)" />}
      <path
        d={path}
        fill="none"
        className={optional ? "stroke-accent/70" : on ? "stroke-accent" : "stroke-white/20"}
        strokeWidth={optional ? 1.25 : on ? 1.5 : 1}
        strokeDasharray={optional ? "2 5" : undefined}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {lit && pulse && (
        <>
          <circle r={5.5} className="fill-accent" opacity={0.35}>
            <animateMotion dur="1.6s" begin={`${delay}s`} repeatCount="indefinite" path={path} />
          </circle>
          <circle r={2.2} className="fill-white">
            <animateMotion dur="1.6s" begin={`${delay}s`} repeatCount="indefinite" path={path} />
          </circle>
        </>
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
  // 0..N-1: producto · SEL_PLATFORM: plataforma · SEL_CONNS: conexiones
  const [sel, setSel] = useState(1);
  const product = sel < N ? PRODUCTS[sel] : null;
  const layer = sel >= N ? LAYERS[sel - N] : null;
  const activeLayer = sel < N ? 0 : sel - N + 1; // capa resaltada en la ilustración
  const litStages = product ? product.stages : sel === SEL_PLATFORM ? STAGES.map((_, i) => i) : [];
  const optStages = product?.optionalStages ?? [];
  const litConn = sel === SEL_CONNS ? OUTSIDE.map((_, i) => i) : (product?.conns ?? []);

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
              {COUNT_WORD[N] ?? "Nuestros"} productos, una sola plataforma
            </h2>
          </div>
          <p className="reveal max-w-md text-lg leading-relaxed text-on-dark lg:col-span-5">
            Cada producto resuelve una parte de la gestión, y algunos suman funciones propias de una especialidad. Todos se apoyan en una misma base tecnológica, con inteligencia artificial integrada, y se conectan con los organismos y sistemas del sector.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-stretch lg:gap-x-10">
          {/* Vista por capas */}
          <div className="lg:col-span-7">
            <div className="reveal relative mx-auto w-full max-w-[680px] lg:mx-0" style={{ aspectRatio: `${W} / ${H}` }}>
              {/* Luz quieta detrás de la pila */}
              <div aria-hidden className="bg-glow-stack pointer-events-none absolute -inset-[14%]" />
              <svg viewBox={`0 0 ${W} ${H}`} aria-hidden className="capas absolute inset-0 size-full overflow-visible">
                <defs>
                  {/* Caras superiores: más claras al fondo, más oscuras al frente */}
                  {(
                    [
                      ["vidrio", "var(--p-vidrio-a)", "var(--p-vidrio-b)"],
                      ["base", "var(--p-base-a)", "var(--p-base-b)"],
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
                  {/* Borde de las placas: más claro en las aristas del fondo, tenue al frente */}
                  <linearGradient id="capa-borde" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity={0.6} />
                    <stop offset="0.55" stopColor="#fff" stopOpacity={0.14} />
                    <stop offset="1" stopColor="#fff" stopOpacity={0.34} />
                  </linearGradient>
                  <filter id="capa-brillo" filterUnits="userSpaceOnUse" x={0} y={0} width={W} height={H}>
                    <feGaussianBlur stdDeviation="2.4" />
                  </filter>
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
                <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} rx={12} transform={`translate(${CX} ${LAYER_Y[2] + 54}) ${ISO}`} className="fill-primary opacity-50" filter="url(#capa-difuso)" />

                {/* Capa 3: conexiones */}
                <Plate x={CX} y={LAYER_Y[2]} half={HALF} rx={12} t={THICK} tone="base" edge={activeLayer === 2 ? "stroke-accent" : undefined}>
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
                <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} rx={12} transform={`translate(${CX} ${LAYER_Y[1] + 78}) scale(0.92) ${ISO}`} className="fill-black opacity-30" filter="url(#capa-difuso)" />
                {OUTSIDE.map((_, c) => {
                  // Cada conexión sube recta hasta la plataforma: cinco líneas verticales y parejas, que asoman por
                  // debajo de la capa 2. Se enciende la de cada conexión que usa el producto elegido.
                  const on = sel === SEL_CONNS || !!product?.conns?.includes(c);
                  return <Beam key={`${c}-${on ? sel : "r"}`} x1={CONN_X[c]} y1={LAYER_Y[1] + 4} x2={CONN_X[c]} y2={LAYER_Y[2] - 3} on={on} pulse={on && !reduced} delay={0.5 + c * 0.12} />;
                })}

                {/* Aura de la plataforma: la capa con IA es la que más luz tiene de la pila */}
                <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} rx={12} transform={`translate(${CX} ${LAYER_Y[1] + 8}) scale(1.07) ${ISO}`} className="fill-accent" opacity={0.4} filter="url(#capa-difuso)">
                  {!reduced && <animate attributeName="opacity" values="0.28;0.55;0.28" dur="5s" repeatCount="indefinite" />}
                </rect>

                {/* Capa 2: plataforma, con el recorrido de etapas */}
                <Plate x={CX} y={LAYER_Y[1]} half={HALF} rx={12} t={THICK} tone="plataforma" edge={activeLayer === 1 ? "stroke-white" : "stroke-accent/70"}>
                  <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} fill="url(#capa-puntos)" opacity={0.3} />
                  {(() => {
                    const a = onPlane(NODE_X[0] - CX);
                    const b = onPlane(NODE_X[NODE_X.length - 1] - CX);
                    const lo = onPlane(NODE_X[Math.min(...litStages, NODE_X.length - 1)] - CX);
                    const hi = onPlane(NODE_X[Math.max(...litStages, 0)] - CX);
                    return (
                      <>
                        <line x1={a.u} y1={a.v} x2={b.u} y2={b.v} className="stroke-white/30" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                        {litStages.length > 1 && <line x1={lo.u} y1={lo.v} x2={hi.u} y2={hi.v} className="stroke-white" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />}
                      </>
                    );
                  })()}
                  {/* Integración de IA: es de toda la capa, no de una etapa. Se dibuja como un marco interior que
                      recorre la placa entera, con una luz que le da la vuelta. */}
                  <rect x={-HALF + 8} y={-HALF + 8} width={2 * HALF - 16} height={2 * HALF - 16} rx={7} fill="none" className={sel === SEL_PLATFORM ? "stroke-white/90" : "stroke-white/55"} strokeWidth={1} vectorEffect="non-scaling-stroke" />
                  {!reduced && (
                    <rect x={-HALF + 8} y={-HALF + 8} width={2 * HALF - 16} height={2 * HALF - 16} rx={7} pathLength={1} fill="none" className="stroke-white" strokeWidth={2} strokeLinecap="round" strokeDasharray="0.09 0.41">
                      <animate attributeName="stroke-dashoffset" from={1} to={0} dur="9s" repeatCount="indefinite" />
                    </rect>
                  )}
                  {/* Emblema de IA: una pieza propia de la capa, al frente de la placa y sin unir a ningún nodo. Siempre
                      encendida, con un anillo que late. */}
                  <g transform={`translate(${AI_AT} ${AI_AT})`}>
                    <rect x={-22} y={-22} width={44} height={44} rx={10} className="fill-white" opacity={0.5} filter="url(#capa-difuso)" />
                    <rect x={-17} y={-17} width={34} height={34} rx={8} fill="none" className="stroke-white" strokeWidth={1} vectorEffect="non-scaling-stroke">
                      {!reduced && (
                        <>
                          <animateTransform attributeName="transform" type="scale" values="1;1.45" dur="2.6s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.8;0" dur="2.6s" repeatCount="indefinite" />
                        </>
                      )}
                    </rect>
                    <rect x={-17} y={-17} width={34} height={34} rx={8} className="fill-white" />
                    <path transform="rotate(-45)" d="M0 -11 L3 -3 L11 0 L3 3 L0 11 L-3 3 L-11 0 L-3 -3 Z" className="fill-primary-dark" />
                  </g>
                  {NODE_X.map((x, n) => {
                    const { u, v } = onPlane(x - CX);
                    const lit = litStages.includes(n);
                    const opt = optStages.includes(n); // vínculo opcional: solo el contorno, punteado
                    return (
                      <g key={n}>
                        <rect x={u - 9} y={v - 9} width={18} height={18} rx={4} fill="none" className={`transition-[stroke] duration-500 ${lit || opt ? "stroke-white/70" : "stroke-white/0"}`} strokeWidth={1} strokeDasharray={opt ? "2 3" : undefined} vectorEffect="non-scaling-stroke" />
                        <rect x={u - 5} y={v - 5} width={10} height={10} rx={2} className={`transition-[fill] duration-500 ${lit ? "fill-white" : "fill-white/40"}`} />
                      </g>
                    );
                  })}
                </Plate>

                {/* Tira de luz en el canto frontal de la plataforma, con un destello que la recorre */}
                {(() => {
                  const y = LAYER_Y[1] + THICK / 2;
                  const xr = 2 * HALF - 12 * (2 - Math.SQRT2);
                  const d = `M${CX - xr} ${y} L${CX - 9} ${y + HALF - 7} Q${CX} ${y + HALF - 3.5} ${CX + 9} ${y + HALF - 7} L${CX + xr} ${y}`;
                  return (
                    <>
                      <path d={d} fill="none" className="stroke-accent" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                      {!reduced && (
                        <path d={d} pathLength={1} fill="none" className="stroke-white" strokeWidth={2.5} strokeLinecap="round" strokeDasharray="0.07 0.93">
                          <animate attributeName="stroke-dashoffset" from={1} to={0} dur="4.5s" repeatCount="indefinite" />
                        </path>
                      )}
                    </>
                  );
                })()}

                {/* Sombra de la capa de productos y haces del producto elegido hacia la capa 2. Salen todos de un mismo punto,
                    en el canto de la capa 1 justo debajo del mosaico, y bajan en curva hasta llegar en vertical a cada nodo.
                    Continuos a los nodos vinculados; punteados a los opcionales. */}
                <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} rx={12} transform={`translate(${CX} ${LAYER_Y[0] + 78}) scale(0.92) ${ISO}`} className="fill-black opacity-30" filter="url(#capa-difuso)" />
                {product && (
                  <g key={product.id}>
                    {product.stages.map((n, k) => (
                      <Beam key={n} x1={TILE_X[sel]} y1={portY(0, TILE_X[sel])} x2={NODE_X[n]} y2={LAYER_Y[1] - 3} on pulse={!reduced} delay={k * 0.25} curved />
                    ))}
                    {optStages.map((n) => (
                      <Beam key={`o${n}`} x1={TILE_X[sel]} y1={portY(0, TILE_X[sel])} x2={NODE_X[n]} y2={LAYER_Y[1] - 3} on pulse={false} optional curved />
                    ))}
                  </g>
                )}

                {/* Capa 1: productos */}
                <Plate x={CX} y={LAYER_Y[0]} half={HALF} rx={12} t={THICK} tone="vidrio" edge={activeLayer === 0 ? "stroke-accent" : undefined}>
                  <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} fill="url(#capa-puntos)" opacity={0.18} />
                  {product && (
                    <rect
                      key={product.id}
                      x={onPlane(TILE_X[sel] - CX).u - TILE_HALF}
                      y={onPlane(TILE_X[sel] - CX).v - TILE_HALF}
                      width={TILE_HALF * 2}
                      height={TILE_HALF * 2}
                      rx={6}
                      className="rise fill-accent opacity-50"
                      filter="url(#capa-difuso)"
                    />
                  )}
                </Plate>
                {/* Punto de salida de los haces, en el canto de la capa 1 */}
                {product && <Port key={`p-${product.id}`} x={TILE_X[sel]} y={portY(0, TILE_X[sel])} />}
                {PRODUCTS.map((x, i) => {
                  const on = sel === i;
                  return (
                    <g key={x.id} style={{ transform: `translateY(${on ? -16 : 0}px)`, transition: "transform .5s cubic-bezier(.2,.7,.2,1)" }}>
                      <Plate x={TILE_X[i]} y={LAYER_Y[0]} half={TILE_HALF} rx={TILE_HALF * 0.24} t={6} tone={on ? "activo" : "mosaico"} edge={on ? "stroke-white/80" : undefined}>
                        <g transform={`rotate(-45) scale(${TILE_HALF / 25})`} className={on ? "fill-ink text-ink" : "fill-white/60 text-white/60"}>
                          {GLYPHS[x.id]}
                        </g>
                      </Plate>
                    </g>
                  );
                })}

                {/* Guías de los rótulos de capa */}
                {LAYER_Y.map((cy, i) => (
                  <g key={i}>
                    <line x1={LABEL_W + 6} y1={cy} x2={CX - 2 * HALF - 4} y2={cy} className={activeLayer === i ? "stroke-accent" : "stroke-white/25"} strokeWidth={1} vectorEffect="non-scaling-stroke" />
                    <circle cx={LABEL_W + 6} cy={cy} r={2.5} className={activeLayer === i ? "fill-accent" : "fill-white/40"} />
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
                    style={{ ...pct(TILE_X[i], 6), width: `${(TILE_GAP / W) * 100}%`, height: `${(134 / H) * 100}%` }}
                    className="pointer-events-auto absolute flex -translate-x-1/2 flex-col rounded-[4px] outline-offset-2"
                  >
                    {/* El nombre va apoyado sobre el mosaico; si no entra en una línea, crece hacia arriba. Con más de
                        tres productos, en pantallas chicas los nombres se alternan en dos alturas para no pisarse. */}
                    <span className={`flex h-[36%] w-full shrink-0 items-end justify-center ${N > 3 && i % 2 === 1 ? "max-sm:pb-4" : ""}`}>
                      <span
                        className={`text-balance text-center text-[11px] font-semibold leading-tight transition-colors duration-300 sm:text-sm ${N > 3 ? "" : "lg:text-[15px]"} ${sel === i ? "text-white" : "text-on-dark"}`}
                      >
                        {x.name}
                      </span>
                    </span>
                  </button>
                ))}
                {LAYERS.map((l, k) => {
                  const i = k + N;
                  const on = sel === i;
                  return (
                    <button
                      key={l.name}
                      type="button"
                      {...tab(i, on)}
                      style={{ ...pct(0, LAYER_Y[k + 1] - 24), width: `${(LABEL_W / W) * 100}%` }}
                      className="pointer-events-auto absolute rounded-[4px] text-left outline-offset-2"
                    >
                      <span className="block text-[11px] font-medium text-on-dark-muted sm:text-xs lg:text-[13px]">Capa {k + 2}</span>
                      <span className={`block text-sm font-semibold leading-tight transition-colors duration-300 sm:text-base lg:text-[17px] ${on ? "text-white" : "text-on-dark"}`}>
                        {l.name}
                      </span>
                      {l.tag && (
                        <span className="mt-1.5 inline-flex items-center gap-1 rounded-[4px] bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-ink sm:px-2 sm:py-1 sm:text-xs lg:text-[13px]">
                          <Sparkles aria-hidden className="size-3 shrink-0 lg:size-3.5" />
                          {/* En pantallas chicas la columna es angosta: va solo la primera palabra. */}
                          <span className="whitespace-nowrap">
                            {l.tag.split(" ")[0]}
                            <span className="max-sm:sr-only"> {l.tag.split(" ").slice(1).join(" ")}</span>
                          </span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Rótulo de la capa de productos (sin acción propia: los productos son los mosaicos) */}
              <div aria-hidden className="pointer-events-none absolute" style={{ ...pct(0, LAYER_Y[0] - 24), width: `${(LABEL_W / W) * 100}%` }}>
                <span className="block text-[11px] font-medium text-on-dark-muted sm:text-xs lg:text-[13px]">Capa 1</span>
                <span className="block text-sm font-semibold leading-tight text-on-dark sm:text-base lg:text-[17px]">Productos</span>
              </div>
              {/* Rótulo del emblema de IA */}
              <span
                aria-hidden
                style={pct(CX + 40, LAYER_Y[1] + AI_AT - 10)}
                className="pointer-events-none absolute text-xs font-semibold text-white sm:text-sm lg:text-base"
              >
                IA
              </span>
              {/* Nodos de la plataforma y conexiones. En pantallas chicas los de la plataforma se alternan en dos alturas. */}
              {[STAGES_SHORT, OUTSIDE_SHORT].map((names, k) =>
                names.map((n, i) => (
                  <span
                    key={`${k}-${n}`}
                    aria-hidden
                    style={{ ...pct((k === 0 ? NODE_X : CONN_X)[i], LAYER_Y[k + 1] + 14), width: `${(NODE_GAP / W) * 100}%` }}
                    className={`pointer-events-none absolute -translate-x-1/2 text-balance text-center text-[10px] leading-tight ${k === 0 && i % 2 === 1 ? "max-sm:mt-3" : ""} font-medium transition-colors duration-500 sm:text-xs lg:text-[13px] ${
                      (k === 0 ? litStages : litConn).includes(i) ? "text-white" : k === 0 ? (optStages.includes(i) ? "text-white/85" : "text-white/65") : "text-on-dark-muted"
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
              muestra una vista previa dibujada). */}
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
            {product && optStages.length > 0 && (
              <dl className="mt-6 border-t border-white/15 text-[15px]">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/15 py-3">
                  <dt className="font-semibold text-white">{product.stages.map((n) => STAGES[n]).join(", ")}</dt>
                  <dd className="flex items-center gap-2 text-on-dark">
                    <span aria-hidden className="h-px w-6 bg-accent" />
                    Vinculada
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-white/15 py-3">
                  <dt className="font-semibold text-white">{optStages.map((n) => STAGES[n]).join(", ")}</dt>
                  <dd className="flex shrink-0 items-center gap-2 text-on-dark">
                    <span aria-hidden className="w-6 border-t border-dashed border-accent" />
                    Opcionales
                  </dd>
                </div>
              </dl>
            )}
            {layer?.highlight && (
              <div className="mt-6 flex items-center gap-4 rounded-[4px] border border-accent/50 bg-accent/10 p-4">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-[4px] bg-accent text-ink">
                  <Sparkles className="size-5" />
                </span>
                <div>
                  <p className="text-lg font-semibold leading-tight">{layer.highlight.title}</p>
                  <p className="mt-0.5 text-[15px] text-on-dark">{layer.highlight.note}</p>
                </div>
              </div>
            )}
            {layer && (
              <ul className="mt-6 grid sm:grid-cols-2 sm:gap-x-10 [&>li:last-child]:border-b sm:[&>li:nth-last-child(2):nth-child(odd)]:border-b" aria-label={layer.listTitle}>
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
                    <Wireframe name={product.name} />
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
