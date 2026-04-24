import React from 'react';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingCTA() {
  const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER || '918667573511';
  const phoneNumber = '+91 86675 73511';

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi Leo Turf, I want to book a slot!');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s+/g, '')}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 md:bottom-6 md:right-6">
      <button
        type="button"
        onClick={handleWhatsApp}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-[#22c55e] text-white shadow-[0_12px_24px_rgba(34,197,94,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={handleCall}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-gradient-to-r from-[#f84464] to-[#fb7185] text-white shadow-[0_12px_24px_rgba(248,68,100,0.36)] transition-transform duration-200 hover:-translate-y-0.5"
        title="Call us"
      >
        <Phone className="h-5 w-5" />
      </button>
    </div>
  );
}
