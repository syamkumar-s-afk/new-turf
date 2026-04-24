import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Arjun Kumar',
    role: 'Competitive Player',
    message:
      'The turf response is consistent every session. We can train hard and still trust the grip, bounce, and movement under lights.',
    rating: 5
  },
  {
    name: 'Priya Singh',
    role: 'Tournament Organizer',
    message:
      'From booking to kickoff, the process feels structured and professional. It is the easiest venue we use for recurring events.',
    rating: 5
  },
  {
    name: 'Rahul Menon',
    role: 'Academy Coach',
    message:
      'Our players benefit from the quality setup and clear field dimensions. The overall experience is premium and reliable.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="landing-section">
      <div className="landing-container">
        <div className="mb-8 text-center md:mb-10">
          <p className="landing-eyebrow justify-center">Client Reviews</p>
          <h2 className="landing-title mt-4 text-3xl sm:text-4xl lg:text-[3.2rem]">
            Trusted By Players, Coaches, And Organizers.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="landing-surface rounded-2xl px-4 py-5 md:px-5 md:py-6">
              <Quote className="h-8 w-8 text-[#fda4af]/70" />
              <p className="mt-4 text-sm leading-relaxed text-white/80">"{testimonial.message}"</p>

              <div className="mt-5 border-t border-white/15 pt-4">
                <p className="font-display text-lg text-white">{testimonial.name}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.11em] text-[#fbc1cc]">
                  {testimonial.role}
                </p>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star key={`${testimonial.name}-${index}`} className="h-4 w-4 fill-current text-[#fda4af]" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
