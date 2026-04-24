import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  CalendarDays,
  Clock3,
  Banknote,
  User,
  Hash,
  Home,
  X,
  MessageCircle
} from 'lucide-react';

export default function BookingConfirmation({ booking, onClose }) {
  if (!booking) return null;

  const closeHandler = onClose || (() => {
    window.location.href = '/';
  });

  const formatDate = (dateValue) => {
    const parsed = new Date(`${dateValue}T00:00:00`);
    return parsed.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const slots = booking.slots || [];

  return (
    <div className="fixed inset-0 bg-[#111527]/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-[#e5e8f1] shadow-[0_30px_60px_rgba(17,21,39,0.28)] overflow-hidden">
        <button
          type="button"
          onClick={closeHandler}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f3f5fa] text-[#5e6780] hover:text-[#1d2237] flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-6 pt-7 pb-5 bg-gradient-to-r from-[#f84464] to-[#fb6b84] text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="font-display text-2xl">Booking Confirmed</h2>
          <p className="text-sm text-white/85 mt-1">Your turf slot has been reserved successfully.</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="rounded-2xl border border-[#e8ebf3] bg-[#fbfcff] p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#6b7287]">
                <Hash className="w-4 h-4" />
                Booking ID
              </span>
              <span className="font-mono text-[12px] text-[#1d2237] max-w-[180px] truncate" title={booking.bookingId}>
                {booking.bookingId}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#6b7287]">
                <User className="w-4 h-4" />
                Name
              </span>
              <span className="font-semibold text-[#1d2237]">{booking.name || 'Guest'}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#6b7287]">
                <CalendarDays className="w-4 h-4" />
                Date
              </span>
              <span className="font-semibold text-[#1d2237]">{formatDate(booking.date)}</span>
            </div>

            <div className="flex items-start justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-[#6b7287] pt-0.5">
                <Clock3 className="w-4 h-4" />
                Slots
              </span>
              <div className="flex flex-wrap gap-1.5 justify-end max-w-[220px]">
                {slots.map((slot) => (
                  <span key={slot} className="px-2 py-1 rounded-lg bg-white border border-[#f6ccd6] text-[#b63455] text-xs font-medium">
                    {slot}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#e8ebf3] flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#6b7287] text-sm">
                <Banknote className="w-4 h-4" />
                Total Amount
              </span>
              <span className="font-display text-xl text-[#f84464]">Rs {booking.totalPrice}</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#d9e4ff] bg-[#f3f7ff] px-3 py-2 text-xs text-[#4d628f]">
            Please arrive 15 minutes early and show this confirmation at the turf.
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                const nameLine = booking.name ? `Name: ${booking.name}\n` : '';
                const message = encodeURIComponent(
                  `Hi Leo Turf!\n${nameLine}Date: ${formatDate(booking.date)}\nTime: ${slots.join(', ')}\nBooking ID: ${booking.bookingId}`
                );
                window.open(`https://wa.me/918667573511?text=${message}`, '_blank');
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25d366] hover:bg-[#1fb85a] text-white font-semibold py-2.5"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e0e5f0] text-[#2c344f] hover:bg-[#f5f7fc] font-semibold py-2.5"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
