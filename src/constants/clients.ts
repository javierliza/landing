import type { Client, Testimonial } from "@/types";

/** Testimonios publicados en proelmedtech.com. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Mediante Proel integramos la gestión de compra de medicamentos de alto costo en todas las delegaciones del interior del país.",
    who: "Ricardo Altamirano",
    org: "OSPIA",
  },
  {
    quote:
      "Proel es una herramienta de trabajo práctica y eficaz, que brinda transparencia en la gestión de compra. Indispensable en este siglo XXI para las organizaciones de la salud.",
    who: "Elizabeth Borja",
    org: "OSTEL",
  },
  {
    quote:
      "La última versión de Proel es muy interesante y rápida, sobre todo en la dispensación de medicamentos ante la ANMAT.",
    who: "Leopoldo Festino",
    org: "Farmacia Gran Pacífico",
  },
];

/**
 * Clientes publicados en proelmedtech.com y leannec.com. Los logos (public/clients/) provienen de ambos sitios.
 */
export const CLIENTS: Client[] = [
  { name: "OSPIA" },
  { name: "OSTEL", logo: "/clients/ostel.jpg" },
  { name: "OSFATUN", logo: "/clients/osfatun.svg" },
  { name: "OSPAT", logo: "/clients/ospat.svg" },
  { name: "Farmacity", logo: "/clients/farmacity.svg" },
  { name: "OSPLAD", logo: "/clients/osplad.jpg" },
  { name: "Red Salud", logo: "/clients/red-salud.jpg" },
  { name: "ANDAR", logo: "/clients/andar.jpg" },
  { name: "OSDIPP", logo: "/clients/osdipp.jpg" },
  { name: "Avantfar", logo: "/clients/avantfar.jpg" },
  { name: "SETIA", logo: "/clients/setia.jpg" },
  { name: "Farmacia Gran Pacífico" },
  { name: "OSPE", logo: "/clients/ospe.jpg" },
  { name: "OSPEC", logo: "/clients/ospec.jpg" },
  { name: "Cofarma", logo: "/clients/cofarma.jpg" },
  { name: "Drofar", logo: "/clients/drofar.png" },
  { name: "Femani", logo: "/clients/femani.png" },
  { name: "Italfarma", logo: "/clients/italfarma.jpg" },
];
