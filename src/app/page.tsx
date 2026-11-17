import { RevealObserver } from "@/components/common/reveal-observer";
import { Footer, Navbar, SectionRail } from "@/components/layout";
import { About, Clients, Contact, Hero, Products } from "@/components/sections";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Navbar />
      <SectionRail />
      <main>
        <Hero />
        <About />
        <Products />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
