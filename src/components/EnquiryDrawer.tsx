import { useState, useEffect, useRef } from "react";
import type { Property } from "../types/property";
import { X, Send, Sparkles, Check, MessageSquare, Mail, AlertCircle } from "lucide-react";
import { generateWhatsAppLink, generateEmailLink } from "../utils/contactUtils";

interface EnquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
}

export default function EnquiryDrawer({ isOpen, onClose, property }: EnquiryDrawerProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryType: "Request a private viewing",
    contactMethod: "WhatsApp",
    message: "",
    consent: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus when open
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const focusable = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex="0"]'
      );
      if (focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val
    }));

    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email format.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Please enter your phone contact.";
    }

    if (!formData.consent) {
      nextErrors.consent = "Please acknowledge our private confidentiality terms.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const briefData = {
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    enquiryType: formData.enquiryType,
    contactMethod: formData.contactMethod,
    message: formData.message,
    propertyTitle: property?.title,
    propertyLocation: property?.location
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-brand-charcoal/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        className="bg-brand-ivory w-full max-w-md h-full flex flex-col justify-between shadow-2xl overflow-y-auto relative z-20 border-l border-brand-stone"
        style={{
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          animation: "image-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div>
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-brand-stone">
            <h3 id="drawer-title" className="font-serif text-xl md:text-2xl text-brand-charcoal font-medium">
              Private Consultation
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-brand-charcoal hover:text-brand-bronze focus:outline-hidden"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Property Context Header (If applicable) */}
          {property && (
            <div className="p-6 bg-brand-stone/20 border-b border-brand-stone/60 flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 overflow-hidden bg-brand-stone">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-widest text-brand-bronze font-bold block">
                  SELECTED SANCTUARY
                </span>
                <h4 className="font-serif text-base text-brand-charcoal font-medium">{property.title}</h4>
                <p className="font-sans text-[10px] text-brand-taupe">{property.location} • {property.price}</p>
              </div>
            </div>
          )}

          {/* Body Section */}
          <div className="p-6">
            {isSubmitted ? (
              /* Honest Success Confirmation State */
              <div className="text-center py-8 space-y-6 animate-fade-in">
                <div className="w-12 h-12 bg-brand-bronze/10 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 text-brand-bronze" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl text-brand-charcoal">Brief Compiled.</h4>
                  <p className="font-sans text-xs text-brand-taupe leading-relaxed">
                    To maintain absolute cryptographic privacy and prompt response, please dispatch this secure briefing to our primary advisory desk using WhatsApp or Email.
                  </p>
                </div>

                <div className="pt-6 space-y-4">
                  <a
                    href={generateWhatsAppLink(briefData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors duration-300"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Dispatch via WhatsApp</span>
                  </a>
                  <a
                    href={generateEmailLink(briefData)}
                    className="w-full bg-brand-charcoal hover:bg-brand-bronze text-brand-ivory py-3.5 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Dispatch via Email</span>
                  </a>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[10px] uppercase tracking-widest text-brand-taupe hover:text-brand-charcoal transition-colors border-b border-transparent hover:border-brand-taupe pt-4 block mx-auto"
                >
                  Edit Information
                </button>
              </div>
            ) : (
              /* Consultation Enquiry Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-[10px] uppercase tracking-widest text-brand-taupe font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-bronze" />
                  <span>Confidential Information</span>
                </div>

                {/* Name */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="fullName" className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Alabo Briggs"
                    className={`border-b bg-transparent py-2 text-xs text-brand-charcoal placeholder-brand-taupe/30 focus:outline-hidden transition-colors ${
                      errors.fullName ? "border-red-500 focus:border-red-500" : "border-brand-stone focus:border-brand-bronze"
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="email" className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. client@example.com"
                    className={`border-b bg-transparent py-2 text-xs text-brand-charcoal placeholder-brand-taupe/30 focus:outline-hidden transition-colors ${
                      errors.email ? "border-red-500 focus:border-red-500" : "border-brand-stone focus:border-brand-bronze"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="phone" className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                    Phone / WhatsApp Contact *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +234 803 123 4567"
                    className={`border-b bg-transparent py-2 text-xs text-brand-charcoal placeholder-brand-taupe/30 focus:outline-hidden transition-colors ${
                      errors.phone ? "border-red-500 focus:border-red-500" : "border-brand-stone focus:border-brand-bronze"
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </span>
                  )}
                </div>

                {/* Contact Method */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="contactMethod" className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                    Preferred Contact Method
                  </label>
                  <select
                    id="contactMethod"
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    className="border-b border-brand-stone focus:border-brand-bronze bg-transparent py-2 text-xs text-brand-charcoal focus:outline-hidden cursor-pointer"
                  >
                    <option value="WhatsApp" className="bg-brand-ivory text-brand-charcoal">WhatsApp Secure Chat</option>
                    <option value="Email" className="bg-brand-ivory text-brand-charcoal">Electronic Mail</option>
                    <option value="Direct Call" className="bg-brand-ivory text-brand-charcoal">Direct Telephone Call</option>
                  </select>
                </div>

                {/* Enquiry Type */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="enquiryType" className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                    Enquiry Intent
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    className="border-b border-brand-stone focus:border-brand-bronze bg-transparent py-2 text-xs text-brand-charcoal focus:outline-hidden cursor-pointer"
                  >
                    <option value="Request a private viewing" className="bg-brand-ivory text-brand-charcoal">Request private viewing</option>
                    <option value="Request property information" className="bg-brand-ivory text-brand-charcoal">Request property information</option>
                    <option value="General property enquiry" className="bg-brand-ivory text-brand-charcoal">General property enquiry</option>
                    <option value="Investment enquiry" className="bg-brand-ivory text-brand-charcoal">Investment portfolio consultation</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="message" className="text-[9px] uppercase tracking-widest text-brand-taupe font-bold">
                    Brief Notes / Timeframe
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any specific architectural preferences or scheduling requirements..."
                    className="border-b border-brand-stone focus:border-brand-bronze bg-transparent py-2 text-xs text-brand-charcoal placeholder-brand-taupe/30 focus:outline-hidden resize-none"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 rounded-sm border-brand-stone text-brand-bronze focus:ring-brand-bronze cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-[10px] text-brand-taupe leading-relaxed cursor-pointer font-medium select-none">
                    I acknowledge that this constitutes a confidential consultation and consent to ALFF HOMES handling my contact coordinates with strict privacy.
                  </label>
                </div>
                {errors.consent && (
                  <span className="text-[10px] text-red-500 block">
                    {errors.consent}
                  </span>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-brand-charcoal hover:bg-brand-bronze text-brand-ivory py-3.5 text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 group transition-colors duration-500 cursor-pointer"
                >
                  <span>Compile Private Brief</span>
                  <Send className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Coordinate Disclaimer */}
        <div className="p-6 border-t border-brand-stone/40 text-[9px] text-brand-taupe tracking-wider bg-brand-stone/5">
          <p>CONFIDENTIAL PORTFOLIO OFFICE</p>
          <p className="mt-1">Lagos • Port Harcourt, Nigeria</p>
        </div>

      </div>
    </div>
  );
}
export { EnquiryDrawer };
