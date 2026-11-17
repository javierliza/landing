import type { Chapter, NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Nosotros", href: "nosotros" },
  { label: "Productos", href: "productos" },
  { label: "Clientes", href: "clientes" },
  { label: "Contacto", href: "contacto" },
];

export const CHAPTERS: Chapter[] = [
  { id: "top", title: "Inicio", description: "Gestionamos tratamientos médicos de punta a punta." },
  { id: "nosotros", title: "Nosotros", description: "Quiénes somos y nuestra trayectoria desde 2009." },
  { id: "productos", title: "Productos", description: "RP Speciality, Leannec, TurboSurge y Onco-Office sobre una misma plataforma." },
  { id: "clientes", title: "Clientes", description: "Testimonios y organizaciones que confían en Proel." },
  { id: "contacto", title: "Contacto", description: "Pedí una demo o escribinos." },
];

export const DARK_SECTIONS = new Set(["top", "productos", "contacto"]);
