import ScrollReveal from "../components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight, Landmark, ShieldCheck, Compass } from "lucide-react";

export default function About() {
  return (
    <div className="pt-28 pb-24 bg-brand-ivory text-brand-charcoal min-h-screen">

      {/* Editorial Page Introduction */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <ScrollReveal direction="up" className="max-w-3xl">
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-3">
            01 — THE STORY
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-brand-charcoal leading-[1.1] mb-8 font-medium">
            Calibrated for West African light.
          </h1>
          <p className="font-sans text-sm md:text-base text-brand-taupe leading-relaxed max-w-2xl">
            Established in 2021, ALFF HOMES LTD was founded to challenge the status quo of West African luxury real estate. Rejecting generic, copy-paste templates and flashy clichéd aesthetics, our studio focuses on creating deeply intentional architectural sanctuaries.
          </p>
        </ScrollReveal>
      </header>

      {/* Philosophy Blockquote Layout (whitespace, typography-led) */}
      <section className="bg-brand-stone/10 border-t border-b border-brand-stone py-20 md:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ScrollReveal direction="up">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-bronze font-bold block mb-4">
              OUR BELIEF
            </span>
            <p className="font-serif italic text-2xl md:text-4xl text-brand-charcoal leading-relaxed max-w-3xl mx-auto">
              "True luxury is not defined by ornamentation, but by spatial breathing room, structural integrity, and absolute alignment with the native environment."
            </p>
            <p className="font-sans text-[10px] uppercase tracking-widest text-brand-taupe mt-6 font-semibold">
              ALFF HOMES DESIGN THESIS
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Structured Story & Core Pillars */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="up">
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-2">
                02 — THE APPROACH
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal leading-tight">
                Architectural poetry in physical form.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={150}>
              <div className="font-sans text-xs md:text-sm text-brand-charcoal/80 space-y-6 leading-relaxed">
                <p>
                  Our homes are designed as responsive microclimates. By analyzing daily solar path coordinates and wind currents in Lagos and Port Harcourt, our partner architects engineer cross-ventilation tunnels and deep-shaded double-skin facades. This significantly lowers interior ambient temperature naturally, offering a serene thermal envelope.
                </p>
                <p>
                  We rely strictly on high-integrity, local materials including hand-carved slate, polished terrazzo, oil-rubbed native iroko timber, and durable volcanic stones. This results in buildings that grow more beautiful as they age in the humid tropical climate, anchoring both visual beauty and long-term asset value.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Values & Commitments */}
          <div className="lg:col-span-6 space-y-8 lg:pt-12">

            <ScrollReveal direction="left" className="flex gap-6 border-b border-brand-stone/60 pb-6">
              <div className="w-10 h-10 bg-brand-stone/20 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-brand-bronze" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-brand-charcoal font-medium">Verified Credentials</h3>
                <p className="font-sans text-xs text-brand-taupe leading-relaxed">
                  Every property we represent undergoes exhausting title checks and compliance registrations (AEAN and CAC authorized), protecting your investment capital.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={100} className="flex gap-6 border-b border-brand-stone/60 pb-6">
              <div className="w-10 h-10 bg-brand-stone/20 rounded-full flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5 text-brand-bronze" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-brand-charcoal font-medium">Discrete Placement</h3>
                <p className="font-sans text-xs text-brand-taupe leading-relaxed">
                  We operate as private advisors, facilitating acquisitions and walk-throughs with absolute client-side confidentiality.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200} className="flex gap-6 pb-6">
              <div className="w-10 h-10 bg-brand-stone/20 rounded-full flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-brand-bronze" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-brand-charcoal font-medium">Climate-Responsive Design</h3>
                <p className="font-sans text-xs text-brand-taupe leading-relaxed">
                  Harnessing West African light, natural ventilation, and shaded canopies rather than heavy energy-dependent cooling systems.
                </p>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* Editorial CTA Panel (Generous breathing room) */}
      <section className="bg-brand-charcoal text-brand-ivory py-24 md:py-36 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <ScrollReveal direction="up" className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block">
              ENGAGE — PRIVATE DESK
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-ivory leading-tight max-w-2xl mx-auto">
              Ready to explore our private sanctuary collection?
            </h2>
            <p className="font-sans text-xs md:text-sm text-brand-ivory/60 max-w-md mx-auto leading-relaxed">
              Arrange an exclusive walkthrough or consult with our private placement directors in Lagos or Port Harcourt.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/properties"
              className="bg-brand-bronze hover:bg-brand-bronze-dark text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <span>Browse Portfolio Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/"
              className="border border-brand-ivory/20 hover:border-brand-ivory text-brand-ivory px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-colors duration-300 flex items-center justify-center"
            >
              <span>Consult with an Advisor</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
export { About };
