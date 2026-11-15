/**
 * Paletas disponibles. Los colores viven en src/styles/palettes.css; acá solo el id (el valor de
 * `data-palette` y del parámetro `?paleta=`) y la etiqueta que ve la persona. Mantener ambos archivos
 * sincronizados.
 */
export const PALETTES = [
  { id: "turquesa", label: "Turquesa" },
  { id: "azul", label: "Azul" },
  { id: "verde", label: "Verde" },
  { id: "indigo", label: "Índigo" },
] as const;

export type PaletteId = (typeof PALETTES)[number]["id"];

/** Paleta de producción: la que rige cuando no hay `data-palette` en <html>. */
export const DEFAULT_PALETTE: PaletteId = "turquesa";

export const PALETTE_PARAM = "paleta";
export const PALETTE_STORAGE_KEY = "proel-paleta";
export const PALETTE_EVENT = "proel:palette";

/**
 * El selector de paletas es una herramienta de revisión. Está activo salvo que se defina
 * NEXT_PUBLIC_PALETTE_SWITCHER=off (en Vercel: Settings → Environment Variables) para publicar la versión final.
 */
export const PALETTE_SWITCHER_ENABLED = process.env.NEXT_PUBLIC_PALETTE_SWITCHER !== "off";

export function isPaletteId(value: unknown): value is PaletteId {
  return PALETTES.some((p) => p.id === value);
}

/**
 * Script que corre antes del primer pintado (en <head>) para aplicar la paleta elegida desde la URL o el
 * almacenamiento local y así evitar un parpadeo con la paleta por defecto.
 */
export const PALETTE_BOOT_SCRIPT = `(function(){try{var ids=${JSON.stringify(
  PALETTES.map((p) => p.id),
)};var p=new URLSearchParams(location.search).get(${JSON.stringify(PALETTE_PARAM)});var s=null;try{s=localStorage.getItem(${JSON.stringify(
  PALETTE_STORAGE_KEY,
)})}catch(e){}var v=ids.indexOf(p)>-1?p:ids.indexOf(s)>-1?s:null;if(v&&v!==${JSON.stringify(
  DEFAULT_PALETTE,
)})document.documentElement.dataset.palette=v}catch(e){}})();`;
