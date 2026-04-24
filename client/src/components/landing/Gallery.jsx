import React, { useMemo, useState } from 'react';
import { Expand, Sparkles, X } from 'lucide-react';

const galleryItems = [
  {
    id: 0,
    // title: 'Night Match Environment',
    // caption: 'Floodlit turf conditions tuned for high-visibility evening fixtures.',
    tag: 'Matchday',
    image: '/turfdroneshot.png',
    span: 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
  },
  {
    id: 1,
    // title: 'Training Session Surface',
    // caption: 'Consistent turf texture with clean lane depth for technical drills.',
    tag: 'Training',
    image: '/tn_turf_1.png',
    span: ''
  },
  {
    id: 2,
    // title: 'Ball Control Close-Up',
    // caption: 'Grip and bounce profile designed for controlled, confident movement.',
    tag: 'Football',
    image: '/tn_turf_3.png',
    span: ''
  },
  {
    id: 3,
    // title: 'Tournament Setup',
    // caption: 'Field-ready space optimized for competitive play and team rotations.',
    tag: 'Pitch',
    image: '/tn_turf_7.png',
    span: 'lg:col-span-2'
  },
  {
    id: 4,
    // title: 'Arrival And Entry',
    // caption: 'Professional first impression for players, guests, and organizers.',
    tag: 'Cricket',
    image: '/cricket.png',
    span: ''
  },
  {
    id: 5,
    // title: 'Premium Arena Identity',
    // caption: 'A curated visual style aligned to a modern enterprise sports venue.',
    tag: 'Cricket',
    image: '/cricket2.png',
    span: ''
  },
  {
    id: 6,
    // title: 'Premium Identity',
    // caption: 'A curated visual style aligned to a modern enterprise sports venue.',
    tag: 'Cricket',
    image: '/cricketbowling.png',
    span: ''
  }
];

export default function Gallery() {
  const [selectedImageId, setSelectedImageId] = useState(null);

  const selectedImage = useMemo(
    () => galleryItems.find((item) => item.id === selectedImageId) || null,
    [selectedImageId]
  );

  return (
    <section id="gallery" className="landing-section">
      <div className="landing-container">
        <div className="mb-8 text-center md:mb-10">
          <p className="landing-eyebrow justify-center">Visual Gallery</p>
          <h2 className="landing-title mt-4 text-3xl sm:text-4xl lg:text-[3.2rem]">
            Turf Visuals That Match The Experience.
          </h2>
          <p className="landing-copy mx-auto mt-4 max-w-3xl text-sm sm:text-base">
            Curated, domain-specific visuals from Leo Turf to help visitors understand the venue quality,
            match conditions, and booking context before they reserve.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[190px] sm:auto-rows-[205px] lg:auto-rows-[220px]">
          {galleryItems.map((item) => (
            <article
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedImageId(item.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedImageId(item.id);
                }
              }}
              className={`landing-surface group relative overflow-hidden rounded-2xl cursor-pointer ${item.span}`}
              aria-label={`Open ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-[#0a1127]/25 via-[#081022]/35 to-[#050914]/88" />

              <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#fca5b6]/70 bg-[#f84464]/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.11em] text-[#ffd8df]">
                <Sparkles className="h-3 w-3" />
                {item.tag}
              </div>

              <div className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-[#0f162f]/70 text-[#fbc1cc] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Expand className="h-4 w-4" />
              </div>

              <div className="absolute inset-x-3 bottom-3">
                <h3 className="font-display text-lg text-white leading-tight">{item.title}</h3>
                <p className="mt-1 text-xs text-white/72 leading-relaxed">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030611]/88 p-4 backdrop-blur-lg md:p-6"
          onClick={() => setSelectedImageId(null)}
        >
          <div
            className="landing-surface relative w-full max-w-5xl overflow-hidden rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImageId(null)}
              aria-label="Close gallery preview"
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#0a1127]/75 text-white transition-colors duration-200 hover:bg-[#131f43]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-[330px] md:h-[620px]">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a18]/92 via-[#050a18]/30 to-transparent" />

              <div className="absolute inset-x-5 bottom-5 md:inset-x-8 md:bottom-8">
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#fbc1cc]">{selectedImage.tag}</p>
                <h3 className="mt-2 font-display text-2xl text-white md:text-4xl">{selectedImage.title}</h3>
                <p className="mt-2 max-w-2xl text-sm text-white/78 md:text-base">{selectedImage.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
