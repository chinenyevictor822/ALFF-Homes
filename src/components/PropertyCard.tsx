import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Property } from "../types/property";
import { Maximize2, X, Sparkles, MapPin, BedDouble, Bath, Square, MessageSquare } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface PropertyCardProps {
  property: Property;
  onEnquire: (propertyName: string) => void;
}

const IMAGE_FALLBACK = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70";

export default function PropertyCard({ property, onEnquire }: PropertyCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(property.imageUrl);

  useEffect(() => {
    setImageSrc(property.imageUrl);
  }, [property.imageUrl]);

  useEffect(() => {
    if (!isQuickViewOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsQuickViewOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQuickViewOpen]);

  const handleImageError = () => {
    if (imageSrc !== IMAGE_FALLBACK) setImageSrc(IMAGE_FALLBACK);
  };

  return (
    <>
      <ScrollReveal direction="up" className="group">
        <div className="flex flex-col bg-transparent border-b border-brand-stone pb-8 overflow-hidden">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-stone hover-zoom-container">
            <Link to={`/properties/${property.id}`} className="block w-full h-full cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-brand-bronze focus:ring-inset" aria-label={`View ${property.title}`}>
              <img src={imageSrc} onError={handleImageError} alt={`${property.title} in ${property.location}`} className="w-full h-full object-cover object-center" loading="lazy" />
              <div className="absolute inset-0 bg-brand-charcoal/10 group-hover:bg-brand-charcoal/20 transition-all duration-700" />
            </Link>

            <button
              type="button"
              onClick={() => setIsQuickViewOpen(true)}
              className="absolute bottom-4 right-4 bg-brand-ivory/95 backdrop-blur-xs text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-ivory p-3 transition-colors duration-500 rounded-full shadow-md focus:outline-hidden focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2 z-10"
              aria-label={`Quick View ${property.title}`}
            >
              <Maximize2 className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>

          <div className="mt-6 flex flex-col space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <Link to={`/properties/${property.id}`} className="focus:outline-hidden focus:ring-2 focus:ring-brand-bronze">
                <h3 className="font-serif text-2xl text-brand-charcoal hover:text-brand-bronze transition-colors duration-500 font-medium">{property.title}</h3>
              </Link>
              <span className="font-sans text-xs tracking-widest text-brand-taupe uppercase shrink-0">{property.size}</span>
            </div>

            <p className="text-xs uppercase tracking-widest text-brand-bronze flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5 stroke-[1.5]" /> {property.location}
            </p>

            <p className="text-sm text-brand-taupe line-clamp-2 font-normal leading-relaxed">{property.description}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-2 border-t border-brand-stone/40 border-b border-brand-stone/40 text-brand-charcoal/80 text-xs">
              <span className="flex items-center gap-1.5 font-medium"><BedDouble className="w-4 h-4 text-brand-taupe stroke-[1.5]" />{property.bedrooms} Beds</span>
              <span className="flex items-center gap-1.5 font-medium"><Bath className="w-4 h-4 text-brand-taupe stroke-[1.5]" />{property.bathrooms} Baths</span>
              <span className="flex items-center gap-1.5 font-medium"><Square className="w-3.5 h-3.5 text-brand-taupe stroke-[1.5]" />{property.size}</span>
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-brand-taupe font-medium">Value Guide</span>
                <span className="font-serif text-xl font-medium text-brand-charcoal">{property.price}</span>
              </div>
              <button
                type="button"
                onClick={() => onEnquire(property.title)}
                className="group/btn inline-flex items-center text-xs uppercase tracking-widest text-brand-charcoal hover:text-brand-bronze font-semibold transition-colors duration-300 focus:outline-hidden focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2"
              >
                <span>Request Private Tour</span>
                <span className="block w-6 h-[1px] bg-brand-charcoal ml-2 transform group-hover/btn:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/70 backdrop-blur-md transition-opacity duration-500" role="dialog" aria-modal="true" aria-labelledby={`quick-view-title-${property.id}`} onClick={() => setIsQuickViewOpen(false)}>
          <div className="bg-brand-ivory w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6 md:p-10 shadow-2xl transition-all duration-700 ease-out translate-y-0" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setIsQuickViewOpen(false)} className="absolute top-4 right-4 md:top-6 md:right-6 text-brand-charcoal hover:text-brand-bronze p-2 bg-brand-stone/40 rounded-full focus:outline-hidden focus:ring-2 focus:ring-brand-bronze" aria-label="Close dialog">
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-4">
              <div className="md:col-span-7 flex flex-col space-y-4">
                <div className="aspect-[4/3] w-full overflow-hidden bg-brand-stone">
                  <img src={imageSrc} onError={handleImageError} alt={`${property.title} in ${property.location}`} className="w-full h-full object-cover" />
                </div>
                <div className="text-[11px] text-brand-taupe tracking-wider flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-brand-bronze" /><span>Artistic composition reflecting natural West African sunlight.</span></div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-bronze font-bold">Curated Discovery</span>
                  <h2 id={`quick-view-title-${property.id}`} className="font-serif text-3xl md:text-4xl text-brand-charcoal mt-2 mb-1">{property.title}</h2>
                  <p className="text-xs uppercase tracking-widest text-brand-taupe font-semibold mb-6 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{property.location}</p>
                  <p className="text-sm text-brand-charcoal/90 leading-relaxed mb-6 font-normal">{property.description}</p>

                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-widest text-brand-charcoal font-semibold mb-3">Distinguishing Elements</h4>
                    <ul className="space-y-1.5">
                      {property.highlights.map((highlight, index) => <li key={index} className="text-xs text-brand-taupe flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-bronze rounded-full" />{highlight}</li>)}
                    </ul>
                  </div>

                  <div className="border-t border-brand-stone pt-6 mb-6">
                    <h4 className="text-xs uppercase tracking-widest text-brand-charcoal font-semibold mb-3">Architectural Profile</h4>
                    <div className="space-y-2">
                      {Object.entries(property.specs).map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-1 sm:flex-row sm:justify-between text-xs py-1 border-b border-brand-stone/30">
                          <span className="text-brand-taupe font-medium">{key}</span>
                          <span className="text-brand-charcoal sm:text-right font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-stone flex flex-col space-y-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-baseline">
                    <span className="text-xs uppercase tracking-widest text-brand-taupe font-medium">Acquisition Value</span>
                    <span className="font-serif text-2xl text-brand-charcoal font-bold">{property.price}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button type="button" onClick={() => { setIsQuickViewOpen(false); onEnquire(property.title); }} className="w-full bg-brand-charcoal text-brand-ivory hover:bg-brand-bronze py-3 text-xs uppercase tracking-widest font-semibold transition-colors duration-500 ease-out-quint flex items-center justify-center gap-2 focus:outline-hidden focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2"><MessageSquare className="w-3.5 h-3.5" /><span>Request Private Brief</span></button>
                    <button type="button" onClick={() => setIsQuickViewOpen(false)} className="w-full border border-brand-stone text-brand-charcoal hover:border-brand-charcoal py-3 text-xs uppercase tracking-widest font-semibold transition-colors duration-500 focus:outline-hidden focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2"><span>Back to Gallery</span></button>
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
