"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_PALETTE, PALETTE_EVENT, PALETTE_PARAM, PALETTE_STORAGE_KEY, type PaletteId } from "./palettes";

function subscribe(onChange: () => void) {
  window.addEventListener(PALETTE_EVENT, onChange);
  return () => window.removeEventListener(PALETTE_EVENT, onChange);
}

/** Paleta activa (la del atributo `data-palette` de <html>). */
export function usePalette(): PaletteId {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dataset.palette as PaletteId | undefined) ?? DEFAULT_PALETTE,
    () => DEFAULT_PALETTE,
  );
}

/** Aplica una paleta: atributo en <html>, almacenamiento local y parámetro de la URL (sin recargar). */
export function applyPalette(id: PaletteId) {
  const root = document.documentElement;
  if (id === DEFAULT_PALETTE) delete root.dataset.palette;
  else root.dataset.palette = id;

  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, id);
  } catch {
    // Almacenamiento bloqueado (modo privado): la paleta rige igual durante la visita.
  }
  const url = new URL(window.location.href);
  url.searchParams.set(PALETTE_PARAM, id);
  window.history.replaceState(window.history.state, "", url);

  window.dispatchEvent(new Event(PALETTE_EVENT));
}

/**
 * Valor actual de una variable CSS (por ejemplo `--color-primary`), para componentes que no usan CSS
 * (como el fondo WebGL). Se actualiza al cambiar de paleta.
 */
export function useCssVar(name: string, fallback: string): string {
  return useSyncExternalStore(
    subscribe,
    () => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback,
    () => fallback,
  );
}
