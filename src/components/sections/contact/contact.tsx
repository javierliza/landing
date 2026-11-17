"use client";

import { AnimatedLink } from "@/components/ui/animated-link";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { DotRelief } from "@/components/sections/hero/dot-relief";
import { LINKS } from "@/constants/site";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-primary-dark py-16 text-white md:py-24"
    >
      {/* El mismo relieve de puntos de la portada, invertido: nace arriba a la izquierda y se abre hacia abajo a la
          derecha, por detrás del formulario. Quieto y tenue, para cerrar la página con el arte con que abre. */}
      <DotRelief className="pointer-events-none absolute inset-0 size-full -scale-y-100 opacity-70 [mask-image:linear-gradient(to_right,transparent_30%,#000_75%)]" />
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
