import React, { useState, useEffect } from 'react';
import { Ticket, CalendarDays, Clock3, ReceiptText } from 'lucide-react';
import DatePicker from '../components/booking/DatePicker';
import SlotGrid from '../components/booking/SlotGrid';
import BookingForm from '../components/booking/BookingForm';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import CurrentTimeDisplay from '../components/common/CurrentTimeDisplay';
import { getSlots, createBooking } from '../services/api';

const MAX_SLOT_SELECTION = 3;

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState('');
  const [selectionInfo, setSelectionInfo] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const loadSlots = async () => {
        setLoading(true);
        setError('');
        setSelectionInfo('');
        setSelectedSlots([]);

        try {
          const response = await getSlots(selectedDate);
          setSlots(response.data.slots || []);
        } catch (err) {
          setError('Unable to load slots right now. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadSlots();
    }
  }, [selectedDate]);

  const handleSlotSelect = (time) => {
    setSelectedSlots((prev) => {
      if (prev.includes(time)) {
        setSelectionInfo('');
        return prev.filter((slot) => slot !== time);
      }

      if (prev.length >= MAX_SLOT_SELECTION) {
        setSelectionInfo('Maximum selection reached.');
        return prev;
      }

      const nextSelection = [...prev, time].sort((a, b) => {
        const aIndex = slots.findIndex((slot) => slot.time === a);
        const bIndex = slots.findIndex((slot) => slot.time === b);
        return aIndex - bIndex;
      });

      if (nextSelection.length === MAX_SLOT_SELECTION) {
        setSelectionInfo('Maximum selection reached.');
      } else {
        setSelectionInfo('');
      }

      return nextSelection;
    });
  };

  const handleClearSlots = () => {
    setSelectedSlots([]);
    setSelectionInfo('');
  };

  const handleBookingSubmit = async (formData) => {
    if (selectedSlots.length === 0) {
      setError('Please select at least one slot before continuing.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await createBooking({
        name: formData.name,
        phone: formData.phone,
        date: selectedDate,
        slots: selectedSlots
      });

      setConfirmation(response.data);
      setSelectedSlots([]);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return <BookingConfirmation booking={confirmation} onClose={() => setConfirmation(null)} />;
  }

  const steps = [
    { id: 1, label: 'Choose Date', active: Boolean(selectedDate) },
    { id: 2, label: 'Pick Slots', active: selectedSlots.length > 0 },
    { id: 3, label: 'Confirm Booking', active: selectedSlots.length > 0 }
  ];

  const formattedDate = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
      })
    : '--';

  return (
    <div className="min-h-screen bg-[#f5f6fb] pt-20 md:pt-24 pb-10 md:pb-14 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[220px] md:h-[260px] bg-gradient-to-b from-[#202743] to-transparent pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-3 md:px-6 relative z-10">
        <section className="rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#1f2440] via-[#2a3156] to-[#191d34] p-4 md:p-8 text-white shadow-[0_22px_45px_rgba(20,28,56,0.35)] mb-4 md:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-[11px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.24em] text-[#fca5b6] mb-2 md:mb-3">Leo Turf, Madurai</p>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight max-w-2xl">
                Reserve Your Match Slots With A Premium Ticketing Experience
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-white/75 mt-2 md:mt-3 max-w-2xl">
                Select your date, lock continuous time slots, and confirm instantly. The layout is optimized for a smooth booking journey.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 min-w-0 sm:min-w-[260px]">
              <div className="rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 p-3 sm:p-4">
                <p className="text-xs uppercase tracking-wide text-white/70">Selected Date</p>
                <p className="font-semibold mt-1 text-sm sm:text-base">{formattedDate}</p>
              </div>
              <div className="rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 p-3 sm:p-4">
                <p className="text-xs uppercase tracking-wide text-white/70">Selected Slots</p>
                <p className="font-semibold mt-1 text-sm sm:text-base">{selectedSlots.length} / {MAX_SLOT_SELECTION}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 border ${
                  step.active
                    ? 'bg-white/15 border-white/20'
                    : 'bg-white/5 border-white/10 text-white/60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.active ? 'bg-[#f84464] text-white' : 'bg-white/15 text-white/70'
                  }`}
                >
                  {step.id}
                </div>
                <span className="text-sm font-semibold">{step.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-4 md:mb-6">
          <CurrentTimeDisplay />
        </div>

        {error && (
          <div className="mb-4 md:mb-6 rounded-xl md:rounded-2xl border border-[#f4b8c4] bg-[#fff1f4] px-3.5 md:px-4 py-2.5 md:py-3 text-[#a6284a] text-xs sm:text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_390px] gap-4 md:gap-6 items-start">
          <div className="space-y-4 md:space-y-6">
            <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <SlotGrid
              slots={slots}
              selectedSlots={selectedSlots}
              onSlotSelect={handleSlotSelect}
              onClearSelection={handleClearSlots}
              loading={loading}
              peakHours={[18, 19, 20, 21]}
              maxSlots={MAX_SLOT_SELECTION}
              selectionInfo={selectionInfo}
            />
          </div>

          <div className="lg:sticky lg:top-28">
            {selectedSlots.length > 0 ? (
              <BookingForm
                date={selectedDate}
                slots={selectedSlots}
                onSubmit={handleBookingSubmit}
                loading={submitting}
              />
            ) : (
              <section className="booking-surface rounded-2xl md:rounded-3xl p-4 md:p-6">
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#ffe8ee] text-[#f84464] flex items-center justify-center mb-3 md:mb-4">
                  <Ticket className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <h3 className="font-display text-xl md:text-2xl text-[#1d2237] mb-2">Your Cart Is Waiting</h3>
                <p className="text-xs sm:text-sm text-[#6b7287] mb-4 md:mb-5">
                  Select one or more continuous slots to unlock the checkout panel.
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-[#4e5670]">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-[#f84464]" />
                    Choose your date first
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4 text-[#f84464]" />
                    Pick adjacent slots for uninterrupted play
                  </p>
                  <p className="flex items-center gap-2">
                    <ReceiptText className="w-4 h-4 text-[#f84464]" />
                    Enter your details and confirm
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
