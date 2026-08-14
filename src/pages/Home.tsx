import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import DiscoverySection from "../components/DiscoverySection";
import PropertyCard from "../components/PropertyCard";
import Trust from "../components/Trust";
import EnquirySection from "../components/EnquirySection";
import ScrollReveal from "../components/ScrollReveal";
import { properties } from "../data/properties";
import { Hammer, Layers, Compass, ShieldCheck, ArrowRight } from "lucide-react";

export default function Home() {
  const [enquiryProperty, setEnquiryProperty] = useState("");
  const location = useLocation();

  // Handle prefilled query parameter (e.g. from /contact flow parameter sync)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const prefill = params.get("enquiry");
    if (prefill) {
      setEnquiryProperty(prefill);
      setTimeout(() => {
        const element = document.getElementById("enquiry");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [location]);

  const handleEnquire = (propertyName: string) => {
    setEnquiryProperty(propertyName);
  };

  const servicesPreview = [
    {
      icon: <Hammer className="w-6 h-6 text-brand-bronze stroke-[1.2]" />,
      title: "Private Commission & Build",
      desc: "Custom architectural design and physical execution tailored strictly to West African coastal and mainland conditions."
    },
    {
      icon: <Layers className="w-6 h-6 text-brand-bronze stroke-[1.2]" />,
      title: "Portfolio Management & Placement",
      desc: "Discrete property acquisitions and private placements with verified Certificate of Occupancy (C of O) audits."
    },
    {
      icon: <Compass className="w-6 h-6 text-brand-bronze stroke-[1.2]" />,
      title: "Climatic Design Consulting",
      desc: "Advising on structural orientation, natural ventilation corridors, local materials, and green standards."
    }
  ];

  return (
    <div className="relative min-h-screen bg-brand-ivory text-brand-charcoal overflow-hidden">
      {/* Hero / Opening */}
      <HeroSection />

      {/* Discovery / Editorial Thesis */}
      <DiscoverySection />

      {/* Brand Statement Section (Capturing the About Narrative Statement on Home) */}
      <section className="bg-brand-stone/10 border-t border-b border-brand-stone py-24 md:py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <ScrollReveal direction="up">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-2">
              02 — BRAND VISION
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-brand-charcoal leading-tight max-w-3xl mx-auto">
              We build responsive microclimates, challenging clichéd real-estate formulas.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <p className="font-sans text-xs md:text-sm text-brand-taupe max-w-xl mx-auto leading-relaxed">
              Every home we represent is designed around daily solar path coordinates and local material life-cycles. We believe physical structures should grow more beautiful as they age in tropical environments.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={300} className="pt-4">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-charcoal hover:text-brand-bronze font-semibold transition-colors focus:outline-hidden"
            >
              <span>Explore Our Full Narrative</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Collection / Featured Properties with editorial composition */}
      <section id="collection" className="py-24 md:py-36 bg-brand-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <ScrollReveal direction="up" className="max-w-xl mb-20 md:mb-28">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-2">
              03 — FEATURED MASTERPIECES
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal leading-tight font-medium">
              Sanctuaries in Focus
            </h2>
            <p className="font-sans text-xs md:text-sm text-brand-taupe leading-relaxed mt-4">
              A private portfolio of single-family estates and urban pavilions representing original creative designs. Each structure is optimized for spatial ventilation, local craftsmanship, and exquisite tropical light.
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
                  <h4 className="font-serif text-2xl text-brand-charcoal mt-2 mb-3 font-medium">The Obsidian Pavilion</h4>
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
                  <div className="pt-4">
                    <Link
                      to={`/properties/${properties[0].id}`}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-bronze hover:text-brand-charcoal font-semibold transition-colors duration-300 focus:outline-hidden"
                    >
                      <span>Examine Blueprints</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Split Grid for Property 2 & 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-28">
              <div className="space-y-8">
                <PropertyCard property={properties[1]} onEnquire={handleEnquire} />
                <div className="pt-2">
                  <Link
                    to={`/properties/${properties[1].id}`}
                    className="inline-flex items-center text-xs uppercase tracking-widest text-brand-bronze hover:text-brand-charcoal font-semibold transition-colors"
                  >
                    <span>Examine Blueprints</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Link>
                </div>
              </div>

              <div className="space-y-8 md:pt-20">
                <PropertyCard property={properties[2]} onEnquire={handleEnquire} />
                <div className="pt-2">
                  <Link
                    to={`/properties/${properties[2].id}`}
                    className="inline-flex items-center text-xs uppercase tracking-widest text-brand-bronze hover:text-brand-charcoal font-semibold transition-colors"
                  >
                    <span>Examine Blueprints</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center pt-20">
            <Link
              to="/properties"
              className="group inline-flex items-center justify-center border border-brand-charcoal px-8 py-4 text-xs uppercase tracking-[0.25em] text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-ivory transition-all duration-500 font-semibold"
            >
              <span>Explore Complete Collection</span>
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* Services Preview Section (Concise, Editorial Preview answering 'How can we help?') */}
      <section className="py-24 md:py-32 bg-brand-charcoal text-brand-ivory border-t border-brand-ivory/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal direction="up">
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-2">
                  04 — SERVICES PREVIEW
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-brand-ivory leading-tight font-medium">
                  Multi-Disciplinary Expertise
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={200}>
                <p className="font-sans text-xs md:text-sm text-brand-ivory/70 leading-relaxed">
                  We operate as a customized advisory desk, securing physical wealth through meticulous climate engineering, complete title protection, and discrete portfolio placement.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={300} className="pt-4">
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-bronze hover:text-brand-ivory font-semibold transition-colors duration-300"
                >
                  <span>Explore Service Portfolios</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicesPreview.map((service, idx) => (
                <ScrollReveal
                  key={service.title}
                  direction="left"
                  delay={100 + idx * 100}
                  className="p-6 bg-brand-ivory/5 border border-brand-ivory/10 hover:border-brand-bronze transition-colors duration-500 text-left space-y-4"
                >
                  <div className="w-10 h-10 bg-brand-ivory/10 flex items-center justify-center rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-lg text-brand-ivory font-medium">{service.title}</h3>
                  <p className="font-sans text-[11px] text-brand-ivory/60 leading-relaxed">{service.desc}</p>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Trust, Credentials & Client Pathway */}
      <Trust />

      {/* Enquiry Form */}
      <EnquirySection prefilledProperty={enquiryProperty} />
    </div>
  );
}
export { Home };
