"use client";

import { useEffect, type ReactNode } from "react";

export const LINKS = {
  leannec: "https://leannec.com",
  rp: "https://rp-speciality.netlify.app/",
  email: "info@leannec.com.ar",
  phone: "+54 11 5263-3212",
  phoneHref: "tel:+541152633212",
};

export const ACCESS = ["Obras Sociales", "Farmacias", "Droguerías"];

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Wordmark tipográfico provisorio (Public Sans) hasta contar con el logo del Brand kit v4. */
export function Wordmark({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-bold tracking-[-0.04em] ${light ? "text-white" : "text-ink"} ${className}`}>
      proel<span className="ml-[0.06em] inline-block size-[0.2em] bg-primary" aria-hidden />
    </span>
  );
}

/** Fallback de revelados para navegadores sin animation-timeline: view(). */
export function RevealObserver() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

/** Rótulo de sección: cuadrado de marca + nombre. Se repite igual en toda la página. */
export function Label({ children, dark = false, as: Tag = "p" }: { children: ReactNode; dark?: boolean; as?: "p" | "h2" }) {
  return (
    <Tag className={`flex items-center gap-2.5 text-sm font-semibold tracking-normal ${dark ? "text-white" : "text-ink"}`}>
      <span aria-hidden className={`size-2 ${dark ? "bg-accent" : "bg-primary"}`} />
      {children}
    </Tag>
  );
}

/**
 * Espacio reservado para una imagen. Mientras no haya archivo muestra un recuadro neutro con su descripción;
 * al pasar `src` muestra la imagen con el mismo tamaño, sin mover el diseño.
 */
export function ImageSlot({ label, src, dark = false, className = "" }: { label: string; src?: string; dark?: boolean; className?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} className={`w-full rounded-[4px] object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={`Espacio reservado: ${label}`}
      className={`grid w-full place-items-center rounded-[4px] border ${dark ? "border-white/20 bg-white/[0.06] text-on-dark-muted" : "border-line-strong bg-bg text-gray"} ${className}`}
    >
      <p className="px-6 text-center text-sm font-medium">{label}</p>
    </div>
  );
}

/** Grilla editorial: rótulo en 3 columnas, contenido en 9. */
export function Split({ label, children, dark = false }: { label: string; children: ReactNode; dark?: boolean }) {
  return (
    <Container className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
      <div className="lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <Label dark={dark} as="h2">{label}</Label>
        </div>
      </div>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </Container>
  );
}

export function SectionTitle({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <h2 className={`reveal max-w-[20ch] text-balance text-[34px] leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[56px] ${dark ? "text-white" : "text-ink"}`}>
      {children}
    </h2>
  );
}
