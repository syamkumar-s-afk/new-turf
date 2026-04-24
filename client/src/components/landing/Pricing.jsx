import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock } from 'lucide-react';

const pricingPlans = [
  { hours: 1, amount: 'INR 1,000', note: 'Quick session for focused training.' },
  { hours: 2, amount: 'INR 2,000', note: 'Ideal for full-team scrimmage.', featured: true },
  { hours: 3, amount: 'INR 3,000', note: 'Extended booking for tournaments.' }
];

const features = [
  'Professional artificial turf with controlled grip and bounce.',
  'High-output floodlighting for stable evening visibility.',
  'Modern washrooms, changing spaces, and player comfort zones.',
  'Secure parking, staffing support, and basic first-aid coverage.',
  'Fast online confirmation with clear slot and payment flow.',
  'Team-ready environment for coaching, matches, and events.'
];

export default function Pricing() {
  return (
    <section id="pricing" className="landing-section">
      <div className="landing-container">
        <div className="mb-8 text-center md:mb-10">
          <p className="landing-eyebrow justify-center">Pricing</p>
          <h2 className="landing-title mt-4 text-3xl sm:text-4xl lg:text-[3.2rem]">
            Transparent Pricing Designed For Fast Decisions.
          </h2>
          <p className="landing-copy mx-auto mt-4 max-w-3xl text-sm sm:text-base">
            No hidden charges. Choose your duration, confirm your slot, and get on the pitch with a clear,
            professional booking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
          {pricingPlans.map((plan) => (
            <article
              key={plan.hours}
              className={`landing-surface relative rounded-2xl px-4 py-5 text-center transition-transform duration-200 hover:-translate-y-1 md:px-5 md:py-6 ${
                plan.featured ? 'ring-1 ring-[#f84464]/55' : ''
              }`}
            >
              {plan.featured && (
                <span className="absolute right-3 top-3 rounded-full border border-[#fca5b6]/70 bg-[#f84464]/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ffd7de]">
                  Most Popular
                </span>
              )}

              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.09em] text-white/80">
                <Clock className="h-3.5 w-3.5 text-[#fda4af]" />
                {plan.hours} Hour{plan.hours > 1 ? 's' : ''}
              </div>

              <p className="mt-4 font-display text-3xl text-white md:text-4xl">{plan.amount}</p>
              <p className="mt-2 text-sm text-white/70">{plan.note}</p>

              <Link
                to="/booking"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#f84464] to-[#fb7185] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(248,68,100,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
              >
                Book Slot
              </Link>
            </article>
          ))}
        </div>

        <div className="landing-soft-surface mx-auto mt-4 max-w-5xl rounded-2xl px-4 py-4 md:px-5 md:py-5">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-[#fca5b6]/45 bg-[#f84464]/15">
                  <Check className="h-3 w-3 text-[#fda4af]" strokeWidth={3} />
                </span>
                <p className="text-sm leading-relaxed text-white/76">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
