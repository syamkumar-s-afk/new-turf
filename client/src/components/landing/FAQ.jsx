import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How far in advance can I reserve a slot?',
    answer:
      'You can reserve slots up to 30 days ahead. Select your date, choose your time block, and confirm in less than a minute.'
  },
  {
    question: 'Can I book consecutive hours?',
    answer:
      'Yes. You can reserve up to three continuous slots in one booking flow, priced transparently at INR 1,000 per hour.'
  },
  {
    question: 'What are your operating hours?',
    answer: 'Leo Turf operates daily from 6:00 AM to 12:00 AM, including late-evening and night-time bookings.'
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Cancellations made at least 24 hours before kickoff are free. Late cancellations may include a partial fee based on the slot.'
  },
  {
    question: 'Do you support group bookings or tournaments?',
    answer:
      'Yes. We support team events, league rounds, and tournament scheduling. Reach out directly for larger block allocations.'
  },
  {
    question: 'Is parking available for all players?',
    answer: 'Yes. The venue includes secure, well-lit parking with easy access to entry and player support areas.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="landing-section">
      <div className="landing-container">
        <div className="mx-auto mb-8 max-w-4xl text-center md:mb-10">
          <p className="landing-eyebrow justify-center">Frequently Asked Questions</p>
          <h2 className="landing-title mt-4 text-3xl sm:text-4xl lg:text-[3.1rem]">
            Clear Answers For Faster Booking Decisions.
          </h2>
        </div>

        <div className="mx-auto max-w-4xl space-y-2.5 md:space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={faq.question}
                className="landing-surface overflow-hidden rounded-2xl"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left md:px-5"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm font-semibold md:text-base ${isOpen ? 'text-[#fbc1cc]' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <span
                    className={`inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                      isOpen
                        ? 'border-[#fca5b6]/70 bg-[#f84464]/20 text-[#fbc1cc]'
                        : 'border-white/20 bg-white/5 text-white/70'
                    }`}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                </button>

                <div
                  className={`overflow-hidden px-4 transition-all duration-200 md:px-5 ${
                    isOpen ? 'max-h-56 pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0'
                  }`}
                >
                  <div className="mb-3 h-px w-full bg-gradient-to-r from-[#f84464]/40 to-transparent" />
                  <p className="pb-1 text-sm leading-relaxed text-white/74">{faq.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
