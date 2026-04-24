import React, { useState, useEffect, useCallback } from 'react';
import {
  Calendar as CalendarIcon,
  List,
  Lock,
  ShieldCheck,
  LogOut,
  CalendarDays,
  Banknote
} from 'lucide-react';
import AdminLogin from '../components/admin/AdminLogin';
import BookingsTable from '../components/admin/BookingsTable';
import CalendarView from '../components/admin/CalendarView';
import BlockSlotsForm from '../components/admin/BlockSlotsForm';
import { getAdminBookings, deleteBooking } from '../services/api';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookingFilter, setBookingFilter] = useState('today');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setBookings([]);
    setFetchError('');
    setPagination({ page: 1, pages: 1, total: 0 });
  }, []);

  const fetchBookings = useCallback(
    async (page = 1, currentFilter) => {
      const effectiveFilter = currentFilter || bookingFilter;
      setLoading(true);
      setFetchError('');

      try {
        const response = await getAdminBookings(page, 10, effectiveFilter);
        setBookings(response.data.bookings || []);
        setPagination(response.data.pagination);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          logout();
        } else {
          setBookings([]);
          setPagination({ page: 1, pages: 1, total: 0 });
          setFetchError('Unable to load bookings for this filter. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    },
    [bookingFilter, logout]
  );

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchBookings(1, bookingFilter);
    }
  }, [isLoggedIn, bookingFilter, fetchBookings]);

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      await deleteBooking(id);
      fetchBookings(pagination.page, bookingFilter);
    } catch (err) {
      console.error(err);
      alert('Failed to delete booking');
    }
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  const filterTitle =
    bookingFilter === 'today'
      ? "Today's"
      : bookingFilter === 'tomorrow'
        ? "Tomorrow's"
        : 'All';

  return (
    <div className="min-h-screen bg-[#f5f6fb] pt-20 md:pt-24 pb-10 md:pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[220px] md:h-[260px] bg-gradient-to-b from-[#202743] to-transparent pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-3 md:px-6 relative z-10">
        <section className="rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#1f2440] via-[#2a3156] to-[#191d34] p-4 md:p-8 text-white shadow-[0_22px_45px_rgba(20,28,56,0.35)] mb-4 md:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/10 border border-white/20 text-[#ff91a6] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-[11px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.24em] text-[#fca5b6] mb-1.5">Leo Turf</p>
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight">Admin Control Center</h1>
                <p className="text-xs sm:text-sm md:text-base text-white/75 mt-2">
                  Monitor bookings, manage calendar coverage, and control slot availability.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-white px-4 py-2.5 font-semibold text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </section>

        <nav className="booking-surface rounded-2xl p-2 mb-4 md:mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold border transition-colors ${
              activeTab === 'bookings'
                ? 'bg-[#f84464] text-white border-[#f84464]'
                : 'bg-white text-[#5a627b] border-[#e3e7f2] hover:bg-[#f8f9fd]'
            }`}
          >
            <List className="w-4 h-4" />
            Bookings
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold border transition-colors ${
              activeTab === 'calendar'
                ? 'bg-[#3558ba] text-white border-[#3558ba]'
                : 'bg-white text-[#5a627b] border-[#e3e7f2] hover:bg-[#f8f9fd]'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            Calendar
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('block-slots')}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold border transition-colors ${
              activeTab === 'block-slots'
                ? 'bg-[#1f9d73] text-white border-[#1f9d73]'
                : 'bg-white text-[#5a627b] border-[#e3e7f2] hover:bg-[#f8f9fd]'
            }`}
          >
            <Lock className="w-4 h-4" />
            Block Slots
          </button>
        </nav>

        {activeTab === 'bookings' && (
          <section className="space-y-4 md:space-y-5">
            <div className="booking-surface rounded-2xl p-4 md:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl md:text-2xl text-[#1d2237]">{filterTitle} Bookings</h2>
                  <p className="text-sm text-[#6b7287]">Track recent reservations and manage entries.</p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl bg-[#fff1f4] text-[#b63455] px-3 py-2 text-sm font-semibold">
                  <Banknote className="w-4 h-4" />
                  Total: {pagination.total || 0}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { key: 'today', label: "Today's" },
                  { key: 'tomorrow', label: "Tomorrow's" },
                  { key: 'all', label: 'All' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setBookingFilter(item.key)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors ${
                      bookingFilter === item.key
                        ? 'bg-[#f84464] text-white border-[#f84464]'
                        : 'bg-white text-[#5f6881] border-[#e3e7f2] hover:bg-[#f8f9fd]'
                    }`}
                  >
                    {item.label} Bookings
                  </button>
                ))}
              </div>
            </div>

            {fetchError && (
              <div className="rounded-xl border border-[#f4b8c4] bg-[#fff1f4] px-4 py-3 text-[#a6284a] text-sm">
                {fetchError}
              </div>
            )}

            <BookingsTable bookings={bookings} onDelete={handleDeleteBooking} loading={loading} />

            {pagination.pages > 1 && (
              <div className="booking-surface rounded-2xl p-3 flex flex-wrap justify-center gap-2">
                {Array.from({ length: pagination.pages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => fetchBookings(page, bookingFilter)}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-colors ${
                      pagination.page === page
                        ? 'bg-[#f84464] text-white border-[#f84464]'
                        : 'bg-white text-[#5f6881] border-[#e3e7f2] hover:bg-[#f8f9fd]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'calendar' && (
          <section className="space-y-4">
            <div className="booking-surface rounded-2xl p-4 md:p-5">
              <h2 className="font-display text-xl md:text-2xl text-[#1d2237] flex items-center gap-2.5">
                <CalendarDays className="w-5 h-5 text-[#3558ba]" />
                Booking Calendar
              </h2>
              <p className="text-sm text-[#6b7287] mt-1">Click any date to inspect detailed bookings and slots for that day.</p>
            </div>
            <CalendarView />
          </section>
        )}

        {activeTab === 'block-slots' && (
          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-4 md:gap-6">
            <BlockSlotsForm onSuccess={() => fetchBookings(pagination.page, bookingFilter)} />

            <aside className="space-y-4">
              <div className="booking-surface rounded-2xl p-4">
                <h3 className="font-display text-lg text-[#1d2237] mb-2">Quick Guide</h3>
                <p className="text-sm text-[#6b7287]">
                  Use Block mode to prevent bookings for maintenance. Use Unblock mode to reopen previously blocked slots.
                </p>
              </div>

              <div className="rounded-2xl border border-[#dbe4ff] bg-[#f3f7ff] p-4">
                <p className="text-sm font-semibold text-[#3558ba] mb-2">Best Practice</p>
                <p className="text-sm text-[#536893]">
                  Add a clear reason while blocking slots so your operations team can track slot availability changes.
                </p>
              </div>
            </aside>
          </section>
        )}
      </div>
    </div>
  );
}
