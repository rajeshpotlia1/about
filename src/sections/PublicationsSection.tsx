import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const PUBLICATIONS = [
  {
    year: "—",
    title: "Coming Soon",
    authors: "",
    journal: "",
    link: "#",
  },
];


export default function PublicationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      const headers = sectionRef.current?.querySelectorAll(".reveal-header");
      if (headers) {
        gsap.from(headers, {
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

      // Publication items slide in from left
      if (listRef.current) {
        const items = listRef.current.querySelectorAll(".pub-item");
        gsap.from(items, {
          x: -30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="relative z-10 py-[clamp(80px,12vh,160px)] px-6 md:px-10 bg-nebula-indigo"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <SectionLabel
          text="04 — PUBLICATIONS"
          className="reveal-header mb-6 block"
        />
        <h2
          className="reveal-header font-sans font-semibold text-starlight leading-tight mb-12"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Papers &amp; Contributions
        </h2>

        {/* Publications List */}
        <div ref={listRef} className="space-y-0">
          {PUBLICATIONS.map((pub, i) => (
            <div
              key={i}
              className="pub-item group border-t border-solar/10 py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-6"
            >
              {/* Year Badge */}
              <span className="shrink-0 inline-flex items-center glass-bg border border-solar/10 rounded-full px-3 py-1 font-mono text-xs text-stardust w-fit">
                {pub.year}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <a
                  href={pub.link}
                  className="block group/title"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="font-sans font-medium text-starlight text-base md:text-lg leading-snug group-hover/title:text-solar transition-colors duration-300 inline">
                    {pub.title}
                  </h3>
                  <ArrowUpRight
                    className="inline-block ml-2 w-4 h-4 text-stardust group-hover/title:text-solar transition-colors duration-300 shrink-0"
                    strokeWidth={1.5}
                  />
                </a>
                <p className="text-stardust text-sm mt-2">
                  {pub.authors.split("R. Potlia").map((part, idx, arr) => (
                    <span key={idx}>
                      {part}
                      {idx < arr.length - 1 && (
                        <span className="text-solar">R. Potlia</span>
                      )}
                    </span>
                  ))}
                </p>
                <p className="font-mono text-xs text-stardust/70 mt-1">
                  {pub.journal}
                </p>
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-solar/10" />
        </div>
      </div>
    </section>
  );
}
