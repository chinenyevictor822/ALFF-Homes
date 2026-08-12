import { useState } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import DiscoverySection from "./components/DiscoverySection";
import PropertyCard from "./components/PropertyCard";
import Trust from "./components/Trust";
import EnquirySection from "./components/EnquirySection";
import ScrollReveal from "./components/ScrollReveal";
import { properties } from "./data/properties";
import { Compass, Hammer, Layers, ShieldCheck, ArrowRight } from "lucide-react";

export default function App() {
  const [enquiryProperty, setEnquiryProperty] = useState("");

  const handleEnquire = (propertyName: string) => {
    setEnquiryProperty(propertyName);
  };

  const services = [
    {
      icon: <Hammer className="w-5 h-5 text-brand-bronze stroke-[1.5]" />,
      title: "Private Commission & Build",
      description: "Commissioning high-end, contemporary estates tailored completely to West African coastal and mainland conditions, prioritizing passive climate systems and timeless tropical materials."
    },
    {
      icon: <Layers className="w-5 h-5 text-brand-bronze stroke-[1.5]" />,
      title: "Portfolio Management",
      description: "Discretely coordinating high-value acquisitions and private placements for high-net-worth individuals in premium regions of Lagos, Port Harcourt, and select regional capitals."
    },
    {
      icon: <Compass className="w-5 h-5 text-brand-bronze stroke-[1.5]" />,
      title: "Architectural Consulting",
      description: "Consulting on structural orientation, natural shading strategies, local material supply chains, and green building certifications for luxury residential developments."
    }
  ];

  return (
    <div className="relative min-h-screen bg-brand-ivory text-brand-charcoal selection:bg-brand-bronze selection:text-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero / Opening */}
      <HeroSection />

      {/* Discovery / Editorial Thesis */}
      <DiscoverySection />

      {/* Collection / Featured Properties with editorial composition */}
      <section id="collection" className="py-24 md:py-36 border-t border-brand-stone bg-brand-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <ScrollReveal direction="up" className="max-w-xl mb-20 md:mb-28">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-2">
              02 — THE COLLECTION
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal leading-tight">
              Curated Masterpieces
            </h2>
            <p className="font-sans text-xs md:text-sm text-brand-taupe leading-relaxed mt-4">
              A highly private portfolio of single-family estates and urban pavilions representing original creative designs. Each structure is optimized for spatial ventilation, local craftsmanship, and exquisite tropical light.
            </p>
          </ScrollReveal>

          {/* Varied Editorial Composition Layout instead of dense generic grid */}
          <div className="space-y-32">

            {/* Property 1 - Giant Full-Bleed Feature */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              <div className="lg:col-span-8">
                <PropertyCard property={properties[0]} onEnquire={handleEnquire} />
              </div>
              <div className="lg:col-span-4 lg:pt-16 space-y-6">
                <ScrollReveal direction="up" delay={200}>
                  <div className="h-[1px] bg-brand-stone w-12 mb-6" />
                  <span className="text-[10px] uppercase tracking-widest text-brand-taupe font-bold">ARCHITECTURAL SPOTLIGHT</span>
                  <h4 className="font-serif text-2xl text-brand-charcoal mt-2 mb-3">The Obsidian Pavilion</h4>
                  <p className="font-sans text-xs text-brand-taupe leading-relaxed">
                    Set on the elite outer coast of Banana Island, this pavilion acts as a climate-responsive boundary between sea and sky. Its high thermal basalt structure ensures cool inner volumes even during peak solar zenith.
                  </p>
                  <ul className="space-y-2 pt-4">
                    <li className="text-[11px] text-brand-charcoal flex items-center gap-2 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-bronze" /> Fully automated climate facade
                    </li>
                    <li className="text-[11px] text-brand-charcoal flex items-center gap-2 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-bronze" /> Discretely secured entry terminal
                    </li>
                  </ul>
                </ScrollReveal>
              </div>
            </div>

            {/* Split Grid for Property 2 & 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-28">
              <div className="space-y-8">
                <PropertyCard property={properties[1]} onEnquire={handleEnquire} />
                <ScrollReveal direction="up" className="p-6 bg-brand-stone/10 border-l border-brand-bronze">
                  <span className="text-[9px] uppercase tracking-widest text-brand-bronze font-bold">STUDIO NOTE</span>
                  <p className="font-sans text-[11px] text-brand-taupe leading-relaxed mt-1">
                    The Stone & Canopy Villa in Port Harcourt utilizes custom slate and locally sourced iroko, celebrating traditional materials with advanced structural execution.
                  </p>
                </ScrollReveal>
              </div>

              <div className="space-y-8 md:pt-20">
                <PropertyCard property={properties[2]} onEnquire={handleEnquire} />
                <ScrollReveal direction="up" className="p-6 bg-brand-stone/10 border-l border-brand-bronze">
                  <span className="text-[9px] uppercase tracking-widest text-brand-bronze font-bold">STUDIO NOTE</span>
                  <p className="font-sans text-[11px] text-brand-taupe leading-relaxed mt-1">
                    The Terracotta Atrium utilizes multi-layered natural clay panels from local artisans, cooling Ikoyi's humid air via native evapotranspiration.
                  </p>
                </ScrollReveal>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Brand / Lifestyle & Services Section */}
      <section id="services" className="py-24 md:py-32 bg-brand-charcoal text-brand-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            {/* Left Column: Vision Statement */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal direction="up">
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-2">
                  03 — OUR SERVICES
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-brand-ivory leading-tight">
                  Beyond Real Estate.
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <p className="font-sans text-xs md:text-sm text-brand-ivory/70 leading-relaxed">
                  We operate as a multi-disciplinary architecture and private real estate advisory firm. Our focus is to deliver exceptional spaces that enhance human well-being, honor cultural context, and preserve wealth through generational physical assets.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300} className="pt-4">
                <a
                  href="#enquiry"
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-bronze hover:text-brand-ivory font-semibold transition-colors duration-300"
                >
                  <span>Inquire About Custom Services</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </ScrollReveal>
            </div>

            {/* Right Column: Services Grid */}
            <div className="lg:col-span-7 space-y-10">
              {services.map((service, index) => (
                <ScrollReveal
                  key={service.title}
                  direction="left"
                  delay={100 + index * 100}
                  className="flex gap-6 border-b border-brand-ivory/10 pb-8 last:border-0 last:pb-0"
                >
                  <div className="w-12 h-12 bg-brand-ivory/5 border border-brand-ivory/10 rounded-full flex items-center justify-center shrink-0">
                    {service.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-brand-ivory font-medium">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs text-brand-ivory/60 leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Trust & Credibility */}
      <Trust />

      {/* Enquiry Form */}
      <EnquirySection prefilledProperty={enquiryProperty} />

      {/* Footer */}
      <footer className="bg-brand-charcoal text-brand-ivory/80 py-16 border-t border-brand-ivory/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.15em] text-brand-ivory font-medium">ALFF HOMES</span>
            <span className="text-[7.5px] uppercase tracking-[0.38em] text-brand-bronze mt-0.5 font-bold">LTD — EST. 2021</span>
          </div>

          <p className="font-sans text-[10px] tracking-wider max-w-md leading-relaxed text-brand-ivory/50">
            © {new Date().getFullYear()} ALFF HOMES LTD. Registered in Nigeria (RC: 1840291). Member of AEAN (AEAN/PH/7042). Designing contemporary African luxury sanctuaries. All rights reserved.
          </p>

          <div className="flex space-x-6 text-xs uppercase tracking-widest text-brand-bronze font-semibold">
            <a href="#" className="hover:text-brand-ivory transition-colors">Back to Top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
