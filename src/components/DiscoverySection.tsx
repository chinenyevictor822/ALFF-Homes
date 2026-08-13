import ScrollReveal from "./ScrollReveal";

export default function DiscoverySection() {
  return (
    <section id="narrative" className="py-24 md:py-36 bg-brand-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Block: Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <ScrollReveal direction="up" delay={100}>
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-2">
                01 — THE CREATIVE THESIS
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-[1.15] max-w-2xl">
                Designing for the West African Tropic.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <p className="font-serif italic text-lg md:text-xl text-brand-taupe leading-relaxed max-w-xl">
                True luxury is defined not by ornamentation, but by spatial breathing room and absolute alignment with the native environment.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="font-sans text-xs md:text-sm text-brand-charcoal/80 leading-relaxed max-w-xl space-y-6">
                <p>
                  At ALFF HOMES, we create architectural structures that respond directly to the unique climatic rhythms and bright tropical light of Lagos and Port Harcourt. Our creative foundation rejects standard templated luxury, choosing instead to celebrate contemporary African living through highly intentional spatial volumes.
                </p>
                <p>
                  We prioritize passive thermal cooling, double-skin terracotta facades, local hand-dressed stones, and deep timber eaves. By blurring the boundaries between interior sanctuaries and lush outer landscape courts, we frame natural light as our primary building material.
                </p>
              </div>
            </ScrollReveal>

            {/* Subtle Brand details list */}
            <ScrollReveal direction="up" delay={400} className="pt-6">
              <div className="grid grid-cols-2 gap-8 border-t border-brand-stone/60 pt-8">
                <div>
                  <h4 className="font-serif text-lg text-brand-charcoal mb-2">Climate-Conscious</h4>
                  <p className="font-sans text-[11px] text-brand-taupe leading-relaxed">
                    High thermal mass materials and double-skin facades naturally insulating against tropical heat.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-brand-charcoal mb-2">Local Materiality</h4>
                  <p className="font-sans text-[11px] text-brand-taupe leading-relaxed">
                    Celebrating oil-rubbed iroko timber, Nigerian granite, and handmade clays crafted by local hands.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Block: Portrait Editorial Imagery */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" delay={200} className="relative">
              {/* Image Frame with offset styling */}
              <div className="aspect-[3/4] w-full overflow-hidden bg-brand-stone hover-zoom-container shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                  alt="Contemporary tropical indoor outdoor architecture"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-bronze/5 mix-blend-multiply pointer-events-none" />
              </div>

              {/* Overlapping text caption */}
              <div className="absolute -bottom-6 -left-6 bg-brand-charcoal text-brand-ivory p-6 hidden md:block max-w-[240px]">
                <p className="font-serif text-xs italic text-brand-bronze">
                  "Light is not merely shed upon a space; it becomes the space."
                </p>
                <p className="font-sans text-[8px] uppercase tracking-widest text-brand-ivory/60 mt-3 font-semibold">
                  ALFF Editorial Studio, 2026
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
