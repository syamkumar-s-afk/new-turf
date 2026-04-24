import React, { useState, useEffect } from 'react';
import { CalendarDays, Clock3 } from 'lucide-react';

export default function CurrentTimeDisplay() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const time = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      const date = now.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      setCurrentTime(time);
      setCurrentDate(date);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="booking-surface rounded-xl md:rounded-2xl p-3.5 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#ffe8ee] text-[#f84464] flex items-center justify-center">
            <Clock3 className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div>
            <p className="text-[11px] md:text-xs uppercase tracking-wide text-[#6b7287]">Current Time</p>
            <p className="text-[#1d2237] font-semibold text-sm md:text-base">{currentTime} IST</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#eef3ff] text-[#3357c0] flex items-center justify-center">
            <CalendarDays className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div>
            <p className="text-[11px] md:text-xs uppercase tracking-wide text-[#6b7287]">Booking Date Context</p>
            <p className="text-[#1d2237] font-semibold text-sm md:text-base">{currentDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
