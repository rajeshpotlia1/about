import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import ConstellationCanvas from "@/components/ConstellationCanvas";
import Navigation from "@/components/Navigation";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ResearchSection from "@/sections/ResearchSection";
import JourneySection from "@/sections/JourneySection";
import PublicationsSection from "@/sections/PublicationsSection";
import CommunitySection from "@/sections/CommunitySection";
import ContactSection from "@/sections/ContactSection";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Setup navigation scroll links
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[data-scroll-to]');
      if (anchor) {
        e.preventDefault();
        const sectionId = anchor.getAttribute('data-scroll-to');
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) {
            lenis.scrollTo(el, { offset: -80 });
          }
        }
      }
    };

    document.addEventListener('click', handleNavClick);

    return () => {
      document.removeEventListener('click', handleNavClick);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-space-deep">
      <ConstellationCanvas />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ResearchSection />
        <JourneySection />
        <PublicationsSection />
        <CommunitySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
