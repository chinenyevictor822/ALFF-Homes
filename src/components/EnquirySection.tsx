import { useState, useEffect } from "react";
import { Send, MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface EnquirySectionProps {
  prefilledProperty?: string;
  onSuccess?: () => void;
}

export default function EnquirySection({ prefilledProperty = "", onSuccess }: EnquirySectionProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryType: "Acquisition",
    selectedProperty: "",
    message: "",
    consent: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Sync prefilled property when chosen from card action
  useEffect(() => {
    if (prefilledProperty) {
      setFormData((prev) => ({
        ...prev,
        selectedProperty: prefilledProperty,
        enquiryType: "Acquisition"
      }));

      // Smooth scroll to the enquiry form
      const element = document.getElementById("enquiry");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [prefilledProperty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("Please complete all required fields so we may initiate your file.");
      return;
    }

    if (!formData.consent) {
      setError("Please acknowledge our private data terms to proceed.");
      return;
    }

    // Success transition
    setIsSubmitted(true);
    if (onSuccess) onSuccess();
  };

  return (
    <section id="enquiry" className="py-24 md:py-36 bg-brand-ivory border-t border-brand-stone">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left Column: Editorial Information & Offices */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              <ScrollReveal direction="up" delay={100}>
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-bronze font-bold block mb-2">
                  03 — PRIVATE CONCIERGE
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal leading-tight">
                  Begin Your Architectural Journey.
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <p className="font-sans text-xs md:text-sm text-brand-taupe leading-relaxed">
                  Whether you wish to acquire an existing masterpiece from our collection, commission a custom architectural private development, or arrange a discrete consultation, our studio is prepared to coordinate your inquiry with absolute privacy.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300} className="pt-6 space-y-6">
                <div className="flex items-start gap-4 text-xs">
                  <MapPin className="w-5 h-5 text-brand-bronze shrink-0 stroke-[1.2]" />
                  <div className="space-y-3">
                    <div>
                      <p className="font-serif text-sm text-brand-charcoal font-medium">Lagos Office</p>
                      <p className="text-brand-taupe mt-1">14, Kingsway Road, Old Ikoyi, Lagos, Nigeria</p>
                    </div>
                    <div>
                      <p className="font-serif text-sm text-brand-charcoal font-medium">Port Harcourt Office</p>
                      <p className="text-brand-taupe mt-1">Phase II, GRA, Port Harcourt, Rivers State, Nigeria</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs pt-2">
                  <Phone className="w-5 h-5 text-brand-bronze shrink-0 stroke-[1.2]" />
                  <div>
                    <p className="font-serif text-sm text-brand-charcoal font-medium">Private Line</p>
                    <p className="text-brand-taupe mt-1">+234 (0) 90 2841 8291 • +234 (0) 80 1840 2910</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs pt-2">
                  <Mail className="w-5 h-5 text-brand-bronze shrink-0 stroke-[1.2]" />
                  <div>
                    <p className="font-serif text-sm text-brand-charcoal font-medium">Electronic Dispatch</p>
                    <p className="text-brand-taupe mt-1">concierge@alffhomes.com • private@alffhomes.com</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={400} className="pt-10 border-t border-brand-stone/60 hidden lg:block mt-12">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-bronze stroke-[1.5]" />
                <span className="font-sans text-[10px] uppercase tracking-wider text-brand-taupe">
                  Concierge response window: Within 4 business hours.
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Elegant Editorial Form */}
          <div className="lg:col-span-7 bg-transparent">
            <ScrollReveal direction="left" delay={200}>
              <div className="border border-brand-stone p-8 md:p-12 bg-brand-stone/10">
                {isSubmitted ? (
                  /* Success State (Highly Restrained and Sophisticated) */
                  <div className="text-center py-12 flex flex-col items-center space-y-6">
                    <div className="w-12 h-12 bg-brand-bronze/10 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-brand-bronze stroke-[2]" />
                    </div>
                    <h3 className="font-serif text-3xl text-brand-charcoal">Brief Received.</h3>
                    <p className="font-sans text-xs text-brand-taupe max-w-md leading-relaxed mx-auto">
                      Thank you for contacting ALFF HOMES. A private client advisor has been assigned to your file and will contact you shortly to coordinate your private tour or secure brief presentation.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="border-b border-brand-charcoal text-[11px] uppercase tracking-widest text-brand-charcoal font-semibold hover:text-brand-bronze hover:border-brand-bronze transition-colors pt-4"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  /* Standard Lead Capture Form */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-brand-taupe mb-4 font-semibold">
                        Confidential Client Profile
                      </p>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 text-red-700 text-xs font-sans tracking-wide">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="fullName" className="text-[10px] uppercase tracking-widest text-brand-taupe font-semibold">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="border-b border-brand-stone hover:border-brand-taupe focus:border-brand-bronze bg-transparent py-2.5 text-sm text-brand-charcoal placeholder-brand-taupe/40 focus:outline-hidden transition-colors"
                          placeholder="e.g. Alabo Briggs"
                          required
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-brand-taupe font-semibold">
                          Phone Contact *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-b border-brand-stone hover:border-brand-taupe focus:border-brand-bronze bg-transparent py-2.5 text-sm text-brand-charcoal placeholder-brand-taupe/40 focus:outline-hidden transition-colors"
                          placeholder="e.g. +234 803 123 4567"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-brand-taupe font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-b border-brand-stone hover:border-brand-taupe focus:border-brand-bronze bg-transparent py-2.5 text-sm text-brand-charcoal placeholder-brand-taupe/40 focus:outline-hidden transition-colors"
                        placeholder="e.g. client@example.com"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="enquiryType" className="text-[10px] uppercase tracking-widest text-brand-taupe font-semibold">
                          Enquiry Nature
                        </label>
                        <select
                          id="enquiryType"
                          name="enquiryType"
                          value={formData.enquiryType}
                          onChange={handleChange}
                          className="border-b border-brand-stone hover:border-brand-taupe focus:border-brand-bronze bg-transparent py-2.5 text-sm text-brand-charcoal focus:outline-hidden transition-colors cursor-pointer"
                        >
                          <option value="Acquisition" className="bg-brand-ivory text-brand-charcoal">Acquisition Request</option>
                          <option value="Private Development" className="bg-brand-ivory text-brand-charcoal">Custom Commission</option>
                          <option value="Consultation Portfolio" className="bg-brand-ivory text-brand-charcoal">Private Consultation</option>
                        </select>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="selectedProperty" className="text-[10px] uppercase tracking-widest text-brand-taupe font-semibold">
                          Property Focus
                        </label>
                        <select
                          id="selectedProperty"
                          name="selectedProperty"
                          value={formData.selectedProperty}
                          onChange={handleChange}
                          className="border-b border-brand-stone hover:border-brand-taupe focus:border-brand-bronze bg-transparent py-2.5 text-sm text-brand-charcoal focus:outline-hidden transition-colors cursor-pointer"
                        >
                          <option value="" className="bg-brand-ivory text-brand-charcoal">General Collection Inquiry</option>
                          <option value="The Obsidian Pavilion" className="bg-brand-ivory text-brand-charcoal">The Obsidian Pavilion</option>
                          <option value="The Stone & Canopy Villa" className="bg-brand-ivory text-brand-charcoal">The Stone & Canopy Villa</option>
                          <option value="The Terracotta Atrium" className="bg-brand-ivory text-brand-charcoal">The Terracotta Atrium</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-brand-taupe font-semibold">
                        Your Message / Brief Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="border-b border-brand-stone hover:border-brand-taupe focus:border-brand-bronze bg-transparent py-2.5 text-sm text-brand-charcoal placeholder-brand-taupe/40 focus:outline-hidden transition-colors resize-none"
                        placeholder="Please express any architectural preferences, layout desires, or private timeframe expectations..."
                      />
                    </div>

                    {/* Private Consent Checkbox */}
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-0.5 rounded-sm border-brand-stone text-brand-bronze focus:ring-brand-bronze cursor-pointer"
                        required
                      />
                      <label htmlFor="consent" className="text-[11px] text-brand-taupe leading-relaxed cursor-pointer font-normal">
                        I acknowledge that the details entered above represent a confidential enquiry and consent to ALFF HOMES LTD managing this communication with complete professional privacy.
                      </label>
                    </div>

                    {/* Elite CTA button */}
                    <button
                      type="submit"
                      className="w-full bg-brand-charcoal hover:bg-brand-bronze text-brand-ivory py-4 text-xs uppercase tracking-[0.25em] font-semibold transition-colors duration-500 ease-out-quint flex items-center justify-center gap-2 group focus:outline-hidden"
                    >
                      <span>Dispatch Confidential Brief</span>
                      <Send className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-500 ease-out" />
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
export { EnquirySection };
