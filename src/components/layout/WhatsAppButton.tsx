import { FaWhatsapp } from 'react-icons/fa';

import { campusData } from '../../data/campus';

export function WhatsAppButton() {
  return (
    <a
      className="fixed bottom-24 right-4 z-40 rounded-full bg-[#25D366] p-4 text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#128C7E] sm:right-6"
      href={campusData.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AIMS Campus on WhatsApp"
    >
      <FaWhatsapp size={22} aria-hidden="true" />
    </a>
  );
}
