import { CONTACT_CONFIG } from "../config/contact";

export interface CompiledBriefData {
  fullName: string;
  email: string;
  phone: string;
  enquiryType: string;
  contactMethod: string;
  message: string;
  propertyTitle?: string;
  propertyLocation?: string;
}

/**
 * Compiles a polished, highly professional message block suitable for WhatsApp or Email.
 */
export function compileBriefMessage(data: CompiledBriefData): string {
  const propertyPart = data.propertyTitle
    ? `${data.propertyTitle} in ${data.propertyLocation || "Nigeria"}`
    : "General Private Collection";

  return (
    `Hello ALFF HOMES,\n\n` +
    `I am interested in ${propertyPart}.\n` +
    `I would like to: ${data.enquiryType}.\n\n` +
    `My Details:\n` +
    `- Name: ${data.fullName}\n` +
    `- Email: ${data.email}\n` +
    `- Phone: ${data.phone}\n` +
    `- Preferred Contact: ${data.contactMethod}\n\n` +
    `Additional Message:\n` +
    `"${data.message || "No additional requirements."}"\n\n` +
    `Respectfully,\n` +
    `${data.fullName}`
  );
}

export function generateWhatsAppLink(data: CompiledBriefData): string {
  const text = compileBriefMessage(data);
  return `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function generateEmailLink(data: CompiledBriefData): string {
  const subject = `Confidential Property Inquiry: ${data.propertyTitle || "General"}`;
  const body = compileBriefMessage(data);
  return `mailto:${CONTACT_CONFIG.emailDestination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
