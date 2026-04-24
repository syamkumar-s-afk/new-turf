// Time slot configuration
export const START_HOUR = 6; // 6 AM
export const END_HOUR = 24; // 12 AM (midnight)
export const SLOT_DURATION = 1; // 1 hour per slot
export const PRICE_PER_SLOT = 1000; // Rs 1000

// Madurai Timezone: IST (Indian Standard Time) - UTC+5:30
export const TIMEZONE = 'Asia/Kolkata';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

const hourFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIMEZONE,
  hour: '2-digit',
  hour12: false,
  hourCycle: 'h23'
});

const addDaysToDateString = (dateString, offsetDays) => {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return date.toISOString().slice(0, 10);
};

// Current absolute time; format using TIMEZONE wherever needed.
export const getCurrentMaduraiTime = () => new Date();

// Date formatting helper (Madurai timezone) -> YYYY-MM-DD
export const formatDate = (date = new Date()) => {
  const targetDate = date instanceof Date ? date : new Date(date);
  const parts = dateFormatter.formatToParts(targetDate);
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;
  return `${year}-${month}-${day}`;
};

export const getCurrentDateInTimezone = () => formatDate(new Date());

export const getDateByOffset = (offsetDays = 0) => {
  const today = getCurrentDateInTimezone();
  return addDaysToDateString(today, offsetDays);
};

export const getCurrentHourInTimezone = () => {
  return parseInt(hourFormatter.format(new Date()), 10);
};

// Generate all time slots for a day
export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = START_HOUR; hour < END_HOUR; hour++) {
    const startHour = hour;
    const endHour = hour + 1;

    const formatTime = (h) => {
      if (h === 12 || h === 0) return h === 0 ? '12:00 AM' : '12:00 PM';
      if (h > 12) return `${h - 12}:00 PM`;
      return `${h}:00 AM`;
    };

    slots.push({
      time: `${formatTime(startHour)} - ${formatTime(endHour)}`,
      startHour,
      endHour,
      available: true,
      status: 'available'
    });
  }
  return slots;
};

// Peak hours (evening rush)
export const PEAK_HOURS = [18, 19, 20, 21]; // 6 PM to 10 PM

// Admin passcode (stored in env)
export const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || '123456';

// Check if date is in the past (Madurai timezone)
export const isPastDate = (date) => {
  if (!date) return true;
  const today = getCurrentDateInTimezone();
  return date < today;
};

// Check if time is in the past for the selected date (Madurai timezone)
export const isPastTime = (date, startHour) => {
  const today = getCurrentDateInTimezone();

  if (date < today) return true;
  if (date > today) return false;

  const currentHour = getCurrentHourInTimezone();
  return startHour <= currentHour;
};
