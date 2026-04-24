import React from 'react';
import { Check } from 'lucide-react';

export default function SlotButton({ slot, isSelected, isPeak, maxReached, onSelect, disabled }) {
  const status = slot.status;
  const isUnavailableStatus = status === 'booked' || status === 'blocked' || status === 'past';

  const getClasses = () => {
    if (isSelected) {
      return 'bg-[#f84464] border-[#f84464] text-white shadow-[0_10px_24px_rgba(248,68,100,0.32)]';
    }

    if (isUnavailableStatus) {
      return 'bg-[#f4f5f9] border-[#e4e7ef] text-[#9aa2b5] cursor-not-allowed';
    }

    if (maxReached) {
      return 'bg-[#fff1f4] border-[#f6c7d2] text-[#b9506a] cursor-not-allowed';
    }

    if (disabled) {
      return 'bg-[#fff7f9] border-[#f7c2cd] text-[#c34f69] cursor-not-allowed';
    }

    return 'bg-white border-[#dde1ea] text-[#1d2237] hover:border-[#f7a8b7] hover:bg-[#fff7f9]';
  };

  const getBadgeLabel = () => {
    if (isSelected) return 'Selected';
    if (status === 'booked') return 'Booked';
    if (status === 'blocked') return 'Blocked';
    if (status === 'past') return 'Closed';
    if (maxReached) return 'Max reached';
    if (disabled) return 'Adjacent only';
    if (isPeak) return 'Peak';
    return 'Available';
  };

  return (
    <button
      type="button"
      onClick={() => !disabled && !isUnavailableStatus && onSelect(slot.time)}
      disabled={disabled || isUnavailableStatus}
      className={`relative w-full rounded-lg md:rounded-xl border px-2 py-2.5 md:py-3 text-center transition-all duration-200 ${getClasses()}`}
      title={slot.time}
    >
      <p className="text-xs sm:text-sm md:text-[15px] font-semibold leading-tight">{slot.time}</p>
      <p className={`text-[10px] mt-1 uppercase tracking-wide ${isSelected ? 'text-white/85' : ''}`}>{getBadgeLabel()}</p>

      {isSelected && (
        <span className="absolute top-2 right-2 inline-flex w-4 h-4 items-center justify-center rounded-full bg-white/20">
          <Check className="w-3 h-3" />
        </span>
      )}
    </button>
  );
}
