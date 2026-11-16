import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { PALETTE_BOOT_SCRIPT, PALETTE_SWITCHER_ENABLED } from "@/lib/palettes";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Proel Medical Technologies | Transformación digital en el cuidado de la salud",
  description:
    "Plataformas que interconectan a los actores del sector salud: Leannec, RP Speciality, TurboSurge y Onco-Office. Gestión de tratamientos de alto costo, trazabilidad ANMAT, automatización en Surge y oncología.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: el script de paleta agrega `data-palette` a <html> antes de hidratar.
    <html lang="es" className={`${publicSans.variable} h-full antialiased`} suppressHydrationWarning>
      {PALETTE_SWITCHER_ENABLED && (
        <head>
          <script dangerouslySetInnerHTML={{ __html: PALETTE_BOOT_SCRIPT }} />
        </head>
      )}
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
