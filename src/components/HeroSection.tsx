import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const handleScrollDown = () => {
    const nextSection = document.querySelector("#narrative");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full bg-brand-charcoal overflow-hidden flex items-center justify-center">
      {/* Cinematic Full-Bleed Background Visual */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
          alt="Contemporary African Luxury Villa dusk"
          className="w-full h-full object-cover object-center scale-100 animate-[image-reveal_1.8s_ease-out-quint]"
          style={{
            animation: "image-reveal 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          }}
        />
        {/* Architectural subtle warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/30 to-brand-charcoal/40" />
      </div>

      {/* Editorial Content Overlays */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full pt-16">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-brand-bronze font-bold mb-6 animate-fade-in">
          ALFF HOMES LTD — PRIVATE PORTFOLIO
        </span>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brand-ivory leading-[1.1] md:leading-[1.05] max-w-4xl tracking-tight mb-8">
          Sanctuaries where West African light meets architectural poetry.
        </h1>

        <p className="font-sans text-xs md:text-sm tracking-[0.2em] text-brand-ivory/80 uppercase max-w-xl leading-relaxed mb-12">
          Spaces worth arriving home to.
        </p>

        {/* Action button / Scroll down indicator */}
        <button
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-3 text-brand-ivory/80 hover:text-brand-bronze transition-colors duration-300 focus:outline-hidden"
          aria-label="Scroll down to explore"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-medium">Explore Narrative</span>
          <div className="w-9 h-9 border border-brand-ivory/30 rounded-full flex items-center justify-center group-hover:border-brand-bronze transition-colors duration-500">
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform duration-500 ease-out" />
          </div>
        </button>
      </div>

      {/* Subtle architectural coordinates on bottom right of Hero */}
      <div className="absolute bottom-8 left-12 hidden lg:flex flex-col text-left text-brand-ivory/50 font-sans text-[9px] tracking-[0.2em] uppercase">
        <span>LOCATIONS</span>
        <span className="text-brand-ivory/80 mt-1">PORT HARCOURT • LAGOS, NIGERIA</span>
      </div>
      <div className="absolute bottom-8 right-12 hidden lg:flex flex-col text-right text-brand-ivory/50 font-sans text-[9px] tracking-[0.2em] uppercase">
        <span>CREATIVE CONTEXT</span>
        <span className="text-brand-ivory/80 mt-1">CONTEMPORARY AFRICAN LUXURY</span>
      </div>
    </section>
  );
}
