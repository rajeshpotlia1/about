import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "About", target: "about" },
  { label: "Research", target: "research" },
  { label: "Publications", target: "publications" },
  { label: "News", target: "community" },
  { label: "Contact", target: "contact" },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "top -80vh",
      onUpdate: (self) => {
        setVisible(self.progress > 0);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: visible ? 0 : -20,
        opacity: visible ? 1 : 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [visible]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 opacity-0 -translate-y-5"
    >
      <div
        className={`transition-all duration-500 ${
          visible
            ? "glass-bg border-b border-solar/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            data-scroll-to="hero"
            className="font-display text-xl text-solar tracking-tight"
          >
            RP.
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                data-scroll-to={link.target}
                className="relative text-xs uppercase tracking-[0.15em] text-starlight/80 hover:text-solar transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-solar transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-solar p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-bg border-b border-solar/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                data-scroll-to={link.target}
                className="text-sm uppercase tracking-[0.15em] text-starlight/80 hover:text-solar transition-colors duration-300"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
