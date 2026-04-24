import React from 'react';
import { Clock3, Flame, Info, Ban, CheckCircle2 } from 'lucide-react';
import SlotButton from './SlotButton';

const SLOT_BUCKETS = [
  { key: 'morning', label: 'Morning', range: [6, 11] },
  { key: 'afternoon', label: 'Afternoon', range: [12, 16] },
  { key: 'evening', label: 'Evening', range: [17, 21] },
  { key: 'night', label: 'Late Night', range: [22, 23] }
];

export default function SlotGrid({
  slots,
  selectedSlots,
  onSlotSelect,
  onClearSelection,
  loading,
  peakHours,
  maxSlots = 3,
  selectionInfo = ''
}) {
  const selectionLimitReached = selectedSlots.length >= maxSlots;

  const canSelectSlot = (time) => {
    if (selectedSlots.length === 0) return true;
    if (selectedSlots.includes(time)) return true;
    if (selectionLimitReached) return false;

    const slotIndex = slots.findIndex((slot) => slot.time === time);
    const selectedIndices = selectedSlots
      .map((selected) => slots.findIndex((slot) => slot.time === selected))
      .filter((index) => index >= 0);

    if (slotIndex < 0 || selectedIndices.length === 0) return false;

    const minSelected = Math.min(...selectedIndices);
    const maxSelected = Math.max(...selectedIndices);

    return slotIndex === minSelected - 1 || slotIndex === maxSelected + 1;
  };

  const groupedSlots = SLOT_BUCKETS.map((bucket) => {
    const bucketSlots = slots.filter(
      (slot) => slot.startHour >= bucket.range[0] && slot.startHour <= bucket.range[1]
    );

    return {
      ...bucket,
      slots: bucketSlots
    };
  }).filter((bucket) => bucket.slots.length > 0);

  if (loading) {
    return (
      <section className="booking-surface rounded-2xl md:rounded-3xl p-4 md:p-6">
        <div className="h-6 w-36 md:h-7 md:w-44 bg-[#edf0f7] rounded mb-4 md:mb-5 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-16 md:h-20 bg-[#f4f6fb] rounded-xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (!slots.length) {
    return (
      <section className="booking-surface rounded-2xl md:rounded-3xl p-4 md:p-6 text-center">
        <h2 className="font-display text-lg md:text-xl text-[#1d2237] mb-2">No Slots Published</h2>
        <p className="text-xs sm:text-sm text-[#6b7287]">No slots are configured for this date yet. Try another day.</p>
      </section>
    );
  }

  return (
    <section className="booking-surface rounded-2xl md:rounded-3xl p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
        <div>
          <h2 className="font-display text-lg sm:text-xl md:text-2xl text-[#1d2237]">Select Slots</h2>
          <p className="text-xs sm:text-sm text-[#6b7287]">Choose continuous slots just like selecting a show-time block.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#fff1f4] text-[#f84464] text-xs font-semibold uppercase tracking-wide">
            <Clock3 className="w-4 h-4" />
            {selectedSlots.length} / {maxSlots} selected
          </span>
          {selectedSlots.length > 0 && (
            <button
              type="button"
              onClick={onClearSelection}
              className="px-3 py-2 rounded-xl border border-[#e2e5ee] text-[#47506a] text-xs font-semibold uppercase tracking-wide hover:border-[#f7a8b7] hover:text-[#f84464] transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {(selectionLimitReached || selectionInfo) && (
        <div className="mb-4 rounded-xl border border-[#f4b8c4] bg-[#fff1f4] px-3 py-2 text-xs sm:text-sm text-[#a6284a] font-semibold">
          Maximum selection reached.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-6">
        {groupedSlots.map((group) => (
          <div key={group.key} className="rounded-xl md:rounded-2xl border border-[#edf0f6] bg-[#fbfcff] p-3 md:p-4">
            <div className="flex items-center justify-between mb-2.5 md:mb-3">
              <h3 className="font-semibold text-[#1d2237]">{group.label}</h3>
              <p className="text-xs text-[#6b7287]">{group.slots.length} slots</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {group.slots.map((slot) => {
                const isSelected = selectedSlots.includes(slot.time);
                const blockedByLimit = selectionLimitReached && !isSelected && slot.status === 'available';
                const isDisabled = slot.status !== 'available' || blockedByLimit || !canSelectSlot(slot.time);
                const isPeak = peakHours.includes(slot.startHour);

                return (
                  <SlotButton
                    key={slot.time}
                    slot={slot}
                    isSelected={isSelected}
                    isPeak={isPeak}
                    maxReached={blockedByLimit}
                    disabled={isDisabled}
                    onSelect={onSlotSelect}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] md:text-xs">
        <div className="flex items-center gap-2 text-[#159b65]">
          <CheckCircle2 className="w-4 h-4" />
          Available
        </div>
        <div className="flex items-center gap-2 text-[#f84464]">
          <Flame className="w-4 h-4" />
          Peak hours
        </div>
        <div className="flex items-center gap-2 text-[#9aa2b5]">
          <Ban className="w-4 h-4" />
          Booked / blocked
        </div>
        <div className="flex items-center gap-2 text-[#c06b7f]">
          <Info className="w-4 h-4" />
          Adjacent only
        </div>
      </div>
    </section>
  );
}
