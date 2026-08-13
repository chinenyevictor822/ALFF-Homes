import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { properties } from "../data/properties";
import ScrollReveal from "../components/ScrollReveal";
import EnquirySection from "../components/EnquirySection";
import EnquiryDrawer from "../components/EnquiryDrawer";
import { MapPin, ArrowLeft, Ruler, BedDouble, Bath, HelpCircle, ArrowRight } from "lucide-react";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Find the active property
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="pt-32 pb-24 text-center bg-brand-ivory min-h-screen flex flex-col items-center justify-center px-6">
        <HelpCircle className="w-12 h-12 text-brand-bronze mb-6 stroke-[1.2]" />
        <h2 className="font-serif text-3xl text-brand-charcoal mb-4">Masterpiece Not Found</h2>
        <p className="font-sans text-xs md:text-sm text-brand-taupe max-w-sm mb-8 leading-relaxed">
          The property code or portfolio coordinates specified are outside our private registry.
        </p>
        <Link
          to="/properties"
          className="bg-brand-charcoal text-brand-ivory hover:bg-brand-bronze px-6 py-3 text-xs uppercase tracking-widest font-bold transition-colors"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  // Get related properties (excluding current)
  const relatedProperties = properties.filter((p) => p.id !== property.id).slice(0, 2);

  return (
    <div className="bg-brand-ivory min-h-screen text-brand-charcoal">

      {/* Editorial Giant Image Header */}
      <section className="relative h-[65vh] md:h-[75vh] w-full bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover object-center scale-100"
            style={{
              animation: "image-reveal 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}
          />
          {/* Elegant dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/20 to-transparent" />
        </div>

        {/* Back Link Overlay */}
        <div className="absolute top-28 left-6 md:left-12 z-20">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-brand-ivory/95 backdrop-blur-xs text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-ivory text-xs uppercase tracking-widest font-semibold px-4 py-2.5 shadow-sm transition-all duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Collection Overview</span>
          </Link>
        </div>

        {/* Floating title on bottom left */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 z-10">
          <ScrollReveal direction="up" className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.35em] text-brand-bronze font-bold">
              {property.type} PRIVATE COLLECTION
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-brand-ivory leading-tight max-w-4xl font-medium">
              {property.title}
            </h1>
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-brand-ivory/80 flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-brand-bronze" />
              {property.location}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Structural Narrative */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left Block: Poetic Narrative & Amenities */}
          <div className="lg:col-span-7 space-y-12">
            <ScrollReveal direction="up" className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block">
                THE ARCHITECTURAL VISION
              </span>
              <p className="font-serif italic text-xl md:text-2xl text-brand-taupe leading-relaxed">
                "An elite synthesis of tropical climatology and high-end contemporary design."
              </p>
              <div className="font-sans text-xs md:text-sm text-brand-charcoal/80 space-y-6 leading-relaxed">
                <p>{property.description}</p>
                <p>
                  Every aspect of this structure has been calibrated for performance in the West African humid climate. Deep eaved shaded courtyards lower air pressure before it flows through the double-skin exterior envelope, naturally cooling the polished stone floor slabs and minimizing electricity load.
                </p>
              </div>
            </ScrollReveal>

            {/* Core specs cards */}
            <ScrollReveal direction="up" className="grid grid-cols-3 gap-6 border-t border-b border-brand-stone py-8 my-6 text-center">
              <div className="space-y-1">
                <Ruler className="w-5 h-5 mx-auto text-brand-bronze stroke-[1.5]" />
                <p className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">FOOTPRINT</p>
                <p className="font-serif text-lg text-brand-charcoal">{property.size}</p>
              </div>
              <div className="space-y-1">
                <BedDouble className="w-5 h-5 mx-auto text-brand-bronze stroke-[1.5]" />
                <p className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">SUITES</p>
                <p className="font-serif text-lg text-brand-charcoal">{property.bedrooms} Bedrooms</p>
              </div>
              <div className="space-y-1">
                <Bath className="w-5 h-5 mx-auto text-brand-bronze stroke-[1.5]" />
                <p className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">BATHS</p>
                <p className="font-serif text-lg text-brand-charcoal">{property.bathrooms} Bathrooms</p>
              </div>
            </ScrollReveal>

            {/* Distinguishing Elements List */}
            <ScrollReveal direction="up" className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest text-brand-charcoal font-bold">INTEGRATED LUXURY AMENITIES</h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 text-xs text-brand-charcoal py-2 border-b border-brand-stone/30">
                    <span className="w-2 h-2 bg-brand-bronze rounded-full" />
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Block: Technical Specifications */}
          <div className="lg:col-span-5 bg-brand-stone/10 border border-brand-stone p-8 md:p-10 space-y-8">
            <ScrollReveal direction="up">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-bronze font-bold block mb-4">
                SPECIFICATIONS PROFILES
              </span>
              <div className="space-y-4">
                {Object.entries(property.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col py-3 border-b border-brand-stone/40 last:border-0 text-xs">
                    <span className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">{key}</span>
                    <span className="text-brand-charcoal mt-1 font-semibold leading-relaxed">{value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-brand-stone/40 flex flex-col space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-widest text-brand-taupe font-bold">Acquisition Guide</span>
                  <span className="font-serif text-3xl text-brand-charcoal font-bold">{property.price}</span>
                </div>
                <p className="text-[10px] text-brand-taupe italic">
                  * Note: Price represents direct development value guidelines. Client verification required.
                </p>
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="w-full bg-brand-charcoal hover:bg-brand-bronze text-brand-ivory text-center py-4 text-xs uppercase tracking-widest font-semibold transition-colors duration-500 flex items-center justify-center gap-2 cursor-pointer focus:outline-hidden"
                >
                  <span>Initiate Private Acquisition</span>
                </button>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Embedded Prefilled Contact Enquiry Form as fallback */}
      <EnquirySection prefilledProperty={property.title} />

      {/* Slide-over Private Consultation Drawer */}
      <EnquiryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        property={property}
      />

      {/* Related Properties / Collection Recommendations */}
      <section className="py-24 border-t border-brand-stone bg-brand-stone/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal direction="up" className="max-w-xl mb-12">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-2">
              RECOMMENDATIONS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal leading-tight">
              Related Masterpieces
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {relatedProperties.map((p) => (
              <div key={p.id} className="relative group bg-transparent flex flex-col">
                <div className="aspect-[4/3] w-full overflow-hidden bg-brand-stone relative">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-brand-charcoal/10" />
                </div>
                <div className="mt-6 space-y-2">
                  <h3 className="font-serif text-2xl text-brand-charcoal font-medium">{p.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-brand-bronze">{p.location}</p>
                  <p className="text-xs text-brand-taupe line-clamp-2">{p.description}</p>
                  <div className="pt-2">
                    <Link
                      to={`/properties/${p.id}`}
                      className="inline-flex items-center text-xs uppercase tracking-widest text-brand-charcoal hover:text-brand-bronze font-semibold transition-colors"
                    >
                      <span>Explore Coordinates</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
export { PropertyDetail };
