/**
 * Paletas disponibles. Los colores viven en src/styles/palettes.css.
 */
export const PALETTES = [
  { id: "petroleo", label: "Petróleo" },
  { id: "turquesa", label: "Turquesa" },
  { id: "azul", label: "Azul" },
  { id: "verde", label: "Verde" },
  { id: "indigo", label: "Índigo" },
  { id: "violeta", label: "Violeta" },
  { id: "coral", label: "Coral" },
  { id: "grafito", label: "Grafito" },
] as const;

export type PaletteId = (typeof PALETTES)[number]["id"];

/** Paleta de producción: Petróleo rige por defecto. */
export const DEFAULT_PALETTE: PaletteId = "petroleo";

export const PALETTE_PARAM = "paleta";
export const PALETTE_STORAGE_KEY = "proel-paleta";
export const PALETTE_EVENT = "proel:palette";

/**
 * El selector de paletas está desactivado para el frontend de producción.
 */
export const PALETTE_SWITCHER_ENABLED = false;

export function isPaletteId(value: unknown): value is PaletteId {
  return PALETTES.some((p) => p.id === value);
}

/**
 * Script de inicialización de paleta en caso de soporte de variables.
 */
export const PALETTE_BOOT_SCRIPT = `(function(){try{var ids=${JSON.stringify(
  PALETTES.map((p) => p.id),
)};var p=new URLSearchParams(location.search).get(${JSON.stringify(PALETTE_PARAM)});var s=null;try{s=localStorage.getItem(${JSON.stringify(
  PALETTE_STORAGE_KEY,
)})}catch(e){}var v=ids.indexOf(p)>-1?p:ids.indexOf(s)>-1?s:null;if(v&&v!==${JSON.stringify(
  DEFAULT_PALETTE,
)})document.documentElement.dataset.palette=v}catch(e){}})();`;
