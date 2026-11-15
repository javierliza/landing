"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";
import { PALETTES, type PaletteId } from "@/lib/palettes";
import { applyPalette, usePalette } from "@/lib/use-palette";

/** Muestra los tres colores de una paleta. El atributo `data-palette` recolorea solo este fragmento. */
function Swatch({ id }: { id: PaletteId }) {
  return (
    <span data-palette={id} aria-hidden className="flex h-4 overflow-hidden rounded-[2px]">
      <i className="w-3" style={{ background: "var(--pal-ink)" }} />
      <i className="w-3" style={{ background: "var(--pal-primary)" }} />
      <i className="w-3" style={{ background: "var(--pal-accent)" }} />
    </span>
  );
}

/**
 * Selector de paleta para revisión interna. Cambia los colores de toda la página sin recargar y deja la
 * elección en la URL (`?paleta=azul`) para compartirla. Se desactiva con NEXT_PUBLIC_PALETTE_SWITCHER=off.
 */
export function PaletteSwitcher() {
  const current = usePalette();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  const label = PALETTES.find((p) => p.id === current)?.label ?? "";

  return (
    <div ref={root} className="fixed bottom-4 right-4 z-[60]">
      {open && (
        <div
          role="radiogroup"
          aria-label="Paleta de colores"
          className="rise absolute bottom-full right-0 mb-2 w-56 rounded-[6px] border border-white/20 bg-ink/95 p-1.5 shadow-[0_20px_40px_-20px_rgb(0_0_0/.6)] backdrop-blur-md"
        >
          {PALETTES.map((p) => {
            const on = p.id === current;
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => {
                  applyPalette(p.id);
                  setOpen(false);
                  button.current?.focus();
                }}
                className={`flex w-full items-center gap-3 rounded-[4px] px-2.5 py-2 text-left text-sm font-medium transition-colors ${
                  on ? "bg-white/15 text-white" : "text-on-dark hover:bg-white/10"
                }`}
              >
                <Swatch id={p.id} />
                <span className="flex-1">{p.label}</span>
                {on && <Check className="size-4 text-accent" aria-hidden />}
              </button>
            );
          })}
        </div>
      )}
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex h-10 items-center gap-2.5 rounded-[4px] border border-white/25 bg-ink/90 px-3 text-sm font-medium text-white shadow-[0_10px_24px_-14px_rgb(0_0_0/.6)] backdrop-blur-md transition-colors hover:border-white/60"
      >
        <Palette className="size-4 text-accent" aria-hidden />
        <span className="max-sm:sr-only">Paleta: {label}</span>
      </button>
    </div>
  );
}
