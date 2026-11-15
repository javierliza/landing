import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Une nombres de clase y resuelve conflictos de Tailwind (gana la última). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
