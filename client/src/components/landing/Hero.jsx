import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Timer, Trophy } from 'lucide-react';

const heroMetrics = [
  { label: 'FIFA-Aligned Surface', value: 'Pro Turf' },
  { label: 'Floodlight Brightness', value: '1000+ Lux' },
  { label: 'Booking Confirmation', value: '< 60 Sec' }
];

const heroHighlights = [
  { icon: ShieldCheck, title: 'Certified Safety' },
  { icon: Trophy, title: 'Tournament Ready' },
  { icon: Timer, title: 'Fast Slot Booking' }
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-white/10 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/turf-night.png"
          alt="Turf background"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b18]/88 via-[#070b18]/82 to-[#060a17]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(248,68,100,0.16),transparent_44%),radial-gradient(circle_at_78%_20%,rgba(56,189,248,0.11),transparent_42%)]" />
      </div>

      <div className="landing-container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div>
           

            <h1 className="landing-title mb-5 text-4xl sm:text-5xl lg:text-[4.2rem]">
              Elevate Every Kick In A
              <span className="landing-accent-text mt-2 block">Premium Turf Environment.</span>
            </h1>

            <p className="landing-copy max-w-xl text-sm sm:text-base">
              Book professional-grade slots, organize seamless fixtures, and play under elite floodlights in a
              world-class venue built for teams that expect more.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f84464] to-[#fb7185] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(248,68,100,0.38)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
              >
                Book Your Slot
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#facilities"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Explore Facilities
              </a>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
              {heroMetrics.map((item) => (
                <div key={item.label} className="landing-soft-surface rounded-xl px-3 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/55">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-[#fbc3ce]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="landing-surface rounded-[1.8rem] p-3 md:p-4">
            <div className="relative h-[360px] overflow-hidden rounded-[1.35rem] md:h-[460px]">
              <img
                src="/goalpost.png"
                alt="Premium football turf under stadium lights"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a1024]/45 via-transparent to-[#060b18]/92" />

              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#0d1530]/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#fbc3ce] md:left-5 md:top-5">
                Open Today | Floodlights Active
              </div>

              <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
                <div className="landing-soft-surface rounded-2xl px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-white/60">Leo Turf, Madurai</p>
                  <h2 className="mt-1 font-display text-xl text-white md:text-2xl">Enterprise Class Match Experience</h2>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {heroHighlights.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="rounded-lg border border-white/15 bg-white/5 px-2 py-2 text-center">
                          <Icon className="mx-auto h-4 w-4 text-[#fda4af]" />
                          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/70">
                            {item.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
