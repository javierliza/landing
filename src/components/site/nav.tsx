"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ACCESS, Container, LINKS, Wordmark } from "./brand";

const NAV = [
  ["Nosotros", "nosotros"],
  ["Productos", "productos"],
  ["Clientes", "clientes"],
  ["Contacto", "contacto"],
];

function AccessMenu({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex h-10 items-center gap-1.5 rounded-[4px] border px-3.5 text-sm font-medium transition-colors duration-300 ${
          light ? "border-white/45 bg-white/10 text-white hover:border-white" : "border-line-strong bg-white/70 text-ink hover:border-ink"
        }`}
      >
        Acceso usuarios
        <ChevronDown className={`size-4 transition-transform ${light ? "text-white/70" : "text-gray"} ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div role="menu" className="rise absolute right-0 top-full z-50 mt-1.5 w-56 rounded-[4px] border border-line bg-white py-1 shadow-[0_12px_28px_-16px_rgba(17,24,39,.35)]">
          {ACCESS.map((a) => (
            <a
              key={a}
              role="menuitem"
              href={LINKS.leannec}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-ink hover:bg-chip"
            >
              {a}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  // Sobre la portada el encabezado es un vidrio oscuro (grafito con desenfoque) con texto blanco; al bajar pasa a vidrio claro.
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const light = !scrolled && !menu;

  // Sección activa: la que cruza la franja central de la ventana.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...NAV.map(([, id]) => id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        light ? "border-white/15 bg-ink/75 backdrop-blur-lg" : "border-line/70 bg-white/90 backdrop-blur-lg"
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between gap-6">
        <a href="#top" aria-label="Proel Medical Technologies" className="text-[26px]">
          <Wordmark light={light} className="transition-colors duration-300" />
        </a>
        <nav className="hidden items-center gap-8 text-[15px] font-medium lg:flex" aria-label="Principal">
          {NAV.map(([l, id]) => {
            const on = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={on ? "true" : undefined}
                className={`relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  light ? "after:bg-accent hover:text-white" : "after:bg-primary hover:text-ink"
                } ${on ? `after:scale-x-100 ${light ? "text-white" : "text-ink"}` : `after:scale-x-0 ${light ? "text-white" : "text-slate"}`}`}
              >
                {l}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <AccessMenu light={light} />
          </div>
          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menu}
            className={`grid size-10 place-items-center rounded-[4px] border transition-colors lg:hidden ${light ? "border-white/40 text-white" : "border-line-strong text-ink"}`}
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* progreso de lectura */}
      <motion.div aria-hidden className={`absolute inset-x-0 -bottom-px h-0.5 origin-left ${light ? "bg-accent" : "bg-primary"}`} style={{ scaleX: scrollYProgress }} />

      {menu && (
        <div className="border-t border-line bg-white lg:hidden">
          <Container className="py-2">
            {NAV.map(([l, id], i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenu(false)}
                className="rise block border-b border-line py-3.5 text-[15px] font-medium"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {l}
              </a>
            ))}
            <p className="pb-1 pt-4 text-xs font-medium text-gray">Acceso usuarios</p>
            {ACCESS.map((a) => (
              <a key={a} href={LINKS.leannec} target="_blank" rel="noopener noreferrer" className="block py-2.5 text-[15px]">
                {a}
              </a>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
