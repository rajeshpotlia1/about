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
  {
    name: "AGN-FAAST Workshop",
    year: "2026",
    role: "Local Organizing Committee",
    location: "ESO Garching",
    chair: "Vincenzo Mainieri (chair)",
    status: "upcoming" as const,
  },
  {
    name: "Exploring the Heavens: ExpH Symposium",
    year: "2026",
    role: "Local Organizing Committee",
    location: "ESO Garching",
    chair: null,
    status: "upcoming" as const,
  },
  {
    name: "MAVIS 2026",
    year: "2026",
    role: "Local Organizing Committee",
    location: "ESO Garching",
    chair: null,
    status: "upcoming" as const,
  },
];

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headers = sectionRef.current?.querySelectorAll(".reveal-header");
      if (headers?.length) {
        gsap.from(headers, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".conf-card");
        if (cards.length) {
          gsap.from(cards, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              once: true,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative z-10 py-[clamp(80px,12vh,160px)] px-6 md:px-10 bg-space-deep"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel text="05 — COMMUNITY" className="reveal-header mb-6 block" />
        <h2
          className="reveal-header font-sans font-semibold text-starlight leading-tight mb-12"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          News/Updates
        </h2>

        <div ref={cardsRef} className="space-y-4 max-w-[600px]">
          {CONFERENCES.map((conf, i) => (
            <div
              key={i}
              className="conf-card bg-[#13102A] border border-solar/20 rounded-2xl p-6 transition-all duration-300 hover:border-solar/40"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-sans font-medium text-starlight text-base">
                  {conf.name}
                </h3>
                <span
                  className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-mono ${
                    conf.status === "upcoming"
                      ? "bg-halo/10 text-halo"
                      : "bg-stardust/10 text-stardust"
                  }`}
                >
                  {conf.status}
                </span>
              </div>
              <p className="text-stardust text-sm">
                {conf.role} — {conf.location}
              </p>
              {conf.chair && (
                <p className="text-stardust/60 text-xs mt-1">
                  Chair: {conf.chair}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
