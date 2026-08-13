import ScrollReveal from "./ScrollReveal";
import { ShieldCheck, Landmark, Award, ArrowRight } from "lucide-react";

export default function Trust() {
  const credentials = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-bronze stroke-[1.2]" />,
      title: "CAC Incorporated",
      subtitle: "Corporate Affairs Commission",
      number: "RC Number: 1840291",
      description: "Fully incorporated under the laws of the Federal Republic of Nigeria, operating with complete corporate transparency and accountability."
    },
    {
      icon: <Landmark className="w-8 h-8 text-brand-bronze stroke-[1.2]" />,
      title: "AEAN Member",
      subtitle: "Association of Estate Agents in Nigeria",
      number: "Member Ref: AEAN/PH/7042",
      description: "Strictly bound by the ethical codes, legal frameworks, and professional standards defined by Nigeria's premier estate agency registry."
    },
    {
      icon: <Award className="w-8 h-8 text-brand-bronze stroke-[1.2]" />,
      title: "Legal Advisory Suite",
      subtitle: "Title and Deed Verification",
      number: "Verified Certificates of Occupancy (C of O)",
      description: "Every property in our private collection undergoes exhaustive legal audits, ensuring undisputed ownership and clean transfers of title."
    }
  ];

  const pathwaySteps = [
    {
      step: "01",
      title: "Discover Typologies",
      desc: "Browse our private digital collection or coordinate custom design parameters with our advisory desk."
    },
    {
      step: "02",
      title: "Explore Coordinates",
      desc: "Analyze climate-conscious thermal blueprints, sun coordinates, passive shading, and localized material profiles."
    },
    {
      step: "03",
      title: "Enquire Briefing",
      desc: "Initiate your secure briefing by generating a WhatsApp or Email placement request via our private concierge."
    },
    {
      step: "04",
      title: "Discrete Consultation",
      desc: "Conduct a secure portfolio consultation at our offices in Lagos or Port Harcourt to customize terms."
    },
    {
      step: "05",
      title: "Secure Proceed",
      desc: "Finalize land surveys, Certificate of Occupancy (C of O) title legal transfers, or initiate custom builds with complete legal protection."
    }
  ];

  return (
    <div className="space-y-0">

      {/* 1. Trust & Compliance Section */}
      <section id="credentials" className="py-24 md:py-32 bg-brand-stone/30 border-t border-b border-brand-stone overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Section Heading Editorial */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <ScrollReveal direction="up" delay={100}>
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block">
                  03 — TRUST & COMPLIANCE
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal leading-tight mt-2">
                  Uncompromising Professional Integrity.
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={200}>
                <p className="font-sans text-xs md:text-sm text-brand-taupe leading-relaxed font-normal">
                  We believe that premium real estate is built upon a foundation of absolute legal security. ALFF HOMES LTD operates with verified credentials, ensuring that your capital and private acquisitions are protected by rigorous regulatory compliance.
                </p>
              </ScrollReveal>
            </div>

            {/* Staggered Credentials Blocks (Restrained, no flashy badges) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {credentials.map((cred, idx) => (
                <ScrollReveal
                  key={cred.title}
                  direction="up"
                  delay={200 + idx * 100}
                  className="flex flex-col space-y-4 text-left"
                >
                  <div className="mb-2">{cred.icon}</div>
                  <h3 className="font-serif text-xl text-brand-charcoal font-medium">
                    {cred.title}
                  </h3>
                  <div className="font-sans text-[10px] uppercase tracking-wider text-brand-taupe space-y-1">
                    <p>{cred.subtitle}</p>
                    <p className="text-brand-bronze font-bold">{cred.number}</p>
                  </div>
                  <p className="font-sans text-xs text-brand-charcoal/70 leading-relaxed pt-2 border-t border-brand-stone/40">
                    {cred.description}
                  </p>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 2. Brand Client Pathway Section */}
      <section className="py-24 md:py-32 bg-brand-ivory overflow-hidden border-b border-brand-stone">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <ScrollReveal direction="up" className="max-w-xl mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-2">
              04 — THE ALFF PATHWAY
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-charcoal leading-tight font-medium">
              A guided journey to private coordinates.
            </h2>
            <p className="font-sans text-xs md:text-sm text-brand-taupe leading-relaxed mt-4">
              Acquiring a structural masterpiece is a deliberate creative sequence. Our five-step pathway guarantees complete guidance from initial digital discovery to secure deed transfer.
            </p>
          </ScrollReveal>

          {/* Clean horizontal timeline for desktop, vertical stack for mobile */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6 lg:gap-8 relative">
            {pathwaySteps.map((step, index) => (
              <ScrollReveal
                key={step.step}
                direction="up"
                delay={100 + index * 100}
                className="flex flex-col space-y-4 text-left group relative"
              >
                <div className="flex items-center justify-between border-b border-brand-stone/60 pb-3">
                  <span className="font-serif text-3xl text-brand-bronze/60 group-hover:text-brand-bronze transition-colors duration-500 font-semibold">
                    {step.step}
                  </span>
                  {index < 4 && (
                    <ArrowRight className="hidden md:block w-4 h-4 text-brand-stone stroke-[1.5]" />
                  )}
                </div>

                <h3 className="font-serif text-lg text-brand-charcoal font-medium">
                  {step.title}
                </h3>

                <p className="font-sans text-[11px] text-brand-taupe leading-relaxed">
                  {step.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
export { Trust as TrustSection };
