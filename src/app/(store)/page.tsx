import Hero from "@/components/home/hero";
import HowToOderder from "@/components/home/how-to-order";
import CtaMenuSection from "@/components/home/cta-menus";
import TopSelling from "@/components/home/top-selling";

export default function Home() {
  return (
    <main>
      <Hero />
      <CtaMenuSection />
      <HowToOderder />
      <TopSelling />
    </main>
  );
}
