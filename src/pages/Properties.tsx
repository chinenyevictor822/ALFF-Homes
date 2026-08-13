import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { properties } from "../data/properties";
import type { Property } from "../types/property";
import PropertyCard from "../components/PropertyCard";
import ScrollReveal from "../components/ScrollReveal";
import EnquiryDrawer from "../components/EnquiryDrawer";
import { Search, SlidersHorizontal, ArrowUpDown, X, Compass } from "lucide-react";

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedBeds, setSelectedBeds] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number>(2500000000); // Slider max
  const [sortBy, setSortBy] = useState<string>("default");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEnquiryProperty, setSelectedEnquiryProperty] = useState<Property | undefined>(undefined);

  // Available options
  const types = ["All", "Pavilion", "Villa", "Atrium"];
  const locations = ["All", "Lagos", "Port Harcourt"];
  const bedOptions = ["All", "4", "5", "6"];

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Search query match (title, description, location)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (selectedType !== "All") {
      result = result.filter((p) => p.type === selectedType);
    }

    // Location filter
    if (selectedLocation !== "All") {
      result = result.filter((p) => p.location.includes(selectedLocation));
    }

    // Bedrooms filter
    if (selectedBeds !== "All") {
      const bedsNum = parseInt(selectedBeds, 10);
      result = result.filter((p) => p.bedrooms >= bedsNum);
    }

    // Price range filter
    result = result.filter((p) => p.priceValue <= priceRange);

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    }

    return result;
  }, [searchQuery, selectedType, selectedLocation, selectedBeds, priceRange, sortBy]);

  const handleCardEnquire = (propertyName: string) => {
    const prop = properties.find((p) => p.title === propertyName);
    setSelectedEnquiryProperty(prop);
    setIsDrawerOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedLocation("All");
    setSelectedBeds("All");
    setPriceRange(2500000000);
    setSortBy("default");
  };

  return (
    <div className="pt-28 pb-24 bg-brand-ivory min-h-screen">
      {/* Header and Introduction */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <ScrollReveal direction="up" className="max-w-3xl">
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-3">
            EXPLORE — THE PRIVATE PORTFOLIO
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-brand-charcoal leading-tight mb-6">
            The Living Collection
          </h1>
          <p className="font-sans text-sm md:text-base text-brand-taupe leading-relaxed max-w-2xl">
            Discover architectural masterworks curated specifically for their dialogue with West African light, climate, and spatial integrity. Use our private filter below to narrow your search, or request a bespoke search via our concierge.
          </p>
        </ScrollReveal>
      </header>

      {/* Main Filter and Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Desktop Filter Toolbar */}
        <div className="hidden lg:flex flex-col space-y-6 bg-brand-stone/10 border border-brand-stone p-8 mb-12">
          <div className="flex items-center justify-between border-b border-brand-stone/40 pb-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-brand-charcoal font-bold flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-bronze" /> Filter Private Collection
            </span>
            <button
              onClick={handleResetFilters}
              className="text-[10px] uppercase tracking-widest text-brand-taupe hover:text-brand-charcoal transition-colors font-medium border-b border-transparent hover:border-brand-taupe"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-12 gap-6 items-end">
            {/* Search Input */}
            <div className="col-span-3 flex flex-col space-y-2">
              <label htmlFor="search" className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                Search keywords
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Lagoon view, court"
                  className="w-full bg-brand-ivory border-b border-brand-stone focus:border-brand-bronze py-2.5 pl-8 pr-4 text-xs text-brand-charcoal focus:outline-hidden transition-colors"
                />
                <Search className="w-3.5 h-3.5 text-brand-taupe/60 absolute left-2.5 top-3 stroke-[1.5]" />
              </div>
            </div>

            {/* Type */}
            <div className="col-span-2 flex flex-col space-y-2">
              <label htmlFor="type" className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                Architecture Type
              </label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-brand-ivory border-b border-brand-stone focus:border-brand-bronze py-2.5 text-xs text-brand-charcoal focus:outline-hidden transition-colors cursor-pointer"
              >
                {types.map((t) => (
                  <option key={t} value={t}>{t === "All" ? "All Typologies" : t}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="col-span-2 flex flex-col space-y-2">
              <label htmlFor="location" className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                Location
              </label>
              <select
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-brand-ivory border-b border-brand-stone focus:border-brand-bronze py-2.5 text-xs text-brand-charcoal focus:outline-hidden transition-colors cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc === "All" ? "All Regions" : loc}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div className="col-span-2 flex flex-col space-y-2">
              <label htmlFor="beds" className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                Beds (Minimum)
              </label>
              <select
                id="beds"
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                className="w-full bg-brand-ivory border-b border-brand-stone focus:border-brand-bronze py-2.5 text-xs text-brand-charcoal focus:outline-hidden transition-colors cursor-pointer"
              >
                {bedOptions.map((b) => (
                  <option key={b} value={b}>{b === "All" ? "Any Bedrooms" : `${b}+ Beds`}</option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="col-span-3 flex flex-col space-y-2">
              <label htmlFor="sort" className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                Sort Collection
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-brand-ivory border-b border-brand-stone focus:border-brand-bronze py-2.5 pl-8 text-xs text-brand-charcoal focus:outline-hidden transition-colors cursor-pointer"
                >
                  <option value="default">Architectural Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-brand-taupe/60 absolute left-2.5 top-3 stroke-[1.5]" />
              </div>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-brand-stone/40 flex items-center gap-8">
            <div className="flex flex-col space-y-1.5 w-full max-w-md">
              <div className="flex justify-between text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                <span>Value Threshold</span>
                <span className="text-brand-charcoal">Up to ₦ {(priceRange / 1000000).toLocaleString()}M</span>
              </div>
              <input
                type="range"
                min={1000000000}
                max={2500000000}
                step={50000000}
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value, 10))}
                className="w-full accent-brand-bronze cursor-pointer h-1 bg-brand-stone rounded-lg"
              />
            </div>
            <div className="text-[10px] text-brand-taupe italic mt-4">
              Showing properties priced within specified value threshold.
            </div>
          </div>
        </div>

        {/* Mobile Filter Summary Bar */}
        <div className="lg:hidden flex items-center justify-between border border-brand-stone bg-brand-stone/10 p-4 mb-8">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            aria-label="Open mobile filters"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-charcoal font-bold focus:outline-hidden"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-bronze" />
            <span>Filters ({filteredProperties.length} found)</span>
          </button>

          <button
            onClick={handleResetFilters}
            className="text-[10px] uppercase tracking-widest text-brand-taupe hover:text-brand-charcoal font-semibold transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Mobile Filters Drawer Overlay */}
        {isMobileFiltersOpen && (
          <div
            className="fixed inset-0 z-50 bg-brand-charcoal/60 backdrop-blur-xs flex justify-end"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-brand-ivory w-full max-w-sm h-full p-8 overflow-y-auto flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-brand-stone pb-4 mb-6">
                  <h3 className="font-serif text-2xl text-brand-charcoal">Filters</h3>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-1.5 text-brand-charcoal hover:text-brand-bronze focus:outline-hidden"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-taupe font-bold">Search Keywords</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="e.g. lagoon"
                        className="w-full bg-brand-stone/10 border-b border-brand-stone focus:border-brand-bronze py-2.5 pl-8 text-xs text-brand-charcoal focus:outline-hidden"
                      />
                      <Search className="w-4 h-4 text-brand-taupe absolute left-2 top-3" />
                    </div>
                  </div>

                  {/* Typology */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-taupe font-bold">Architectural Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full bg-brand-stone/10 border-b border-brand-stone focus:border-brand-bronze py-2.5 text-xs text-brand-charcoal focus:outline-hidden cursor-pointer"
                    >
                      {types.map((t) => (
                        <option key={t} value={t}>{t === "All" ? "All Typologies" : t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-taupe font-bold">Region</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-brand-stone/10 border-b border-brand-stone focus:border-brand-bronze py-2.5 text-xs text-brand-charcoal focus:outline-hidden cursor-pointer"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc === "All" ? "All Regions" : loc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-taupe font-bold">Bedrooms</label>
                    <select
                      value={selectedBeds}
                      onChange={(e) => setSelectedBeds(e.target.value)}
                      className="w-full bg-brand-stone/10 border-b border-brand-stone focus:border-brand-bronze py-2.5 text-xs text-brand-charcoal focus:outline-hidden cursor-pointer"
                    >
                      {bedOptions.map((b) => (
                        <option key={b} value={b}>{b === "All" ? "Any Bedrooms" : `${b}+ Beds`}</option>
                      ))}
                    </select>
                  </div>

                  {/* Value Guide Slider */}
                  <div className="flex flex-col space-y-2 pt-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-brand-taupe font-bold">
                      <span>Value Guide Threshold</span>
                      <span className="text-brand-charcoal">Up to ₦ {(priceRange / 1000000).toLocaleString()}M</span>
                    </div>
                    <input
                      type="range"
                      min={1000000000}
                      max={2500000000}
                      step={50000000}
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value, 10))}
                      className="w-full accent-brand-bronze cursor-pointer h-1 bg-brand-stone"
                    />
                  </div>

                  {/* Sorting */}
                  <div className="flex flex-col space-y-2 pt-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-taupe font-bold">Sorting</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-brand-stone/10 border-b border-brand-stone/60 focus:border-brand-bronze py-2.5 text-xs text-brand-charcoal focus:outline-hidden cursor-pointer"
                    >
                      <option value="default">Default</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-brand-stone mt-8 flex flex-col gap-4">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-brand-charcoal text-brand-ivory hover:bg-brand-bronze py-4 text-xs uppercase tracking-widest font-semibold transition-colors duration-500 flex items-center justify-center gap-2"
                >
                  <span>Apply Filters ({filteredProperties.length})</span>
                </button>
                <button
                  onClick={() => {
                    handleResetFilters();
                    setIsMobileFiltersOpen(false);
                  }}
                  className="w-full border border-brand-stone text-brand-charcoal hover:bg-brand-stone/10 py-3 text-xs uppercase tracking-widest font-semibold transition-colors duration-500"
                >
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Properties Gallery Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
            {filteredProperties.map((property) => (
              <div key={property.id} className="relative flex flex-col justify-between">
                <PropertyCard property={property} onEnquire={handleCardEnquire} />

                {/* Router Link wrapper to the detail page */}
                <div className="pt-2">
                  <Link
                    to={`/properties/${property.id}`}
                    className="inline-flex items-center text-xs uppercase tracking-widest text-brand-bronze hover:text-brand-charcoal font-semibold transition-colors focus:outline-hidden"
                  >
                    <span>View Architectural Details</span>
                    <span className="block w-4 h-[1px] bg-brand-bronze ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <ScrollReveal direction="up" className="text-center py-24 border border-brand-stone/50 bg-brand-stone/10 p-8">
            <Compass className="w-12 h-12 text-brand-bronze mx-auto mb-6 stroke-[1.2]" />
            <h3 className="font-serif text-3xl text-brand-charcoal mb-3">No matching pavilions found.</h3>
            <p className="font-sans text-xs md:text-sm text-brand-taupe max-w-md mx-auto leading-relaxed mb-8">
              Our living collection is highly exclusive and intentionally limited. If your desired layout or spatial coordinates are not shown, please consult our private advisory desk.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleResetFilters}
                className="bg-brand-stone text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-ivory px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-300"
              >
                Clear Search filters
              </button>
              <Link
                to="/"
                className="bg-brand-charcoal text-brand-ivory hover:bg-brand-bronze px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-300"
              >
                Consult Private Desk
              </Link>
            </div>
          </ScrollReveal>
        )}

      </section>

      {/* Slide-over Private Consultation Drawer */}
      <EnquiryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        property={selectedEnquiryProperty}
      />
    </div>
  );
}
export { Properties };
