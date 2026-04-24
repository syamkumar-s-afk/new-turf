import React, { useState } from 'react';
import {
  CalendarDays,
  Clock3,
  Banknote,
  User,
  Phone,
  Ticket,
  ShieldCheck
} from 'lucide-react';

export default function BookingForm({ date, slots, onSubmit, loading }) {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({});

  const totalPrice = slots.length * 1000;

  const formatDate = (dateValue) => {
    if (!dateValue) return '';
    const parsedDate = new Date(`${dateValue}T00:00:00`);
    return parsedDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;

    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter your full name.';
    }

    if (!formData.phone) {
      nextErrors.phone = 'Please enter your phone number.';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      nextErrors.phone = 'Phone number must be 10 digits.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="booking-surface rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col gap-4 md:gap-5">
      <div className="flex items-center gap-3 pb-3 md:pb-4 border-b border-[#eceff6]">
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-[#ffe8ee] text-[#f84464] flex items-center justify-center">
          <Ticket className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display text-lg md:text-xl text-[#1d2237]">Booking Summary</h3>
          <p className="text-xs sm:text-sm text-[#6b7287]">Review and confirm your slot reservation.</p>
        </div>
      </div>

      <section className="rounded-xl md:rounded-2xl border border-[#f5ccd5] bg-[#fff7f9] p-3 md:p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          <span className="flex items-center gap-2 text-[#6b7287]">
            <CalendarDays className="w-4 h-4" />
            Date
          </span>
          <span className="font-semibold text-[#1d2237]">{formatDate(date)}</span>
        </div>

        <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
          <span className="flex items-center gap-2 text-[#6b7287] pt-0.5">
            <Clock3 className="w-4 h-4" />
            Slots
          </span>
          <div className="flex flex-wrap justify-end gap-1.5 max-w-[220px]">
            {slots.map((slot) => (
              <span
                key={slot}
                className="text-xs px-2 py-1 rounded-lg bg-white border border-[#ffd8e1] text-[#b23253] font-medium"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[#f4d9e0] flex items-center justify-between">
          <span className="flex items-center gap-2 text-[#6b7287] text-sm">
            <Banknote className="w-4 h-4" />
            Total amount
          </span>
          <span className="font-display text-xl md:text-2xl text-[#f84464]">Rs {totalPrice}</span>
        </div>
      </section>

      <div className="space-y-3.5 md:space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-[#49516b] block mb-1.5">
            Full name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#8e96ab] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full rounded-xl border bg-white pl-10 pr-3 py-2.5 md:py-3 text-sm md:text-base text-[#1d2237] focus:outline-none focus:ring-2 focus:ring-[#f2a9b7] ${
                errors.name ? 'border-[#e65f7f]' : 'border-[#dfe4ef]'
              }`}
            />
          </div>
          {errors.name && <p className="text-xs text-[#d92f5b] mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium text-[#49516b] block mb-1.5">
            Phone number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#8e96ab] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
              placeholder="10-digit mobile number"
              className={`w-full rounded-xl border bg-white pl-10 pr-3 py-2.5 md:py-3 text-sm md:text-base text-[#1d2237] focus:outline-none focus:ring-2 focus:ring-[#f2a9b7] ${
                errors.phone ? 'border-[#e65f7f]' : 'border-[#dfe4ef]'
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs text-[#d92f5b] mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="rounded-xl bg-[#f5f7fc] border border-[#e7ebf4] px-3 py-2.5 text-xs text-[#616a82] flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-[#3558ba] mt-0.5" />
        Your booking is confirmed instantly after submission. Keep the confirmation popup for check-in.
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#f84464] hover:bg-[#db3053] text-white font-bold py-3 md:py-3.5 text-sm md:text-base transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing booking...' : `Confirm Booking - Rs ${totalPrice}`}
      </button>
    </form>
  );
}
