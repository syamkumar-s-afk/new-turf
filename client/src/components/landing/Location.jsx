import React from 'react';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Location() {
  return (
    <section id="contact" className="landing-section">
      <div className="landing-container">
        <div className="mb-8 text-center md:mb-10">
          <p className="landing-eyebrow justify-center">Contact</p>
          <h2 className="landing-title mt-4 text-3xl sm:text-4xl lg:text-[3.1rem]">
            Visit Leo Turf Or Reach Us Instantly.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="landing-surface relative min-h-[320px] overflow-hidden rounded-3xl">
            <iframe
              title="Leo Turf Location"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '100%', position: 'absolute', inset: 0 }}
              loading="lazy"
              allowFullScreen=""
              className="h-full w-full contrast-[1.05] saturate-[0.9]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.7551621880857!2d78.11240131533816!3d9.918700590131103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582821daaab%3A0x4f3e6e44fd8e5d0!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060a18]/55 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <article className="landing-surface rounded-2xl px-4 py-4 md:px-5 md:py-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                  <MapPin className="h-5 w-5 text-[#fda4af]" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#fbc1cc]">Venue Address</p>
                  <h3 className="mt-1 font-display text-xl text-white">Leo Turf Arena, Madurai</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/74">
                    Centrally connected location with direct access for team arrivals, events, and walk-in bookings.
                  </p>
                </div>
              </div>
            </article>

            <article className="landing-surface rounded-2xl px-4 py-4 md:px-5 md:py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#fbc1cc]">Direct Connect</p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a href="tel:+918667573511" className="landing-soft-surface rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-white/15">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#fda4af]" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60">Call</p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-white">+91 86675 73511</p>
                </a>

                <a href="https://wa.me/918667573511" className="landing-soft-surface rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-white/15">
                  <div className="flex items-center gap-2">
                    <FaWhatsapp className="h-4 w-4 text-[#fda4af]" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60">WhatsApp</p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-white">Message Instantly</p>
                </a>

                <a href="mailto:info@leoturf.com" className="landing-soft-surface rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-white/15 sm:col-span-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#fda4af]" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60">Email</p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-white">info@leoturf.com</p>
                </a>
              </div>
            </article>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <article className="landing-surface rounded-2xl px-4 py-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#fda4af]" />
                  <p className="text-sm font-semibold text-white">Operating Hours</p>
                </div>
                <div className="mt-3 space-y-1.5 text-sm text-white/75">
                  <p className="flex justify-between"><span>Open</span><span>6:00 AM</span></p>
                  <p className="flex justify-between"><span>Close</span><span>12:00 AM</span></p>
                </div>
              </article>

              <a
                href="https://wa.me/918667573511"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#f84464] to-[#fb7185] px-4 py-4 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(248,68,100,0.3)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
