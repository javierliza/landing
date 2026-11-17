import { AnimatedLink } from "@/components/ui/animated-link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { ACCESS, LINKS } from "@/constants/site";

const FOOTER_COLUMNS: [string, [string, string][]][] = [
  [
    "Productos",
    [
      ["RP Speciality", LINKS.rp],
      ["Leannec", LINKS.leannec],
      ["Onco-Office", "#productos"],
      ["TurboSurge", "#productos"],
    ],
  ],
  [
    "Compañía",
    [
      ["Nosotros", "#nosotros"],
      ["Clientes", "#clientes"],
      ["Contacto", "#contacto"],
    ],
  ],
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
          {FOOTER_COLUMNS.map(([title, links]) => (
            <div key={title}>
              <p className="text-sm font-semibold text-white">{title}</p>
              <ul className="mt-3 text-[15px] text-on-dark-muted">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <AnimatedLink
                      href={href}
                      showArrow={href.startsWith("http")}
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="py-1.5 text-on-dark-muted transition-colors before:top-[1.75em] hover:text-white"
                    >
                      {label}
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
