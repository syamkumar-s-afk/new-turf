import React, { useState, useEffect, useCallback } from 'react';
import { CalendarDays, Lock, Unlock, AlertTriangle } from 'lucide-react';
import { blockSlots, unblockSlots, getSlots } from '../../services/api';

const TIME_SLOTS = [
  '6:00 AM - 7:00 AM', '7:00 AM - 8:00 AM', '8:00 AM - 9:00 AM',
  '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM', '5:00 PM - 6:00 PM',
  '6:00 PM - 7:00 PM', '7:00 PM - 8:00 PM', '8:00 PM - 9:00 PM',
  '9:00 PM - 10:00 PM', '10:00 PM - 11:00 PM', '11:00 PM - 12:00 AM'
];

const formatDateForInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function BlockSlotsForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    date: '',
    reason: 'Maintenance',
    selectedSlots: []
  });
  const [mode, setMode] = useState('block');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentBlockedSlots, setCurrentBlockedSlots] = useState([]);

  const fetchBlockedSlots = useCallback(async () => {
    if (!formData.date) return;

    try {
      const response = await getSlots(formData.date);
      const blockedSlots = (response.data.slots || [])
        .filter((slot) => slot.status === 'blocked')
        .map((slot) => slot.time);
      setCurrentBlockedSlots(blockedSlots);
    } catch (err) {
      console.error('Error fetching slots:', err);
    }
  }, [formData.date]);

  useEffect(() => {
    fetchBlockedSlots();
  }, [fetchBlockedSlots]);

  const handleSlotToggle = (slot) => {
    setFormData((prev) => ({
      ...prev,
      selectedSlots: prev.selectedSlots.includes(slot)
        ? prev.selectedSlots.filter((currentSlot) => currentSlot !== slot)
        : [...prev.selectedSlots, slot]
    }));
  };

  const setQuickDate = (daysOffset) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    setFormData((prev) => ({
      ...prev,
      date: formatDateForInput(date),
      selectedSlots: []
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.date || !formData.selectedSlots.length) {
      setError('Please select a date and at least one slot.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'block') {
        await blockSlots(formData.date, formData.selectedSlots, formData.reason);
        setSuccess(`${formData.selectedSlots.length} slot(s) blocked successfully.`);
      } else {
        await unblockSlots(formData.date, formData.selectedSlots);
        setSuccess(`${formData.selectedSlots.length} slot(s) unblocked successfully.`);
      }

      setFormData((prev) => ({ ...prev, reason: 'Maintenance', selectedSlots: [] }));
      if (onSuccess) onSuccess();
      fetchBlockedSlots();
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${mode} slots.`);
    } finally {
      setLoading(false);
    }
  };

  const todayValue = formatDateForInput(new Date());
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowValue = formatDateForInput(tomorrowDate);

  return (
    <form onSubmit={handleSubmit} className="booking-surface rounded-2xl p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-display text-xl text-[#1d2237]">Manage Slots</h3>
          <p className="text-sm text-[#6b7287]">Block or unblock slots for specific dates.</p>
        </div>

        {currentBlockedSlots.length > 0 && (
          <span className="inline-flex items-center gap-2 rounded-xl bg-[#fff5e8] text-[#b86a24] px-3 py-2 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4" />
            {currentBlockedSlots.length} blocked
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          type="button"
          onClick={() => {
            setMode('block');
            setFormData((prev) => ({ ...prev, selectedSlots: [] }));
          }}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold border transition-colors ${
            mode === 'block'
              ? 'bg-[#f84464] text-white border-[#f84464]'
              : 'bg-white text-[#5a627b] border-[#e4e8f2] hover:bg-[#f8f9fd]'
          }`}
        >
          <Lock className="w-4 h-4" />
          Block Slots
        </button>

        <button
          type="button"
          onClick={() => {
            setMode('unblock');
            setFormData((prev) => ({ ...prev, selectedSlots: [] }));
          }}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold border transition-colors ${
            mode === 'unblock'
              ? 'bg-[#3558ba] text-white border-[#3558ba]'
              : 'bg-white text-[#5a627b] border-[#e4e8f2] hover:bg-[#f8f9fd]'
          }`}
        >
          <Unlock className="w-4 h-4" />
          Unblock Slots
        </button>
      </div>

      {error && <div className="mb-4 rounded-xl border border-[#f4b8c4] bg-[#fff1f4] px-3 py-2 text-sm text-[#a6284a]">{error}</div>}
      {success && <div className="mb-4 rounded-xl border border-[#c8efdc] bg-[#ecfdf4] px-3 py-2 text-sm text-[#15784c]">{success}</div>}

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-[#47506a] block mb-1.5">Date</label>
          <div className="flex items-center gap-2 mb-2">
            <button
              type="button"
              onClick={() => setQuickDate(0)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold border ${
                formData.date === todayValue
                  ? 'bg-[#fff1f4] border-[#f6c4d1] text-[#b63455]'
                  : 'bg-white border-[#dfe4ef] text-[#5f6881]'
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setQuickDate(1)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold border ${
                formData.date === tomorrowValue
                  ? 'bg-[#fff1f4] border-[#f6c4d1] text-[#b63455]'
                  : 'bg-white border-[#dfe4ef] text-[#5f6881]'
              }`}
            >
              Tomorrow
            </button>
          </div>

          <div className="relative">
            <CalendarDays className="w-4 h-4 text-[#8e96ab] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={formData.date}
              onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value, selectedSlots: [] }))}
              className="w-full rounded-xl border border-[#dfe4ef] bg-white pl-10 pr-3 py-2.5 text-[#1d2237] focus:outline-none focus:ring-2 focus:ring-[#f2a9b7]"
            />
          </div>
        </div>

        {mode === 'block' && (
          <div>
            <label className="text-sm font-medium text-[#47506a] block mb-1.5">Reason</label>
            <input
              type="text"
              value={formData.reason}
              onChange={(event) => setFormData((prev) => ({ ...prev, reason: event.target.value }))}
              placeholder="e.g. Maintenance, Private Event"
              className="w-full rounded-xl border border-[#dfe4ef] bg-white px-3 py-2.5 text-[#1d2237] focus:outline-none focus:ring-2 focus:ring-[#f2a9b7]"
            />
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-[#47506a] block mb-2">Select Slots</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl border border-[#e9edf6] bg-[#f9fbff] p-3">
            {TIME_SLOTS.map((slot) => {
              const isBlocked = currentBlockedSlots.includes(slot);
              const isSelected = formData.selectedSlots.includes(slot);
              const isDisabled = mode === 'block' ? isBlocked : !isBlocked;

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => !isDisabled && handleSlotToggle(slot)}
                  disabled={isDisabled}
                  className={`text-left rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-[#f84464] border-[#f84464] text-white'
                      : isDisabled
                        ? 'bg-[#f0f3f9] border-[#e2e7f1] text-[#9aa2b5] cursor-not-allowed'
                        : 'bg-white border-[#dfe4ef] text-[#4d5670] hover:bg-[#fff7f9] hover:border-[#f7a8b7]'
                  }`}
                >
                  {slot}
                  {isBlocked && <span className="ml-1 text-[10px] uppercase">(blocked)</span>}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !formData.selectedSlots.length}
          className={`w-full rounded-xl font-bold py-2.5 text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
            mode === 'block'
              ? 'bg-[#f84464] hover:bg-[#db3053] text-white'
              : 'bg-[#3558ba] hover:bg-[#2c4a9f] text-white'
          }`}
        >
          {loading
            ? mode === 'block'
              ? 'Blocking slots...'
              : 'Unblocking slots...'
            : `${mode === 'block' ? 'Block' : 'Unblock'} ${formData.selectedSlots.length} Slot${formData.selectedSlots.length !== 1 ? 's' : ''}`}
        </button>
      </div>
    </form>
  );
}
