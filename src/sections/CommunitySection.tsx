import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";
gsap.registerPlugin(ScrollTrigger);
const CONFERENCES = [
  {
    name: "VLT Beyond 2030",
    year: "2026",
    role: "Local Organizing Committee",
    location: "ESO Garching",
    chair: "Céline Peroux (co-chair)",
    status: "upcoming" as const,
  },
;
export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      const headers = sectionRef.current?.querySelectorAll(".reveal-header");
      if (headers) {
        gsap.from(headers, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
      // Conference bullet items stagger
      if (cardsRef.current) {
        const items = cardsRef.current.querySelectorAll(".conf-item");
        gsap.from(items, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      // Recalculate all ScrollTrigger positions once layout has settled
      // (fonts, images, or content above this section can shift things
      // after the initial mount, causing triggers to fire in the wrong place
      // or be skipped entirely).
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative z-10 py-[clamp(80px,12vh,160px)] px-6 md:px-10 bg-space-deep text-white"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <SectionLabel
          text="05 — COMMUNITY"
          className="reveal-header mb-6 block text-white"
        />
        <h2
          className="reveal-header font-sans font-semibold text-white leading-tight mb-12"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          News/Updates
        </h2>
        {/* Conference List */}
        <ul ref={cardsRef} className="space-y-5 max-w-[600px]">
          {CONFERENCES.map((conf, i) => (
            <li key={i} className="conf-item flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 rounded-full bg-solar shrink-0"
                aria-hidden="true"
              />
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-sans font-medium text-white text-base">
                    {conf.name}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-mono ${
                      conf.status === "upcoming"
                        ? "bg-halo/10 text-halo"
                        : "bg-stardust/10 text-stardust"
                    }`}
                  >
                    {conf.status}
                  </span>
                </div>
                <p className="text-white/80 text-sm mt-1">
                  {conf.role} — {conf.location}
                </p>
                {conf.chair && (
                  <p className="text-white/60 text-xs mt-1">
                    Chair: {conf.chair}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
