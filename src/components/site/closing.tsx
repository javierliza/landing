"use client";

import { useState, type FormEvent } from "react";
import { AnimatedLink } from "@/components/ruixen/animated-link";
import { ButtonCopy } from "@/components/ruixen/button-copy";
import { ACCESS, Container, Label, LINKS, Wordmark } from "./brand";

const FIELD =
  "mt-1.5 block w-full rounded-[4px] border border-white/25 bg-white/10 px-3.5 py-3 text-base text-white placeholder:text-white/60 transition-colors hover:border-white/45 focus:border-white focus:bg-white/15 focus:outline-2 focus:outline-offset-0 focus:outline-white [&>option]:text-ink";

/**
 * Formulario de contacto. No hay servidor: al enviar se abre el correo del visitante
 * con la consulta ya redactada hacia LINKS.email.
 */
function ContactForm() {
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
          <select name="interes" defaultValue="Todos" className={FIELD}>
            <option>Todos</option>
            <option>RP Speciality</option>
            <option>Leannec</option>
            <option>TurboSurge</option>
          </select>
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

export function Contact() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-grad-contact py-16 text-white md:py-24"
    >
      {/* Halos de luz suaves (degradés radiales): uno turquesa claro arriba a la derecha y otro más profundo abajo a la izquierda. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grad-contact-glow"
      />
      <Container className="relative grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-6">
          <Label dark>Contacto</Label>
          <h2 className="reveal mt-8 max-w-[16ch] text-balance text-[34px] leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[52px]">
            Obtené todas las soluciones para gestionar tratamientos médicos
          </h2>
          <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-white/90">
            Trabajamos en cooperación con nuestros clientes: entendemos tus necesidades y adecuamos los servicios de
            forma asistencial y flexible.
          </p>

          <div className="reveal mt-10 border-t border-white/25 pt-6">
            <AnimatedLink
              href={`mailto:${LINKS.email}`}
              className="break-all text-2xl font-semibold tracking-[-0.02em] text-white before:top-[1.3em] before:h-0.5 sm:text-[28px]"
            >
              {LINKS.email}
            </AnimatedLink>
            <div className="mt-4">
              <ButtonCopy
                value={LINKS.email}
                label="Copiar email"
                copiedLabel="Copiado"
                sound={false}
                style={{ borderRadius: 4, fontSize: 14, padding: "10px 14px" }}
              />
            </div>
            <p className="mt-4 text-lg">
              <a href={LINKS.phoneHref} className="inline-block py-1 font-medium hover:underline">
                {LINKS.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="reveal lg:col-span-6">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

const COLS: [string, [string, string][]][] = [
  ["Productos", [["RP Speciality", LINKS.rp], ["Leannec", LINKS.leannec], ["TurboSurge", "#productos"]]],
  ["Compañía", [["Nosotros", "#nosotros"], ["Clientes", "#clientes"], ["Contacto", "#contacto"]]],
  ["Acceso usuarios", ACCESS.map((a) => [a, LINKS.leannec] as [string, string])],
];

export function Footer() {
  return (
    <footer className="bg-ink text-on-dark">
      <Container className="grid gap-10 pb-12 pt-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Wordmark light className="text-[28px]" />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-on-dark-muted">
            Acompañando la evolución hacia la medicina de precisión.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          {COLS.map(([t, links]) => (
            <div key={t}>
              <p className="text-sm font-semibold text-white">{t}</p>
              <ul className="mt-3 text-[15px] text-on-dark-muted">
                {links.map(([l, h]) => (
                  <li key={l}>
                    <AnimatedLink
                      href={h}
                      showArrow={h.startsWith("http")}
                      {...(h.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="py-1.5 text-on-dark-muted transition-colors before:top-[1.75em] hover:text-white"
                    >
                      {l}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <Container>
        <div className="flex flex-col gap-2 border-t border-slate py-6 text-sm text-on-dark-muted sm:flex-row sm:justify-between">
          <p>© 2026 Proel Medical Technologies S.A.</p>
          <p>
            {LINKS.email} · {LINKS.phone}
          </p>
        </div>
      </Container>
    </footer>
  );
}
