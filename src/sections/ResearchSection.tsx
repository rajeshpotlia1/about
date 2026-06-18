import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

// SVG Icons for research cards
function CGMIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central galaxy */}
      <ellipse cx="40" cy="40" rx="8" ry="5" fill="#F5A623" opacity="0.8" />
      {/* Inner ring */}
      <ellipse cx="40" cy="40" rx="18" ry="12" stroke="#F5A623" strokeWidth="1" opacity="0.5" />
      {/* Middle ring */}
      <ellipse cx="40" cy="40" rx="28" ry="18" stroke="#6B4EE6" strokeWidth="0.8" opacity="0.35" />
      {/* Outer ring */}
      <ellipse cx="40" cy="40" rx="36" ry="24" stroke="#F5A623" strokeWidth="0.5" opacity="0.2" />
      {/* Gas cloud dots */}
      <circle cx="20" cy="30" r="1.5" fill="#00D4AA" opacity="0.6" />
      <circle cx="58" cy="52" r="1.5" fill="#00D4AA" opacity="0.5" />
      <circle cx="65" cy="35" r="1" fill="#F5A623" opacity="0.4" />
      <circle cx="15" cy="48" r="1" fill="#6B4EE6" opacity="0.4" />
    </svg>
  );
}

function CycleIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circular arrows */}
      <path d="M40 12 A28 28 0 0 1 68 40" stroke="#F5A623" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
      <path d="M40 68 A28 28 0 0 1 12 40" stroke="#F5A623" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
      {/* Arrow heads */}
      <path d="M65 32 L68 40 L60 38" stroke="#F5A623" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 48 L12 40 L20 42" stroke="#F5A623" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Galaxy symbol top */}
      <ellipse cx="40" cy="18" rx="5" ry="3" fill="#F5A623" opacity="0.6" />
      {/* Gas cloud dots bottom */}
      <circle cx="36" cy="62" r="2" fill="#00D4AA" opacity="0.5" />
      <circle cx="44" cy="64" r="1.5" fill="#6B4EE6" opacity="0.4" />
    </svg>
  );
}

function MLIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Neural network nodes */}
      {/* Layer 1 */}
      <circle cx="20" cy="20" r="3" fill="#F5A623" opacity="0.7" />
      <circle cx="20" cy="40" r="3" fill="#F5A623" opacity="0.7" />
      <circle cx="20" cy="60" r="3" fill="#F5A623" opacity="0.7" />
      {/* Layer 2 */}
      <circle cx="40" cy="20" r="3" fill="#6B4EE6" opacity="0.7" />
      <circle cx="40" cy="40" r="3" fill="#6B4EE6" opacity="0.7" />
      <circle cx="40" cy="60" r="3" fill="#6B4EE6" opacity="0.7" />
      {/* Layer 3 */}
      <circle cx="60" cy="20" r="3" fill="#F5A623" opacity="0.7" />
      <circle cx="60" cy="40" r="3" fill="#F5A623" opacity="0.7" />
      <circle cx="60" cy="60" r="3" fill="#F5A623" opacity="0.7" />
      {/* Connections layer 1 to 2 */}
      <line x1="23" y1="20" x2="37" y2="20" stroke="#F5A623" strokeWidth="0.6" opacity="0.3" />
      <line x1="23" y1="20" x2="37" y2="40" stroke="#F5A623" strokeWidth="0.6" opacity="0.3" />
      <line x1="23" y1="20" x2="37" y2="60" stroke="#F5A623" strokeWidth="0.6" opacity="0.3" />
      <line x1="23" y1="40" x2="37" y2="20" stroke="#F5A623" strokeWidth="0.6" opacity="0.3" />
      <line x1="23" y1="40" x2="37" y2="40" stroke="#F5A623" strokeWidth="0.6" opacity="0.3" />
      <line x1="23" y1="40" x2="37" y2="60" stroke="#F5A623" strokeWidth="0.6" opacity="0.3" />
      <line x1="23" y1="60" x2="37" y2="20" stroke="#F5A623" strokeWidth="0.6" opacity="0.3" />
      <line x1="23" y1="60" x2="37" y2="40" stroke="#F5A623" strokeWidth="0.6" opacity="0.3" />
      <line x1="23" y1="60" x2="37" y2="60" stroke="#F5A623" strokeWidth="0.6" opacity="0.3" />
      {/* Connections layer 2 to 3 */}
      <line x1="43" y1="20" x2="57" y2="20" stroke="#6B4EE6" strokeWidth="0.6" opacity="0.3" />
      <line x1="43" y1="20" x2="57" y2="40" stroke="#6B4EE6" strokeWidth="0.6" opacity="0.3" />
      <line x1="43" y1="20" x2="57" y2="60" stroke="#6B4EE6" strokeWidth="0.6" opacity="0.3" />
      <line x1="43" y1="40" x2="57" y2="20" stroke="#6B4EE6" strokeWidth="0.6" opacity="0.3" />
      <line x1="43" y1="40" x2="57" y2="40" stroke="#6B4EE6" strokeWidth="0.6" opacity="0.3" />
      <line x1="43" y1="40" x2="57" y2="60" stroke="#6B4EE6" strokeWidth="0.6" opacity="0.3" />
      <line x1="43" y1="60" x2="57" y2="20" stroke="#6B4EE6" strokeWidth="0.6" opacity="0.3" />
      <line x1="43" y1="60" x2="57" y2="40" stroke="#6B4EE6" strokeWidth="0.6" opacity="0.3" />
      <line x1="43" y1="60" x2="57" y2="60" stroke="#6B4EE6" strokeWidth="0.6" opacity="0.3" />
    </svg>
  );
}

const RESEARCH_CARDS = [
  {
    icon: <CGMIcon />,
    title: "Circumgalactic Medium",
    description:
      "The CGM is the vast reservoir of gas surrounding galaxies — a chaotic, multi-phase interface where matter cycles between the intergalactic medium and star-forming disks. I study its properties using massive spectroscopic surveys and idealised simulations.",
    tags: ["Surveys", "Simulations", "Multi-phase Gas"],
  },
  {
    icon: <CycleIcon />,
    title: "The Baryon Cycle",
    description:
      "Gas accretes onto galaxies, forms stars, and is expelled through feedback-driven winds. I trace this cosmic baryon cycle — how matter flows in and out of galaxies — to understand why galaxies evolve the way they do.",
    tags: ["Galaxy Evolution", "Feedback", "Cosmology"],
  },
  {
    icon: <MLIcon />,
    title: "Machine Learning in Astrophysics",
    description:
      "I apply ML techniques to classify and analyze massive astronomical datasets — from identifying CGM absorption systems to predicting galaxy properties from survey data. Algorithms help us see patterns invisible to the human eye.",
    tags: ["Deep Learning", "Classification", "Big Data"],
  },
];

export default function ResearchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      const headerEls = sectionRef.current?.querySelectorAll(".reveal-header");
      if (headerEls) {
        gsap.from(headerEls, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }

      // Cards stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".research-card");
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative z-10 py-[clamp(80px,12vh,160px)] px-6 md:px-10"
    >
      {/* Background gradient transition */}
      <div
        className="absolute inset-x-0 top-0 h-[200px] -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #0A0818, transparent)",
        }}
      />

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <SectionLabel text="02 — RESEARCH" className="reveal-header mb-6 block" />
        <h2
          className="reveal-header font-sans font-semibold text-starlight leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          What I Work On
        </h2>
        <p className="reveal-header text-stardust leading-relaxed max-w-[640px] mb-12">
          My research explores how gas flows between galaxies and their
          surroundings, shaping the evolution of cosmic structures over billions
          of years.
        </p>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {RESEARCH_CARDS.map((card, i) => (
            <div
              key={i}
              className="research-card bg-[#13102A] border border-solar/20 rounded-2xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-solar/40 hover:shadow-amber-lg group"
            >
              <div className="mb-6 transition-transform duration-500 group-hover:scale-105">
                {card.icon}
              </div>
              <h3 className="font-sans font-medium text-starlight text-xl mb-4">
                {card.title}
              </h3>
              <p className="text-stardust leading-relaxed text-[0.95rem] mb-6">
                {card.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-halo bg-halo/10 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
