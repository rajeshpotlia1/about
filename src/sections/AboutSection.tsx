import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column staggered reveal
      if (leftRef.current) {
        const leftEls = leftRef.current.querySelectorAll(".reveal-item");
        gsap.from(leftEls, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }

      // Right column portrait reveal
      if (rightRef.current) {
        gsap.from(rightRef.current.querySelector(".portrait-frame"), {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }

      // Stats count-up animation
      statRefs.current.forEach((statEl) => {
        if (!statEl) return;
        const isDecimal = statEl.dataset.suffix === "+";

        gsap.from(statEl, {
          textContent: 0,
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: isDecimal ? 0.1 : 1 },
          scrollTrigger: {
            trigger: statEl,
            start: "top 85%",
          },
          onUpdate: function () {
            const val = parseFloat(statEl.textContent || "0");
            if (isDecimal) {
              statEl.textContent = Math.round(val) + "+";
            } else {
              statEl.textContent = String(Math.round(val));
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 py-[clamp(80px,12vh,160px)] px-6 md:px-10"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(107, 78, 230, 0.04) 0%, transparent 60%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">
        {/* Left Column — Bio */}
        <div ref={leftRef} className="order-2 lg:order-1">
          <SectionLabel text="01 — ABOUT" className="reveal-item mb-6" />

          <h2
            className="reveal-item font-sans font-semibold text-starlight leading-tight mb-8"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Studying the{" "}
            <span className="text-solar">Invisible Architecture</span> of
            Galaxies
          </h2>

          <div className="space-y-5 mb-8">
            <p className="reveal-item text-stardust leading-[1.75] max-w-[520px]">
              I am a PhD researcher at the European Southern Observatory in
              Garching, where I explore the gas-galaxy connection in massive
              surveys and develop multi-phase idealised simulations. My work sits
              at the intersection of observational astronomy and computational
              astrophysics.
            </p>

            <p className="reveal-item text-stardust leading-[1.75] max-w-[520px]">
              Before joining ESO, I completed my BS-MS at IISER Mohali and my MS
              thesis at the Indian Institute of Science, Bangalore. I also spent
              time as an intern at the Max Planck Institute for Astrophysics in
              Garching, where I first fell in love with the circumgalactic
              medium — that vast, mysterious reservoir of gas surrounding
              galaxies.
            </p>

            <p className="reveal-item text-stardust leading-[1.75] max-w-[520px]">
              When I'm not debugging simulations or poring over survey data,
              you'll find me helping organize conferences like VLT Beyond 2030,
              AGN-FAAST, and the Exploring the Heavens symposium — bringing
              together astronomers to share what we've learned about the
              universe.
            </p>
          </div>

          {/* Affiliation Badge */}
          <div className="reveal-item inline-flex items-center gap-3 glass-bg border border-solar/10 rounded-full px-5 py-2.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-solar shrink-0"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-sm text-starlight">ESO Garching</span>
            <span className="text-stardust">·</span>
            <span className="font-mono text-sm text-stardust">2025–2029</span>
          </div>
        </div>

        {/* Right Column — Portrait & Stats */}
        <div ref={rightRef} className="order-1 lg:order-2 flex flex-col items-center lg:items-start">
          {/* Portrait Frame */}
          <div className="portrait-frame relative border border-solar/10 rounded-[20px] p-3 max-w-[380px] w-full glow-amber">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src="/portrait.jpg"
                alt="Rajesh Potlia"
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative pulse dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-solar animate-pulse-glow" />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-[380px]">
            <div className="text-center">
              <span
                ref={(el) => { if (el) statRefs.current[0] = el; }}
                data-value="4"
                data-suffix="+"
                className="block font-sans font-semibold text-solar text-2xl"
              >
                0+
              </span>
              <span className="text-[10px] uppercase tracking-[0.08em] text-stardust mt-1 block">
                Conferences Organized
              </span>
            </div>
            <div className="text-center border-x border-solar/10">
              <span
                ref={(el) => { if (el) statRefs.current[1] = el; }}
                data-value="2025"
                className="block font-sans font-semibold text-solar text-2xl"
              >
                0
              </span>
              <span className="text-[10px] uppercase tracking-[0.08em] text-stardust mt-1 block">
                PhD Started
              </span>
            </div>
            <div className="text-center">
              <span
                ref={(el) => { if (el) statRefs.current[2] = el; }}
                data-value="3"
                className="block font-sans font-semibold text-solar text-2xl"
              >
                0
              </span>
              <span className="text-[10px] uppercase tracking-[0.08em] text-stardust mt-1 block">
                Institutions
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
