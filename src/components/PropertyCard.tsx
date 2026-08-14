import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Property } from "../types/property";
import { Maximize2, X, Sparkles, MapPin, BedDouble, Bath, Square, MessageSquare } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface PropertyCardProps {
  property: Property;
  onEnquire: (propertyName: string) => void;
}

export default function PropertyCard({ property, onEnquire }: PropertyCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Close Quick View on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isQuickViewOpen) {
        setIsQuickViewOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isQuickViewOpen]);

  return (
    <>
      <ScrollReveal direction="up" className="group">
        <div className="flex flex-col bg-transparent border-b border-brand-stone pb-8 overflow-hidden">

          {/* Hero Image Container with hover zoom linking to full property detail */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-stone hover-zoom-container">
            <Link to={`/properties/${property.id}`} className="block w-full h-full cursor-pointer">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Elegant overlay on hover */}
              <div className="absolute inset-0 bg-brand-charcoal/10 group-hover:bg-brand-charcoal/20 transition-all duration-700" />
            </Link>

            {/* Quick View Button Overlay */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsQuickViewOpen(true);
              }}
              className="absolute bottom-4 right-4 bg-brand-ivory/95 backdrop-blur-xs text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-ivory p-3 transition-colors duration-500 rounded-full shadow-md focus:outline-hidden z-10"
              aria-label={`Quick View ${property.title}`}
            >
              <Maximize2 className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>

          {/* Property Narrative Meta */}
          <div className="mt-6 flex flex-col space-y-3">
            <div className="flex items-baseline justify-between">
              <Link to={`/properties/${property.id}`}>
                <h3 className="font-serif text-2xl text-brand-charcoal hover:text-brand-bronze transition-colors duration-500 font-medium">
                  {property.title}
                </h3>
              </Link>
              <span className="font-sans text-xs tracking-widest text-brand-taupe uppercase">
                {property.size}
              </span>
            </div>

            <p className="text-xs uppercase tracking-widest text-brand-bronze flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5 stroke-[1.5]" />
              {property.location}
            </p>

            <p className="text-sm text-brand-taupe line-clamp-2 font-normal leading-relaxed">
              {property.description}
            </p>

            {/* Micro Specifications */}
            <div className="flex items-center space-x-6 py-2 border-t border-brand-stone/40 border-b border-brand-stone/40 text-brand-charcoal/80 text-xs">
              <span className="flex items-center gap-1.5 font-medium">
                <BedDouble className="w-4 h-4 text-brand-taupe stroke-[1.5]" />
                {property.bedrooms} Beds
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Bath className="w-4 h-4 text-brand-taupe stroke-[1.5]" />
                {property.bathrooms} Baths
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Square className="w-3.5 h-3.5 text-brand-taupe stroke-[1.5]" />
                {property.size}
              </span>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-brand-taupe font-medium">Value Guide</span>
                <span className="font-serif text-xl font-medium text-brand-charcoal">{property.price}</span>
              </div>
              <button
                onClick={() => onEnquire(property.title)}
                className="group/btn inline-flex items-center text-xs uppercase tracking-widest text-brand-charcoal hover:text-brand-bronze font-semibold transition-colors duration-300 focus:outline-hidden"
              >
                <span>Request Private Tour</span>
                <span className="block w-6 h-[1px] bg-brand-charcoal hover:bg-brand-bronze ml-2 transform group-hover/btn:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Keyboard-Accessible Quick View Dialog */}
      {isQuickViewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/70 backdrop-blur-md transition-opacity duration-500"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsQuickViewOpen(false)}
        >
          <div
            className="bg-brand-ivory w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6 md:p-10 shadow-2xl transition-all duration-700 ease-out translate-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-brand-charcoal hover:text-brand-bronze p-2 bg-brand-stone/40 rounded-full focus:outline-hidden"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-4">
              {/* Media gallery visual */}
              <div className="md:col-span-7 flex flex-col space-y-4">
                <div className="aspect-[4/3] w-full overflow-hidden bg-brand-stone">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Visual context caption */}
                <div className="text-[11px] text-brand-taupe tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-bronze" />
                  <span>Artistic composition reflecting natural West African sunlight.</span>
                </div>
              </div>

              {/* Specification layout */}
              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-bronze font-bold">Curated Discovery</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mt-2 mb-1">{property.title}</h2>
                  <p className="text-xs uppercase tracking-widest text-brand-taupe font-semibold mb-6 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {property.location}
                  </p>

                  <p className="text-sm text-brand-charcoal/90 leading-relaxed mb-6 font-normal">
                    {property.description}
                  </p>

                  {/* Highlights section */}
                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-widest text-brand-charcoal font-semibold mb-3">Distinguishing Elements</h4>
                    <ul className="space-y-1.5">
                      {property.highlights.map((highlight, index) => (
                        <li key={index} className="text-xs text-brand-taupe flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-bronze rounded-full" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architectural Specs */}
                  <div className="border-t border-brand-stone pt-6 mb-6">
                    <h4 className="text-xs uppercase tracking-widest text-brand-charcoal font-semibold mb-3">Architectural Profile</h4>
                    <div className="space-y-2">
                      {Object.entries(property.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs py-1 border-b border-brand-stone/30">
                          <span className="text-brand-taupe font-medium">{key}</span>
                          <span className="text-brand-charcoal text-right font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-stone flex flex-col space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-widest text-brand-taupe font-medium">Acquisition Value</span>
                    <span className="font-serif text-2xl text-brand-charcoal font-bold">{property.price}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setIsQuickViewOpen(false);
                        onEnquire(property.title);
                      }}
                      className="w-full bg-brand-charcoal text-brand-ivory hover:bg-brand-bronze py-3 text-xs uppercase tracking-widest font-semibold transition-colors duration-500 ease-out-quint flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Request Private Brief</span>
                    </button>
                    <button
                      onClick={() => setIsQuickViewOpen(false)}
                      className="w-full border border-brand-stone text-brand-charcoal hover:border-brand-charcoal py-3 text-xs uppercase tracking-widest font-semibold transition-colors duration-500"
                    >
                      <span>Back to Gallery</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
