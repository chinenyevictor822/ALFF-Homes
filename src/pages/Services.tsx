import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import EnquiryDrawer from "../components/EnquiryDrawer";
import { Hammer, Layers, Compass, ArrowRight } from "lucide-react";

export default function Services() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const servicesList = [
    {
      id: "private-build",
      icon: <Hammer className="w-8 h-8 text-brand-bronze stroke-[1.2]" />,
      title: "Private Commission & Build",
      subtitle: "Custom architectural design and physical execution.",
      description: "Commissioning high-end, contemporary estates tailored completely to West African coastal and mainland conditions. We prioritize passive ventilation, solar-aligned shading envelopes, and durable natural materials.",
      whoFor: "Private buyers, families, and family offices looking to commission custom structural sanctuaries.",
      valueToClient: "Timeless custom home architecture engineered to stay cool naturally, built under absolute title compliance and rigorous quality management.",
      ctaLabel: "Inquire About Private Build",
      enquiryIntent: "Request a private viewing"
    },
    {
      id: "portfolio-management",
      icon: <Layers className="w-8 h-8 text-brand-bronze stroke-[1.2]" />,
      title: "Portfolio Management & Placement",
      subtitle: "Discrete property acquisitions and wealth preservation.",
      description: "Discretely coordinating high-value acquisitions and private placements for high-net-worth individuals in premium residential regions of Lagos and Port Harcourt. Protecting physical assets and securing clean property title transfers.",
      whoFor: "Acquisitive families and investment trusts looking to secure premium physical assets with zero disputes.",
      valueToClient: "Absolute legal and professional protection. Direct access to non-public luxury listings with verified Certificate of Occupancy (C of O) parameters.",
      ctaLabel: "Request Portfolio Advisory",
      enquiryIntent: "Investment enquiry"
    },
    {
      id: "architectural-consulting",
      icon: <Compass className="w-8 h-8 text-brand-bronze stroke-[1.2]" />,
      title: "Architectural & Climatic Consulting",
      subtitle: "Climatic engineering audits and ecological planning.",
      description: "Consulting on daily structural solar orientation, natural cross-ventilation tunnels, double-skin terracotta facades, local material procurement frameworks, and high thermal mass cooling materials.",
      whoFor: "Developers and private clients looking to audit plans for passive thermal cooling, environmental performance, and localized materiality.",
      valueToClient: "Significantly reduced electricity/active HVAC dependencies, optimized natural light framing, and locally-sourced materials that lower operational costs.",
      ctaLabel: "Initiate Consulting Brief",
      enquiryIntent: "General property enquiry"
    }
  ];

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div className="pt-28 pb-24 bg-brand-ivory text-brand-charcoal min-h-screen">
      <header className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <ScrollReveal direction="up" className="max-w-3xl">
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-3">
            02 — OUR SERVICES
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-brand-charcoal leading-[1.1] mb-8 font-medium">
            Services
          </h1>
          <p className="font-sans text-sm md:text-base text-brand-taupe leading-relaxed max-w-2xl">
            ALFF HOMES LTD operates as a multi-disciplinary architecture and private real estate advisory firm. We offer customized structural solutions engineered to preserve multigenerational wealth and support tropical thermal comfort.
          </p>
        </ScrollReveal>
      </header>

      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 md:space-y-36">
        {servicesList.map((service, idx) => (
          <div
            key={service.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-b border-brand-stone/40 pb-16 md:pb-24 last:border-0 last:pb-0"
          >
            <div className="lg:col-span-5 space-y-4">
              <ScrollReveal direction="up" className="flex items-center gap-4">
                <div className="p-3 bg-brand-stone/30 rounded-full">{service.icon}</div>
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-brand-bronze font-bold block">
                    SERVICE PORTFOLIO 0{idx + 1}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal font-medium">{service.title}</h2>
                </div>
              </ScrollReveal>
              <p className="font-sans text-xs md:text-sm text-brand-taupe italic pl-16">
                {service.subtitle}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal direction="up" delay={150}>
                <p className="font-sans text-xs md:text-sm text-brand-charcoal/80 leading-relaxed font-normal">
                  {service.description}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2 p-5 bg-brand-stone/10 border-l border-brand-bronze">
                  <h4 className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">CLIENT BASE</h4>
                  <p className="font-sans text-xs text-brand-charcoal/85 leading-relaxed">{service.whoFor}</p>
                </div>
                <div className="space-y-2 p-5 bg-brand-stone/10 border-l border-brand-bronze">
                  <h4 className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">VALUE PROPOSITION</h4>
                  <p className="font-sans text-xs text-brand-charcoal/85 leading-relaxed">{service.valueToClient}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={250} className="pt-6">
                <button
                  onClick={handleOpenDrawer}
                  className="group inline-flex items-center gap-2.5 text-xs uppercase tracking-widest text-brand-charcoal hover:text-brand-bronze font-semibold transition-colors duration-300 focus:outline-hidden cursor-pointer"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </ScrollReveal>
            </div>
          </div>
        ))}
      </section>

      <EnquiryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        property={undefined}
      />
    </div>
  );
}
export { Services };
