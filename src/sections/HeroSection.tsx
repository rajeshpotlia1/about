import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Kicker
    tl.fromTo(
      kickerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.3
    );

    // Name
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2 },
      0.6
    );

    // Horizontal rule
    tl.fromTo(
      ruleRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.out" },
      1.2
    );

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      1.4
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      2.0
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-6"
    >
      {/* Kicker */}
      <p
        ref={kickerRef}
        className="text-xs uppercase tracking-[0.15em] text-stardust mb-6 opacity-0"
      >
        PhD Researcher · European Southern Observatory
      </p>

      {/* Name */}
      <h1
        ref={nameRef}
        className="font-display text-solar text-center leading-[1.05] opacity-0"
        style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
      >
        Rajesh Potlia
      </h1>

      {/* Horizontal Rule */}
      <div
        ref={ruleRef}
        className="w-[120px] h-px mt-6 origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, #F5A623, transparent)",
        }}
      />

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="text-starlight font-sans font-medium text-center mt-8 max-w-[640px] opacity-0"
        style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
      >
        Exploring the Circumgalactic Medium &amp; the Cosmic Baryon Cycle
      </p>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <div className="relative w-px h-10 bg-solar/40 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-solar animate-scroll-indicator" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.15em] text-stardust">
          Scroll
        </span>
      </div>
    </section>
  );
}
