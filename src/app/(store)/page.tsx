import Hero from "@/components/home/hero";
import HowToOderder from "@/components/home/how-to-order";
import CtaMenuSection from "@/components/home/cta-menus";

export default function Home() {
  return (
    <main>
      <Hero />
      <CtaMenuSection />
      <HowToOderder />
    </main>
  );
}
