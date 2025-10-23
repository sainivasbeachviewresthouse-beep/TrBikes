// utils/sendEnquiry.ts

export interface EnquiryData {
  name: string;
  contact: string;
  message: string;
  bike?: string; // optional, for specific bike enquiry
}

/**
 * Opens WhatsApp chat with a prefilled message.
 * @param data Enquiry data including optional bike info
 */
export function sendEnquiry(data: EnquiryData) {
  const { name, contact, message, bike } = data;

  // Replace with your WhatsApp number (international format, no + or 00)
  const whatsappNumber = '919553355118';

  // Build the WhatsApp message
  const whatsappMessage = `
Hello! I would like to make an enquiry${bike ? ` for bike: ${bike}` : ''}.

Name: ${name}
Contact: ${contact}
Message: ${message}
  `.trim(); // Remove leading/trailing whitespace

  // Encode for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Open WhatsApp only on client-side
  if (typeof window !== 'undefined') {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  }
}
