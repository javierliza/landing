import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Products } from "@/components/site/products";
import { Clients } from "@/components/site/proof";
import { Contact, Footer } from "@/components/site/closing";
import { RevealObserver } from "@/components/site/brand";
import { SectionRail } from "@/components/site/rail";
import { PaletteSwitcher } from "@/components/site/palette-switcher";
import { PALETTE_SWITCHER_ENABLED } from "@/lib/palettes";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <SectionRail />
      <main>
        <Hero />
        <About />
        <Products />
        <Clients />
        <Contact />
      </main>
      <Footer />
      {PALETTE_SWITCHER_ENABLED && <PaletteSwitcher />}
    </>
  );
}
