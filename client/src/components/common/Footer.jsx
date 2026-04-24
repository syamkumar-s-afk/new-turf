import React from 'react';
import { Hexagon, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#060b18] pt-11 pb-7">
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#f84464]/20 blur-[130px]" />

      <div className="landing-container relative z-10">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          <div>
            <h3 className="font-display text-2xl text-white flex items-center gap-2">
              <Hexagon className="h-5 w-5 text-[#fda4af]" />
              Leo <span className="landing-accent-text">Turf</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Enterprise-grade turf infrastructure crafted for elite training sessions, leagues, and high-energy night matches.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.13em] text-[#fbc1cc]">Navigation</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/72">
              <li><a href="/#home" className="transition-colors duration-200 hover:text-white">Home</a></li>
              <li><a href="/#facilities" className="transition-colors duration-200 hover:text-white">Facilities</a></li>
              <li><a href="/#pricing" className="transition-colors duration-200 hover:text-white">Pricing</a></li>
              <li><a href="/#contact" className="transition-colors duration-200 hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.13em] text-[#fbc1cc]">Connect</h4>
            <ul className="mt-3 space-y-3 text-sm text-white/72">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#fda4af]" />
                Madurai, India
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#fda4af]" />
                <a href="tel:+918667573511" className="transition-colors duration-200 hover:text-white">+91 86675 73511</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#fda4af]" />
                <a href="mailto:info@leoturf.com" className="transition-colors duration-200 hover:text-white">info@leoturf.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.13em] text-[#fbc1cc]">Social</h4>
            <div className="mt-3 flex gap-2.5">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/75 transition-all duration-200 hover:border-[#fca5b6] hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/75 transition-all duration-200 hover:border-[#fca5b6] hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-white/55 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>(c) {year} Leo Turf. All rights reserved.</p>
          <p>Designed for high-performance football experiences.</p>
        </div>
      </div>
    </footer>
  );
}
