import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hexagon, Menu, X } from 'lucide-react';

const sections = [
  { id: 'home', label: 'Home', href: '/#home' },
  { id: 'performance', label: 'Performance', href: '/#performance' },
  { id: 'facilities', label: 'Facilities', href: '/#facilities' },
  { id: 'gallery', label: 'Gallery', href: '/#gallery' },
  { id: 'pricing', label: 'Pricing', href: '/#pricing' },
  { id: 'testimonials', label: 'Testimonials', href: '/#testimonials' },
  { id: 'faq', label: 'FAQ', href: '/#faq' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
];

const HOME_CTA_REVEAL_OFFSET = 120;

export default function Navbar() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showBookSlotCta, setShowBookSlotCta] = useState(location.pathname !== '/');

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const onHomepage = location.pathname === '/';

      if (isAdminRoute) {
        setScrolled(scrollTop > 10);
        setShowBookSlotCta(false);
        setActiveSection('');
        return;
      }

      setScrolled(scrollTop > 16);
      setShowBookSlotCta(!onHomepage || scrollTop > HOME_CTA_REVEAL_OFFSET);

      if (!onHomepage) {
        setActiveSection('');
        return;
      }

      const currentPosition = scrollTop + 170;
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= currentPosition) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, isAdminRoute]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isAdminRoute
          ? 'bg-[#161d39]/95 py-2 border-white/15 backdrop-blur-xl shadow-[0_10px_28px_rgba(18,24,49,0.38)]'
          : scrolled
          ? 'bg-[#1f2440]/92 py-2 border-white/15 backdrop-blur-xl shadow-[0_12px_35px_rgba(21,28,56,0.42)]'
          : 'bg-[#161d39]/88 py-3 border-white/10 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-3 md:px-6">
        <div className="flex h-12 md:h-14 items-center justify-between gap-2">
          <Link to="/" className="flex shrink-0 items-center gap-2 group">
            <Hexagon className="w-6 h-6 md:w-7 md:h-7 text-[#f84464] fill-[#f84464]/20 transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white">
              Leo{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f84464] to-[#fb7185]">
                Turf
              </span>
            </span>
          </Link>

          {isAdminRoute ? (
            <span className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs md:text-sm font-semibold text-[#fbc1cc]">
              Admin Dashboard
            </span>
          ) : (
            <>
              <div className="hidden xl:flex items-center gap-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={section.href}
                    className={`group relative px-3 py-2 text-[13px] font-semibold tracking-[0.02em] transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'text-[#fca5b6]'
                        : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {section.label}
                    <span
                      className={`absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[#f84464] to-[#fb7185] transition-all duration-200 ${
                        activeSection === section.id
                          ? 'opacity-100 scale-x-100'
                          : 'opacity-0 scale-x-50 group-hover:opacity-100 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                ))}

                {showBookSlotCta && (
                  <Link
                    to="/booking"
                    className="ml-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#f84464] to-[#fb7185] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(248,68,100,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
                  >
                    Book Slot
                  </Link>
                )}
              </div>

              <div className="xl:hidden flex items-center gap-2">
                {showBookSlotCta && (
                  <Link
                    to="/booking"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#f84464] to-[#fb7185] px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-[0_8px_18px_rgba(248,68,100,0.3)] transition-all duration-200"
                  >
                    Book Slot
                  </Link>
                )}

                <button
                  type="button"
                  aria-label="Toggle menu"
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 p-2 text-white transition-colors duration-200 hover:border-[#fca5b6]/60 hover:text-[#fca5b6] focus:outline-none"
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {!isAdminRoute && (
        <div
          className={`xl:hidden absolute inset-x-0 top-full overflow-hidden border-t backdrop-blur-xl transition-all duration-300 ${
            isOpen
              ? 'max-h-[78vh] opacity-100 border-white/15 bg-[#1d223b]/96 shadow-[0_18px_36px_rgba(19,25,50,0.45)]'
              : 'max-h-0 opacity-0 border-transparent'
          }`}
        >
          <div className="px-3 pt-4 pb-5 space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={section.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg border-l-2 px-3 py-2.5 text-sm font-semibold tracking-[0.02em] transition-all duration-200 ${
                  activeSection === section.id
                    ? 'border-[#f84464] bg-white/10 text-[#fca5b6]'
                    : 'border-transparent text-white/75 hover:border-[#f84464]/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
