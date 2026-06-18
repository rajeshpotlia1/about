import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    label: "@Rajesh_Potlia_",
    href: "https://x.com/Rajesh_Potlia_",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "ORCID",
    href: "https://orcid.org",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 8h1M9 12v-1M9 16v-5M13 8v8M13 12a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2" />
      </svg>
    ),
  },
  {
    label: "ADS",
    href: "https://ui.adsabs.harvard.edu",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".reveal-item");
      if (items) {
        gsap.from(items, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 py-[clamp(80px,12vh,160px)] px-6 md:px-10"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, rgba(107, 78, 230, 0.08) 0%, transparent 70%)",
      }}
    >
      <div className="max-w-[640px] mx-auto text-center">
        <SectionLabel text="06 — CONTACT" className="reveal-item mb-6 block" />

        <h2
          className="reveal-item font-sans font-semibold text-starlight leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Let's Explore the Universe Together
        </h2>

        <p className="reveal-item text-stardust leading-relaxed mb-10">
          I'm always excited to discuss the circumgalactic medium, galaxy
          formation, or new collaboration ideas. Whether you're a fellow
          astronomer, a student, or just curious about the cosmos — reach out.
        </p>

        {/* Email CTA */}
        <div className="reveal-item mb-10">
          <a
            href="mailto:rpotlia@eso.org"
            className="inline-flex items-center gap-2 font-sans font-medium text-solar transition-all duration-300 hover:underline hover:underline-offset-4 hover:decoration-solar/30 group"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
              textShadow: "0 0 30px rgba(245, 166, 35, 0.1)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.textShadow =
                "0 0 20px rgba(245, 166, 35, 0.3)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.textShadow =
                "0 0 30px rgba(245, 166, 35, 0.1)";
            }}
          >
            rpotlia@eso.org
            <ArrowUpRight
              className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
              strokeWidth={1.5}
            />
          </a>
        </div>

        {/* Social Links */}
        <div className="reveal-item flex items-center justify-center gap-6 mb-12">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-stardust hover:text-solar transition-colors duration-300"
            >
              {link.icon}
              <span className="font-mono text-sm">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Location */}
        <p className="reveal-item text-[11px] uppercase tracking-[0.08em] text-stardust/70 leading-relaxed">
          European Southern Observatory
          <br />
          Karl-Schwarzschild-Straße 2
          <br />
          85748 Garching bei München · Germany
        </p>
      </div>
    </section>
  );
}
