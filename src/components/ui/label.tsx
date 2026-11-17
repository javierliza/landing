import type { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  dark?: boolean;
  as?: "p" | "h2";
}

/** Rótulo de sección: cuadrado de marca + nombre. Se repite igual en toda la página. */
export function Label({ children, dark = false, as: Tag = "p" }: LabelProps) {
  return (
    <Tag className={`flex items-center gap-2.5 text-sm font-semibold tracking-normal ${dark ? "text-white" : "text-ink"}`}>
      <span aria-hidden className={`size-2 ${dark ? "bg-accent" : "bg-primary"}`} />
      {children}
    </Tag>
  );
}
