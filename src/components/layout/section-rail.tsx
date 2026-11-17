"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ChapterScrubber } from "@/components/ui/chapter-scrubber";
import { CHAPTERS, DARK_SECTIONS } from "@/constants/navigation";

/**
 * Riel lateral de secciones (Chapter Scrubber). Solo en pantallas anchas:
 * aparece al salir de la portada, muestra en qué sección estás, anticipa cada una al pasar el cursor y salta al hacer clic.
 */
export function SectionRail() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(CHAPTERS.findIndex((c) => c.id === e.target.id));
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Sobre secciones oscuras las marcas pasan a blanco y la activa al acento.
  const dark = DARK_SECTIONS.has(CHAPTERS[current]?.id);
  const tone = {
    "--rail-tick": dark ? "#ffffff" : "var(--color-ink)",
    "--rail-current": dark ? "var(--color-accent)" : "var(--color-primary)",
  } as CSSProperties;

  return (
    <div
      className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 min-[1440px]:block ${
        current === 0 ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={tone}
    >
      <ChapterScrubber
        chapters={CHAPTERS}
        side="left"
        currentIndex={current}
        rowHeight={22}
        restLength={12}
        peakLength={40}
        radius={2}
        label="Secciones de la página"
        onSelect={(c) => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" })}
      />
    </div>
  );
}

// Named alias
export { SectionRail as Rail };
