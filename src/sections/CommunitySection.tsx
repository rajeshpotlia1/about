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
  const imageRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }

      // Conference cards stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".conf-card");
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        });
      }

      // Image reveal
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.97,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
          },
        });
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
        {/* Header */}
        <SectionLabel
          text="05 — COMMUNITY"
          className="reveal-header mb-6 block"
        />
        <h2
          className="reveal-header font-sans font-semibold text-starlight leading-tight mb-12"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Conferences &amp; Organizing
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — Conference Cards */}
          <div ref={cardsRef} className="space-y-4">
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

          {/* Right — Conference Photo */}
          <div ref={imageRef} className="lg:sticky lg:top-32 self-start">
            <div className="relative overflow-hidden rounded-2xl glow-amber">
              <img
                src="/conference.jpg"
                alt="Astronomical conference at ESO"
                className="w-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,3,10,0.5) 0%, transparent 40%)",
                }}
              />
            </div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-stardust mt-4 text-center">
              At the VLT Beyond 2030 workshop, ESO Headquarters
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
