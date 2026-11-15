"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ChapterScrubber } from "@/components/ruixen/chapter-scrubber";

const CHAPTERS = [
  { id: "top", title: "Inicio", description: "Gestionamos tratamientos médicos de punta a punta." },
  { id: "nosotros", title: "Nosotros", description: "Quiénes somos y nuestra trayectoria desde 2009." },
  { id: "productos", title: "Productos", description: "RP Speciality, Leannec y TurboSurge sobre una misma plataforma." },
  { id: "clientes", title: "Clientes", description: "Testimonios y organizaciones que confían en Proel." },
  { id: "contacto", title: "Contacto", description: "Pedí una demo o escribinos." },
];
const DARK = new Set(["top", "productos", "contacto"]);

/**
 * Riel lateral de secciones (bloque Chapter Scrubber de Ruixen). Solo en pantallas anchas:
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

  // Sobre secciones oscuras las marcas pasan a blanco y la activa a turquesa claro.
  const dark = DARK.has(CHAPTERS[current]?.id);
  const tone = {
    "--rail-tick": dark ? "#ffffff" : "#111827",
    "--rail-current": dark ? "#67C8DA" : "#0E7490",
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
