import React from 'react';
import { ChevronRight, CalendarDays } from 'lucide-react';

export default function DatePicker({ selectedDate, onDateChange }) {
  const dates = Array.from({ length: 21 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return {
      value: `${year}-${month}-${day}`,
      weekday: date.toLocaleDateString('en-IN', { weekday: 'short' }),
      monthLabel: date.toLocaleDateString('en-IN', { month: 'short' }),
      day: date.getDate(),
      tag: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : ''
    };
  });

  return (
    <section className="booking-surface rounded-2xl md:rounded-3xl p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 md:gap-3 mb-4 md:mb-5">
        <div>
          <h2 className="font-display text-lg sm:text-xl md:text-2xl text-[#1d2237]">Select Date</h2>
          <p className="text-xs sm:text-sm text-[#6b7287]">Pick your match day before selecting slots.</p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg md:rounded-xl bg-[#fff1f4] text-[#f84464] text-[10px] sm:text-xs font-semibold uppercase tracking-wide">
          <CalendarDays className="w-4 h-4" />
          Smart date flow
        </div>
      </div>

      <div className="overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
        <div className="flex gap-2.5 md:gap-3 min-w-max">
          {dates.map((dateOption) => {
            const isSelected = selectedDate === dateOption.value;

            return (
              <button
                key={dateOption.value}
                type="button"
                onClick={() => onDateChange(dateOption.value)}
                className={`min-w-[78px] sm:min-w-[92px] rounded-xl md:rounded-2xl border px-2.5 sm:px-3 py-2.5 sm:py-3 text-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#f84464] border-[#f84464] text-white shadow-[0_10px_24px_rgba(248,68,100,0.32)] -translate-y-[1px]'
                    : 'bg-white border-[#e5e8f1] text-[#1d2237] hover:border-[#f7a8b7] hover:bg-[#fff7f9]'
                }`}
              >
                <p className={`text-[11px] uppercase tracking-wider font-semibold ${isSelected ? 'text-white/85' : 'text-[#6b7287]'}`}>
                  {dateOption.weekday}
                </p>
                <p className="font-display text-xl sm:text-2xl leading-none mt-1">{dateOption.day}</p>
                <p className={`text-[11px] mt-1 ${isSelected ? 'text-white/85' : 'text-[#6b7287]'}`}>{dateOption.monthLabel}</p>
                {dateOption.tag && (
                  <p className={`mt-2 text-[10px] uppercase tracking-wide font-bold ${isSelected ? 'text-white' : 'text-[#f84464]'}`}>
                    {dateOption.tag}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 md:mt-5 flex items-center gap-2 text-[11px] sm:text-xs text-[#6b7287]">
        <ChevronRight className="w-4 h-4 text-[#f84464]" />
        Tip: You can book up to 21 days in advance.
      </div>
    </section>
  );
}
