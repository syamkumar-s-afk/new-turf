import React from 'react';
import Hero from '../components/landing/Hero';
import Performance from '../components/landing/Performance';
import Facilities from '../components/landing/Facilities';
import Pricing from '../components/landing/Pricing';
import Gallery from '../components/landing/Gallery';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';
import Location from '../components/landing/Location';

export default function Landing() {
  return (
    <div className="relative isolate w-full overflow-hidden bg-gradient-to-b from-[#050915] via-[#070c1a] to-[#060a17]">
      <div className="relative z-10">
        <Hero />
        <Performance />
        <Facilities />
        <Pricing />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Location />
      </div>
    </div>
  );
}
