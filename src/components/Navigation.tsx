import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Collection", to: "/properties", isExternal: true },
    { label: "Services", to: "/services", isExternal: true },
    { label: "About", to: "/about", isExternal: true },
    { label: "Credentials", to: "#credentials", isExternal: false }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setIsMobileMenuOpen(false);

    if (link.isExternal) {
      return; // Standard React Router Link will handle it
    }

    e.preventDefault();
    if (location.pathname !== "/") {
      // If not on homepage, navigate home first, then scroll
      navigate(`/${link.to}`);
    } else {
      // If on homepage, smooth scroll directly
      const targetElement = document.querySelector(link.to);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
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
          <Link
            to="/"
            className="group flex flex-col focus:outline-hidden"
            aria-label="ALFF HOMES Home"
          >
            <span className="font-serif text-xl md:text-2xl tracking-[0.12em] text-brand-charcoal transition-all duration-300 font-medium">
              ALFF HOMES
            </span>
            <span className="text-[7.5px] uppercase tracking-[0.38em] text-brand-taupe transition-colors group-hover:text-brand-bronze -mt-1 font-semibold">
              LTD — Est. 2021
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              link.isExternal ? (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-brand-bronze after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left ${
                    location.pathname === link.to ? "text-brand-bronze" : "text-brand-charcoal/80 hover:text-brand-bronze"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/80 hover:text-brand-bronze font-medium transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-brand-bronze after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden md:block">
            <Link
              to="/properties"
              className="group inline-flex items-center justify-center border border-brand-charcoal px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-ivory transition-all duration-500 font-medium ease-out"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
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
        className={`fixed inset-0 z-40 bg-brand-ivory transition-all duration-700 ease-out flex flex-col justify-between p-8 pt-28 md:hidden ${
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
            link.isExternal ? (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-serif text-3xl transition-colors duration-300 block ${
                  location.pathname === link.to ? "text-brand-bronze" : "text-brand-charcoal hover:text-brand-bronze"
                }`}
                style={{
                  transitionDelay: `${idx * 75}ms`
                }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => handleLinkClick(e, link)}
                className="font-serif text-3xl text-brand-charcoal hover:text-brand-bronze transition-colors duration-300 block"
                style={{
                  transitionDelay: `${idx * 75}ms`
                }}
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        <div className="flex flex-col space-y-6">
          <Link
            to="/properties"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between border-b border-brand-charcoal py-4 text-xs uppercase tracking-[0.2em] text-brand-charcoal font-medium hover:text-brand-bronze transition-colors"
          >
            <span>Begin Private Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="text-[10px] text-brand-taupe tracking-wider leading-relaxed">
            <p>© {new Date().getFullYear()} ALFF HOMES LTD.</p>
            <p className="mt-1">Lagos • Port Harcourt, Nigeria</p>
          </div>
        </div>
      </div>
    </>
  );
}
