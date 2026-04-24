import React, { useState, useEffect, useCallback } from 'react';
import {
  Banknote,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Phone,
  User
} from 'lucide-react';
import { getAdminBookings, getAdminBookingsByDate, getCalendar } from '../../services/api';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const formatCalendarDate = (dateValue) => {
  if (!dateValue) return '--';

  return new Date(`${dateValue}T00:00:00`).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const formatBookingTime = (createdAt) => {
  if (!createdAt) return '--';

  return new Date(createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function CalendarView() {
  const [month, setMonth] = useState('');
  const [calendar, setCalendar] = useState({});
  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateBookings, setSelectedDateBookings] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');

  const fetchBookingsByDateFallback = useCallback(async (date) => {
    const limit = 100;
    const maxPages = 60;
    let page = 1;
    let pages = 1;
    const matched = [];

    while (page <= pages && page <= maxPages) {
      const response = await getAdminBookings(page, limit, 'all');
      const pageBookings = response.data?.bookings || [];
      const pagePagination = response.data?.pagination;

      matched.push(...pageBookings.filter((booking) => booking.date === date));
      pages = pagePagination?.pages || 1;
      page += 1;
    }

    return matched.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, []);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const monthNum = String(today.getMonth() + 1).padStart(2, '0');
    const currentMonth = `${year}-${monthNum}`;

    setMonth(currentMonth);
    setSelectedDate(`${currentMonth}-${String(today.getDate()).padStart(2, '0')}`);
  }, []);

  const fetchCalendar = useCallback(async () => {
    if (!month) return;

    setLoading(true);
    try {
      const response = await getCalendar(month);
      setCalendar(response.data.calendar || {});
    } catch (err) {
      console.error(err);
      setCalendar({});
    } finally {
      setLoading(false);
    }
  }, [month]);

  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);

  useEffect(() => {
    if (!month) return;

    if (selectedDate && selectedDate.startsWith(month)) return;

    const firstBusyDate = Object.keys(calendar)
      .filter((dateKey) => dateKey.startsWith(month) && (calendar[dateKey]?.bookings || 0) > 0)
      .sort()[0];

    setSelectedDate(firstBusyDate || `${month}-01`);
  }, [month, calendar, selectedDate]);

  useEffect(() => {
    if (!selectedDate) return;

    let active = true;

    const fetchSelectedDateBookings = async () => {
      setDetailLoading(true);
      setDetailError('');

      try {
        const response = await getAdminBookingsByDate(selectedDate);

        if (!active) return;

        setSelectedDateBookings(response.data.bookings || []);
      } catch (err) {
        try {
          const fallbackBookings = await fetchBookingsByDateFallback(selectedDate);

          if (!active) return;

          setSelectedDateBookings(fallbackBookings);
        } catch (fallbackErr) {
          if (!active) return;

          console.error(err);
          console.error(fallbackErr);
          setSelectedDateBookings([]);
          setDetailError('Unable to load detailed bookings for this date.');
        }
      } finally {
        if (active) {
          setDetailLoading(false);
        }
      }
    };

    fetchSelectedDateBookings();

    return () => {
      active = false;
    };
  }, [fetchBookingsByDateFallback, selectedDate]);

  if (!month) return null;

  const [year, monthNum] = month.split('-');

  const getDaysInMonth = () => new Date(year, monthNum, 0).getDate();

  const getFirstDayOfMonth = () => new Date(year, monthNum - 1, 1).getDay();

  const handlePrevMonth = () => {
    const date = new Date(`${month}-01`);
    date.setMonth(date.getMonth() - 1);
    const prevMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    setMonth(prevMonth);
    setSelectedDate(`${prevMonth}-01`);
  };

  const handleNextMonth = () => {
    const date = new Date(`${month}-01`);
    date.setMonth(date.getMonth() + 1);
    const nextMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    setMonth(nextMonth);
    setSelectedDate(`${nextMonth}-01`);
  };

  const monthName = new Date(`${month}-01`).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric'
  });

  const days = [];
  const daysInMonth = getDaysInMonth();
  const firstDay = getFirstDayOfMonth();

  for (let i = 0; i < firstDay; i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(`${year}-${monthNum}-${String(day).padStart(2, '0')}`);
  }

  const selectedDaySummary = selectedDate ? calendar[selectedDate] : null;

  const summaryBookingCount = selectedDaySummary?.bookings || 0;
  const summaryUniqueSlots = new Set(selectedDaySummary?.slots || []).size;
  const summaryRevenue = selectedDaySummary?.totalRevenue || 0;

  const detailBookingCount = selectedDateBookings.length;
  const detailUniqueSlots = new Set(selectedDateBookings.flatMap((booking) => booking.slots || [])).size;
  const detailRevenue = selectedDateBookings.reduce(
    (sum, booking) => sum + (booking.totalPrice || 0),
    0
  );

  const effectiveBookingCount = detailLoading || detailError ? summaryBookingCount : detailBookingCount;
  const effectiveUniqueSlots = detailLoading || detailError ? summaryUniqueSlots : detailUniqueSlots;
  const effectiveRevenue = detailLoading || detailError ? summaryRevenue : detailRevenue;

  return (
    <div className="booking-surface rounded-2xl p-4 md:p-6">
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="inline-flex items-center gap-1 rounded-lg border border-[#e3e7f2] px-3 py-2 text-sm text-[#49516b] hover:bg-[#f6f8fd]"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        <h3 className="font-display text-lg md:text-xl text-[#1d2237]">{monthName}</h3>

        <button
          type="button"
          onClick={handleNextMonth}
          className="inline-flex items-center gap-1 rounded-lg border border-[#e3e7f2] px-3 py-2 text-sm text-[#49516b] hover:bg-[#f6f8fd]"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-7 gap-1.5 md:gap-2 animate-pulse">
          {Array.from({ length: 35 }, (_, index) => (
            <div key={index} className="aspect-square rounded-lg bg-[#f2f5fc]" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1.5 md:gap-2 mb-2">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center text-[11px] md:text-xs font-semibold text-[#6b7287] py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 md:gap-2">
            {days.map((dateValue, index) => {
              if (!dateValue) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="aspect-square rounded-lg border border-transparent bg-[#f7f9fd]"
                  />
                );
              }

              const bookingData = calendar[dateValue] || null;
              const bookingCount = bookingData?.bookings || 0;
              const hasBookings = bookingCount > 0;
              const isSelected = selectedDate === dateValue;

              return (
                <button
                  key={dateValue}
                  type="button"
                  onClick={() => setSelectedDate(dateValue)}
                  className={`aspect-square rounded-lg border flex flex-col items-center justify-center text-xs md:text-sm font-semibold transition-colors ${
                    isSelected
                      ? 'bg-[#f84464] border-[#f84464] text-white'
                      : hasBookings
                        ? 'bg-[#fff1f4] border-[#f7c4d0] text-[#b63455] hover:bg-[#ffe8ef]'
                        : 'bg-white border-[#edf0f7] text-[#7c849a] hover:bg-[#f8f9fd]'
                  }`}
                  aria-label={`${formatCalendarDate(dateValue)}${hasBookings ? `, ${bookingCount} bookings` : ', no bookings'}`}
                >
                  <span>{dateValue.split('-')[2]}</span>
                  {hasBookings && <span className="text-[10px] leading-tight mt-0.5">{bookingCount} b</span>}
                </button>
              );
            })}
          </div>

          <div className="mt-5 border-t border-[#e8ebf3] pt-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h4 className="font-display text-lg text-[#1d2237] flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#3558ba]" />
                  {formatCalendarDate(selectedDate)}
                </h4>
                <p className="text-sm text-[#6b7287] mt-1">
                  Click any date in the calendar to inspect detailed bookings.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f3f7ff] border border-[#dbe4ff] px-2.5 py-1.5 text-xs font-semibold text-[#3558ba]">
                  <User className="w-3.5 h-3.5" />
                  {effectiveBookingCount} Bookings
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#fff1f4] border border-[#f6ccd6] px-2.5 py-1.5 text-xs font-semibold text-[#b63455]">
                  <Clock3 className="w-3.5 h-3.5" />
                  {effectiveUniqueSlots} Unique Slots
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#eefbf5] border border-[#cdeede] px-2.5 py-1.5 text-xs font-semibold text-[#1f9d73]">
                  <Banknote className="w-3.5 h-3.5" />
                  Rs {effectiveRevenue}
                </span>
              </div>
            </div>

            {detailLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-pulse">
                {Array.from({ length: Math.max(1, summaryBookingCount) }, (_, index) => (
                  <div key={index} className="h-28 rounded-xl border border-[#e6eaf4] bg-[#f9fbff]" />
                ))}
              </div>
            ) : detailError ? (
              <div className="rounded-xl border border-[#f4b8c4] bg-[#fff1f4] px-4 py-3 text-[#a6284a] text-sm">
                {detailError}
                {summaryBookingCount > 0 && ' Summary shows bookings on this date, but detailed records could not be loaded.'}
              </div>
            ) : selectedDateBookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedDateBookings.map((booking) => (
                  <article
                    key={booking._id}
                    className="rounded-xl border border-[#e6eaf4] bg-white p-3.5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div>
                        <p className="text-[#1d2237] font-semibold capitalize">{booking.name}</p>
                        <p className="text-xs text-[#6b7287] mt-0.5">Booked at {formatBookingTime(booking.createdAt)}</p>
                      </div>
                      <span className="text-[#f84464] font-bold text-sm">Rs {booking.totalPrice}</span>
                    </div>

                    <p className="flex items-center gap-2 text-xs text-[#57607a] mb-2">
                      <Phone className="w-3.5 h-3.5" />
                      {booking.phone}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {(booking.slots || []).map((slot) => (
                        <span
                          key={`${booking._id}-${slot}`}
                          className="px-2 py-1 rounded-md bg-[#fff1f4] text-[#b63455] border border-[#f6ccd6] text-xs font-semibold"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-[#e7ebf6] bg-[#fafbff] px-4 py-5 text-center">
                <p className="font-semibold text-[#1d2237]">No bookings for this date</p>
                <p className="text-sm text-[#6b7287] mt-1">Select another date to review booking details.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
