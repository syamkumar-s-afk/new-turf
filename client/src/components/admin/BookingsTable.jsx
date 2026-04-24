import React from 'react';
import { Trash2, CalendarDays, Clock3, Phone, User } from 'lucide-react';

const formatDate = (dateValue) => {
  const parsedDate = new Date(`${dateValue}T00:00:00`);
  return parsedDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export default function BookingsTable({ bookings, onDelete, loading }) {
  if (loading) {
    return (
      <div className="booking-surface rounded-2xl p-4 md:p-6 animate-pulse">
        <div className="h-8 bg-[#edf0f7] rounded mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-20 bg-[#f4f6fb] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="booking-surface rounded-2xl p-8 text-center">
        <h3 className="font-display text-xl text-[#1d2237] mb-2">No Bookings Found</h3>
        <p className="text-sm text-[#6b7287]">There are no bookings matching this filter.</p>
      </div>
    );
  }

  return (
    <div className="booking-surface rounded-2xl overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8f9fd] border-b border-[#e8ebf3] text-[#6b7287] text-xs font-semibold tracking-wide uppercase">
              <th className="px-4 lg:px-6 py-4">Name</th>
              <th className="px-4 lg:px-6 py-4">Phone</th>
              <th className="px-4 lg:px-6 py-4">Date</th>
              <th className="px-4 lg:px-6 py-4">Slots</th>
              <th className="px-4 lg:px-6 py-4">Amount</th>
              <th className="px-4 lg:px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef1f8]">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-[#fbfcff] transition-colors">
                <td className="px-4 lg:px-6 py-4 text-[#1d2237] font-semibold capitalize">{booking.name}</td>
                <td className="px-4 lg:px-6 py-4 text-[#5b647d] font-medium">{booking.phone}</td>
                <td className="px-4 lg:px-6 py-4 text-[#3f4862] text-sm">{formatDate(booking.date)}</td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {booking.slots.slice(0, 2).map((slot) => (
                      <span
                        key={slot}
                        className="px-2 py-1 bg-[#fff1f4] border border-[#f6ccd6] text-[#b63455] rounded-md text-xs font-semibold whitespace-nowrap"
                      >
                        {slot}
                      </span>
                    ))}
                    {booking.slots.length > 2 && (
                      <span className="px-2 py-1 bg-[#f5f7fc] border border-[#e5eaf5] text-[#5f6881] rounded-md text-xs font-semibold">
                        +{booking.slots.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-[#f84464] font-bold">Rs {booking.totalPrice}</td>
                <td className="px-4 lg:px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => onDelete(booking._id)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#f0d0d8] text-[#cf486a] hover:bg-[#fff1f4] transition-colors"
                    title="Delete Booking"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden p-3 space-y-3">
        {bookings.map((booking) => (
          <article key={booking._id} className="rounded-xl border border-[#e6eaf4] bg-white p-3.5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-[#1d2237] font-semibold capitalize">{booking.name}</p>
                <p className="text-xs text-[#6b7287] mt-0.5">ID: {booking._id.slice(-6)}</p>
              </div>
              <button
                type="button"
                onClick={() => onDelete(booking._id)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#f0d0d8] text-[#cf486a] hover:bg-[#fff1f4] transition-colors"
                title="Delete Booking"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-[#57607a]">
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{booking.phone}</p>
              <p className="flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5" />{formatDate(booking.date)}</p>
              <p className="flex items-start gap-2">
                <Clock3 className="w-3.5 h-3.5 mt-0.5" />
                <span className="flex flex-wrap gap-1">
                  {booking.slots.map((slot) => (
                    <span key={slot} className="px-1.5 py-0.5 rounded bg-[#fff1f4] text-[#b63455] border border-[#f6ccd6]">
                      {slot}
                    </span>
                  ))}
                </span>
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#edf0f7] flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs text-[#6b7287]"><User className="w-3.5 h-3.5" />Booking</span>
              <span className="font-display text-lg text-[#f84464]">Rs {booking.totalPrice}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
