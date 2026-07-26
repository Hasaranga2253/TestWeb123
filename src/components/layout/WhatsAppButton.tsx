import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      className="fixed bottom-6 left-6 z-40 rounded-full bg-[#1f9d55] p-3 text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#188447]"
      href="https://wa.me/94112223344"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with AIMS Campus on WhatsApp"
    >
      <MessageCircle size={20} aria-hidden="true" />
    </a>
  );
}
