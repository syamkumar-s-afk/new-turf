import React from 'react';
import { Car, Droplets, Bath, Lightbulb, HeartPulse, Coffee } from 'lucide-react';

const facilities = [
  {
    icon: Car,
    title: 'Secure Parking',
    description: 'Well-lit parking bays with monitored access for teams and private vehicles.'
  },
  {
    icon: Droplets,
    title: 'Hydration Station',
    description: 'Purified cold-water point and quick hydration support around match hours.'
  },
  {
    icon: Bath,
    title: 'Premium Showers',
    description: 'Clean, private changing zones with modern shower and locker convenience.'
  },
  {
    icon: Lightbulb,
    title: 'Elite Floodlights',
    description: 'Uniform illumination designed for high-visibility evening and late-night play.'
  },
  {
    icon: HeartPulse,
    title: 'Medical Response',
    description: 'On-site first-aid support and emergency assistance protocols when needed.'
  },
  {
    icon: Coffee,
    title: 'Player Lounge',
    description: 'Comfort-focused waiting area for teams, supporters, and tournament staff.'
  }
];

export default function Facilities() {
  return (
    <section id="facilities" className="landing-section">
      <div className="landing-container">
        <div className="mb-8 text-center md:mb-11">
          <p className="landing-eyebrow justify-center">Infrastructure</p>
          <h2 className="landing-title mt-4 text-3xl sm:text-4xl lg:text-[3.3rem]">
            Premium Facilities For Teams That Expect Professional Standards.
          </h2>
          <p className="landing-copy mx-auto mt-4 max-w-3xl text-sm sm:text-base">
            From the first whistle to post-match recovery, each touchpoint is designed to keep players focused,
            comfortable, and ready for consistent high-quality gameplay.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
          {facilities.map((facility) => {
            const Icon = facility.icon;
            return (
              <article
                key={facility.title}
                className="landing-surface group rounded-2xl px-4 py-4 transition-transform duration-200 hover:-translate-y-1 md:px-5 md:py-5"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[#fda4af] transition-colors duration-200 group-hover:border-[#fca5b6]/70 group-hover:text-[#ffc4d0]">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 font-display text-xl text-white">{facility.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/72">{facility.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
