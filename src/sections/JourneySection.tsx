import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_ITEMS = [
  {
    year: "2019–2024",
    institution: "IISER Mohali",
    role: "BS-MS, Physics",
    detail: "Built the foundation in physics and astronomy",
    active: false,
  },
  {
    year: "2024–2025",
    institution: "IISc Bangalore",
    role: "MS Thesis",
    detail: "Developed a subgrid model for the multiphase CGM",
    active: false,
  },
  {
    year: "2024",
    institution: "MPA Garching",
    role: "Research Intern",
    detail: "Max Planck Institute for Astrophysics",
    active: false,
  },
  {
    year: "2025–2029",
    institution: "ESO Garching",
    role: "PhD Researcher",
    detail: "With Céline Peroux — gas-galaxy connection & simulations",
    active: true,
  },
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

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

      // Timeline nodes
      if (nodesRef.current) {
        const nodes = nodesRef.current.querySelectorAll(".timeline-item");
        nodes.forEach((node, i) => {
          const dot = node.querySelector(".timeline-dot");
          const content = node.querySelector(".timeline-content");

          gsap.from(dot, {
            scale: 0,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: node,
              start: "top 70%",
            },
            delay: i * 0.2,
          });

          gsap.from(content, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 70%",
            },
            delay: i * 0.2 + 0.15,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative z-10 py-[clamp(80px,12vh,160px)] px-6 md:px-10 bg-space-deep"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <SectionLabel text="03 — JOURNEY" className="reveal-header mb-6 block" />
        <h2
          className="reveal-header font-sans font-semibold text-starlight leading-tight mb-16"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          My Path to the Stars
        </h2>

        {/* Timeline */}
        <div ref={nodesRef} className="relative">
          {/* Connecting line - horizontal on desktop, vertical on mobile */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-px">
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(245, 166, 35, 0.12), transparent)",
              }}
            />
          </div>
          <div className="lg:hidden absolute left-[23px] top-0 bottom-0 w-px">
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(245, 166, 35, 0.12), transparent)",
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {TIMELINE_ITEMS.map((item, i) => (
              <div key={i} className="timeline-item relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
                {/* Date - above on desktop */}
                <div className="timeline-content lg:text-center lg:mb-4 order-2 lg:order-1 flex-1 lg:flex-none ml-12 lg:ml-0">
                  <span className="font-mono text-sm text-solar block mb-1">
                    {item.year}
                  </span>
                  <h3 className="font-sans font-medium text-starlight text-lg mb-1">
                    {item.institution}
                  </h3>
                  <p className="text-stardust text-sm mb-1">{item.role}</p>
                  <p className="text-stardust/70 text-xs max-w-[200px] lg:mx-auto">
                    {item.detail}
                  </p>
                </div>

                {/* Node */}
                <div
                  className={`timeline-dot absolute left-0 lg:relative lg:left-auto lg:order-2 order-1 w-4 h-4 rounded-full border-2 shrink-0 transition-shadow duration-300 ${
                    item.active
                      ? "bg-solar border-solar shadow-[0_0_20px_rgba(245,166,35,0.4)]"
                      : "bg-space-deep border-solar/20"
                  }`}
                  style={{ top: "2px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
