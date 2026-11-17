"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { LINKS } from "@/constants/site";

const FIELD =
  "mt-1.5 block w-full rounded-[4px] border border-white/25 bg-white/10 px-3.5 py-3 text-base text-white placeholder:text-white/60 transition-colors hover:border-white/45 focus:border-white focus:bg-white/15 focus:outline-2 focus:outline-offset-0 focus:outline-white [&>option]:text-ink";

/**
 * Formulario de contacto. Sin servidor: al enviar se abre el correo del visitante
 * con la consulta ya redactada hacia LINKS.email.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    const subject = `Consulta desde la web: ${get("organizacion") || get("nombre")}`;
    const body = [
      `Nombre: ${get("nombre")}`,
      `Organización: ${get("organizacion")}`,
      `Email: ${get("email")}`,
      `Interés: ${get("interes")}`,
      "",
      get("mensaje"),
    ].join("\n");
    window.location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={submit}
      className="relative overflow-hidden rounded-[6px] border border-white/20 bg-white/[0.08] p-6 text-white backdrop-blur-md sm:p-8"
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-grad-edge-white" />
      <h3 className="text-2xl tracking-[-0.02em]">Pedí una demo</h3>
      <p className="mt-2 text-[15px] text-white/85">Contanos qué necesitás y te respondemos a la brevedad.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Nombre y apellido
          <input name="nombre" required autoComplete="name" className={FIELD} />
        </label>
        <label className="text-sm font-medium">
          Organización
          <input name="organizacion" required autoComplete="organization" className={FIELD} />
        </label>
        <label className="text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className={FIELD} />
        </label>
        <label className="text-sm font-medium">
          Producto de interés
          <span className="relative block">
            <select name="interes" defaultValue="Todos" className={`${FIELD} appearance-none pr-10`}>
              <option>Todos</option>
              <option>RP Speciality</option>
              <option>Leannec</option>
              <option>Onco-Office</option>
              <option>TurboSurge</option>
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-white/80" />
          </span>
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          Mensaje
          <textarea name="mensaje" rows={3} className={FIELD} />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex h-12 items-center rounded-[4px] bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-accent"
      >
        Enviar consulta
      </button>
      <p className="mt-3 text-sm text-white/80" role="status">
        {sent
          ? "Se abrió tu correo con la consulta lista. Si no se abrió, escribinos directamente a la dirección de la izquierda."
          : "Al enviar se abre tu correo con la consulta ya redactada."}
      </p>
    </form>
  );
}
