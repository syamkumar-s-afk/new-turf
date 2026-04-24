import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const performanceSpecs = [
  { title: 'Field Size', value: '70 x 50 m', note: 'Optimized for 5v5 and 7v7 formats' },
  { title: 'Drainage', value: 'Rapid Flow', note: 'Engineered for all-weather reliability' },
  { title: 'Lighting', value: '1000+ Lux', note: 'Uniform visibility for night fixtures' },
  { title: 'Surface', value: 'Pro Cushion', note: 'Shock-absorbing synthetic grass' }
];

const highlights = [
  'Professional-grade turf pile for controlled ball speed and grip.',
  'Structured maintenance cycles to keep bounce, traction, and safety consistent.',
  'Tournament-ready setup with strong perimeter, goals, and sideline visibility.',
  'Operational support available for leagues, academies, and private fixtures.'
];

export default function Performance() {
  return (
    <section id="performance" className="landing-section">
      <div className="landing-container">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-8">
          <div className="landing-surface rounded-3xl p-4 md:p-5">
            <div className="relative h-[320px] overflow-hidden rounded-2xl md:h-[430px]">
              <img
                src="/tn_turf_7.png"
                alt="Professional performance turf"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c3f]/30 via-transparent to-[#070b18]/85" />

              <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
                <div className="landing-soft-surface rounded-2xl px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#fbc3ce]">Performance Arena</p>
                  <h3 className="mt-1 font-display text-xl text-white md:text-2xl">Built For Elite Match Rhythm</h3>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {performanceSpecs.map((item) => (
                <div key={item.title} className="landing-soft-surface rounded-xl px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-white/55">{item.title}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-xs text-white/65">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-1 lg:pt-3">
            <p className="landing-eyebrow mb-4">Performance Blueprint</p>
            <h2 className="landing-title text-3xl sm:text-4xl lg:text-[3.4rem]">
              Engineered For Competitive Teams And Serious Play.
            </h2>
            <p className="landing-copy mt-4 max-w-xl text-sm sm:text-base">
              Every slot at Leo Turf is designed to deliver repeatable quality. From surface response to lighting
              balance, the venue is tuned to give players and organizers dependable, high-performance conditions.
            </p>

            <div className="mt-6 space-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#fda4af]" />
                  <p className="text-sm leading-relaxed text-white/82">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
