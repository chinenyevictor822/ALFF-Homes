import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Collection", href: "#collection" },
    { label: "Our Narrative", href: "#narrative" },
    { label: "Services", href: "#services" },
    { label: "Credentials", href: "#credentials" }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-brand-ivory/90 backdrop-blur-md border-b border-brand-stone py-4 shadow-xs"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <a
            href="#"
            className="group flex flex-col focus:outline-hidden"
            aria-label="ALFF HOMES Home"
          >
            <span className="font-serif text-xl md:text-2xl tracking-[0.12em] text-brand-charcoal transition-all duration-300 font-medium">
              ALFF HOMES
            </span>
            <span className="text-[7.5px] uppercase tracking-[0.38em] text-brand-taupe transition-colors group-hover:text-brand-bronze -mt-1 font-semibold">
              LTD — Est. 2021
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/80 hover:text-brand-bronze font-medium transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-brand-bronze after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden md:block">
            <a
              href="#enquiry"
              onClick={(e) => handleLinkClick(e, "#enquiry")}
              className="group inline-flex items-center justify-center border border-brand-charcoal px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-ivory transition-all duration-500 font-medium ease-out"
            >
              <span>Private Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-charcoal hover:text-brand-bronze p-1.5 focus:outline-hidden"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Elegant Mobile Menu Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-ivory transition-all duration-700 ease-out-quint flex flex-col justify-between p-8 pt-28 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        <div className="flex flex-col space-y-8 mt-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-taupe border-b border-brand-stone pb-2 font-medium">
            Discover ALFF HOMES
          </span>
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-serif text-3xl text-brand-charcoal hover:text-brand-bronze transition-colors duration-300 block"
              style={{
                transitionDelay: `${idx * 75}ms`
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col space-y-6">
          <a
            href="#enquiry"
            onClick={(e) => handleLinkClick(e, "#enquiry")}
            className="flex items-center justify-between border-b border-brand-charcoal py-4 text-xs uppercase tracking-[0.2em] text-brand-charcoal font-medium hover:text-brand-bronze transition-colors"
          >
            <span>Begin Private Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <div className="text-[10px] text-brand-taupe tracking-wider leading-relaxed">
            <p>© {new Date().getFullYear()} ALFF HOMES LTD.</p>
            <p className="mt-1">Lagos • Port Harcourt, Nigeria</p>
          </div>
        </div>
      </div>
    </>
  );
}
