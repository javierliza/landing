"use client";

import {
  Check,
  ClipboardList,
  FileText,
  Loader2,
  Package,
  ShieldCheck,
  Smartphone,
  Store,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

/* Base de todas las ilustraciones de producto: mismo lienzo, mismas líneas. */
function Canvas({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-muted p-5 sm:p-8">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <div className="relative">{children}</div>
      {caption && (
        <p className="relative mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{caption}</p>
      )}
    </div>
  );
}

const bar = (w: string, dark = false) => (
  <span className={`block h-1.5 rounded-full ${dark ? "bg-primary/80" : "bg-foreground/12"}`} style={{ width: w }} />
);

/* P01 · RP Speciality: documentos clínicos apilados */
export function RpVisual() {
  const docs: [LucideIcon, string, string][] = [
    [FileText, "Receta digital", "Firmada"],
    [ClipboardList, "Orden médica", "Emitida"],
    [Stethoscope, "Historial clínico", "Actualizado"],
  ];
  return (
    <Canvas caption="RP Speciality · documentos clínicos en un solo lugar">
      <div className="mx-auto max-w-lg space-y-3">
        {docs.map(([Icon, t, s], i) => (
          <div
            key={t}
            className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm"
            style={{ marginLeft: i * 14, marginRight: (2 - i) * 14 }}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
              <Icon className="size-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              <p className="text-sm font-medium tracking-[-0.01em]">{t}</p>
              {bar(i === 0 ? "70%" : i === 1 ? "55%" : "62%")}
            </div>
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{s}</span>
          </div>
        ))}
      </div>
    </Canvas>
  );
}

/* P02 · Leannec: módulos */
export function LeannecVisual() {
  const mods: [LucideIcon, string][] = [
    [Stethoscope, "Auditor"],
    [ShieldCheck, "Trazabilidad"],
    [FileText, "Recupero"],
    [Smartphone, "Mobile"],
    [Package, "Compras"],
    [Store, "Farmacias"],
  ];
  return (
    <Canvas caption="Leannec · se contrata por módulos">
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
        {mods.map(([Icon, t], i) => (
          <div
            key={t}
            className={`rounded-lg border p-4 shadow-sm ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}
          >
            <Icon className="size-4" strokeWidth={1.75} />
            <p className="mt-6 text-sm font-medium tracking-[-0.01em]">{t}</p>
            <p className={`mt-0.5 font-mono text-[10px] ${i === 0 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              Módulo 0{i + 1}
            </p>
          </div>
        ))}
      </div>
    </Canvas>
  );
}

/* P03 · TurboSurge: secuencia automatizada */
export function TurboSurgeVisual() {
  const steps = [
    ["Lectura de expedientes pendientes", "done"],
    ["Validación de datos y documentación", "done"],
    ["Carga y gestión en Surge", "run"],
    ["Registro del resultado", "wait"],
  ];
  return (
    <Canvas caption="TurboSurge · vista ilustrativa del flujo automatizado">
      <div className="mx-auto max-w-lg rounded-lg border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-medium tracking-[-0.01em]">Ejecución</p>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" /> En curso
          </span>
        </div>
        <ul className="divide-y divide-border">
          {steps.map(([t, s]) => (
            <li key={t} className="flex items-center gap-3 px-4 py-3.5 text-sm">
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full ${
                  s === "done" ? "bg-primary text-primary-foreground" : s === "run" ? "border border-primary" : "border border-border"
                }`}
              >
                {s === "done" ? <Check className="size-3" strokeWidth={3} /> : s === "run" ? <Loader2 className="size-3 animate-spin" /> : null}
              </span>
              <span className={s === "wait" ? "text-muted-foreground" : ""}>{t}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-border px-4 py-3">
          <div className="h-1 overflow-hidden rounded-full bg-foreground/10">
            <div className="h-full w-[62%] rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </Canvas>
  );
}

/* Portada · tile oscuro con cifra */
export function HeroStat() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-primary p-7 text-primary-foreground">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary-foreground/70">Desde 2009</p>
      <div>
        <p className="font-display text-7xl tracking-[-0.02em] sm:text-8xl">15+</p>
        <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-primary-foreground/80">
          años gestionando tratamientos médicos de alto costo con tecnología propia.
        </p>
      </div>
    </div>
  );
}

/* Portada · circuito del ecosistema */
export function HeroFlow() {
  const nodes = ["Receta", "Auditoría", "Compra", "Dispensa", "Surge"];
  const bands: [string, string, string][] = [
    ["RP Speciality", "col-span-1", "Origen"],
    ["Leannec", "col-span-3", "Proceso"],
    ["TurboSurge", "col-span-1", "Cierre"],
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center bg-card px-4 sm:px-8">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <div className="relative">
        <div className="relative grid grid-cols-5 gap-2">
          <span aria-hidden className="absolute left-[10%] right-[10%] top-1/2 h-px bg-border" />
          <span
            aria-hidden
            className="absolute left-[10%] top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary [animation:flow_5s_ease-in-out_infinite]"
          />
          {nodes.map((n, i) => (
            <div key={n} className="relative rounded-md border border-border bg-background px-1 py-2.5 text-center shadow-sm sm:py-3.5">
              <p className="font-mono text-[9px] text-muted-foreground sm:text-[10px]">0{i + 1}</p>
              <p className="mt-0.5 text-[10px] font-medium tracking-[-0.01em] sm:mt-1 sm:text-[13px]">{n}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {bands.map(([name, span, stage]) => (
            <div
              key={name}
              className={`${span} rounded-md border border-primary bg-primary px-2 py-2 text-center text-primary-foreground sm:py-2.5`}
            >
              <p className="text-[10px] font-medium sm:text-[13px]">{name}</p>
              <p className="font-mono text-[8px] uppercase tracking-wider text-primary-foreground/70 sm:text-[9px]">{stage}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px]">
          Una sola base · un solo circuito
        </p>
      </div>
    </div>
  );
}
