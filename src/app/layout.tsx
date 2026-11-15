import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Proel Medical Technologies | Transformación digital en el cuidado de la salud",
  description:
    "Plataformas que interconectan a los actores del sector salud: Leannec, RP Speciality y TurboSurge. Gestión de tratamientos de alto costo, trazabilidad ANMAT y automatización en Surge.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${publicSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
