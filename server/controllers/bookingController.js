import Booking from '../models/Booking.js';
import BlockedSlot from '../models/BlockedSlot.js';
import {
  generateTimeSlots,
  PRICE_PER_SLOT,
  isPastDate,
  isPastTime,
  getDateByOffset
} from '../config/constants.js';

// Get available slots for a specific date
export const getSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    // Check if date is in past
    if (isPastDate(date)) {
      return res.status(400).json({ error: 'Cannot book past dates' });
    }

    const slots = generateTimeSlots();

    // Get bookings for this date
    const bookings = await Booking.find({ date });
    const bookedSlots = new Set();
    bookings.forEach(booking => {
      booking.slots.forEach(slot => bookedSlots.add(slot));
    });

    // Get blocked slots for this date
    const blockedSlots = await BlockedSlot.findOne({ date });
    const blockedSet = new Set(blockedSlots?.slots || []);

    // Mark slot status
    const updatedSlots = slots.map(slot => {
      const isBooked = bookedSlots.has(slot.time);
      const isBlocked = blockedSet.has(slot.time);
      const isPast = isPastTime(date, slot.startHour);

      let status = 'available';
      if (isPast) status = 'past';
      else if (isBooked) status = 'booked';
      else if (isBlocked) status = 'blocked';

      return {
        ...slot,
        status,
        available: status === 'available'
      };
    });

    res.json({
      date,
      slots: updatedSlots,
      peakHours: [18, 19, 20, 21]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { name, phone, date, slots } = req.body;

    // Validation
    if (!name || !phone || !date || !slots || slots.length === 0) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    if (isPastDate(date)) {
      return res.status(400).json({ error: 'Cannot book past dates' });
    }

    // Check if slots are continuous
    const allSlots = generateTimeSlots();
    const slotIndices = slots.map(slot => {
      const index = allSlots.findIndex(s => s.time === slot);
      return index;
    });

    const sortedIndices = [...slotIndices].sort((a, b) => a - b);
    for (let i = 1; i < sortedIndices.length; i++) {
      if (sortedIndices[i] !== sortedIndices[i - 1] + 1) {
        return res.status(400).json({ error: 'Slots must be continuous' });
      }
    }

    // Check for overlapping bookings
    const existingBookings = await Booking.find({ date });
    for (const booking of existingBookings) {
      const overlap = slots.some(slot => booking.slots.includes(slot));
      if (overlap) {
        return res.status(400).json({ error: 'Some slots are already booked' });
      }
    }

    // Check for blocked slots
    const blockedSlots = await BlockedSlot.findOne({ date });
    if (blockedSlots) {
      const isBlocked = slots.some(slot => blockedSlots.slots.includes(slot));
      if (isBlocked) {
        return res.status(400).json({ error: 'Some slots are blocked' });
      }
    }

    // Check for past time
    const startHour = allSlots.find(s => s.time === slots[0])?.startHour;
    if (isPastTime(date, startHour)) {
      return res.status(400).json({ error: 'Cannot book past time slots' });
    }

    // Create booking
    const totalPrice = slots.length * PRICE_PER_SLOT;
    const booking = new Booking({
      name: name.trim(),
      phone,
      date,
      slots,
      totalPrice
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking confirmed',
      bookingId: booking._id,
      totalPrice,
      date,
      slots,
      name
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get next available slot
export const getNextAvailable = async (req, res) => {
  try {
    const maxDaysToCheck = 30;

    for (let i = 0; i < maxDaysToCheck; i++) {
      const dateStr = getDateByOffset(i);

      if (!isPastDate(dateStr)) {
        const slots = generateTimeSlots();
        const bookings = await Booking.find({ date: dateStr });
        const bookedSlots = new Set();
        bookings.forEach(booking => {
          booking.slots.forEach(slot => bookedSlots.add(slot));
        });

        const blockedSlots = await BlockedSlot.findOne({ date: dateStr });
        const blockedSet = new Set(blockedSlots?.slots || []);

        for (const slot of slots) {
          if (!bookedSlots.has(slot.time) && !blockedSet.has(slot.time)) {
            return res.json({
              nextAvailable: {
                date: dateStr,
                time: slot.time,
                price: PRICE_PER_SLOT
              }
            });
          }
        }
      }
    }

    res.json({ nextAvailable: null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
