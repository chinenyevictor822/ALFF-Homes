import ScrollReveal from "./ScrollReveal";
import { ShieldCheck, Landmark, Award } from "lucide-react";

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

  return (
    <section id="credentials" className="py-24 md:py-32 bg-brand-stone/30 border-t border-b border-brand-stone overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Section Heading Editorial */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <ScrollReveal direction="up" delay={100}>
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block">
                02 — TRUST & COMPLIANCE
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal leading-tight mt-2">
                Uncompromising Professional Integrity.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <p className="font-sans text-xs md:text-sm text-brand-taupe leading-relaxed">
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
  );
}
export { Trust as TrustSection };
