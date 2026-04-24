import Booking from '../models/Booking.js';
import BlockedSlot from '../models/BlockedSlot.js';
import { PRICE_PER_SLOT, formatDate, getDateByOffset, ADMIN_PASSCODE } from '../config/constants.js';

// Login with passcode
export const adminLogin = (req, res) => {
  const { passcode } = req.body;

  if (!passcode) {
    return res.status(400).json({ error: 'Passcode required' });
  }

  if (passcode !== ADMIN_PASSCODE) {
    return res.status(401).json({ error: 'Invalid passcode' });
  }

  // Generate a simple token
  const token = Buffer.from(`admin:${passcode}`).toString('base64');

  res.json({
    success: true,
    token,
    message: 'Login successful'
  });
};

// Get all bookings (paginated)
export const getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = String(req.query.filter || 'all').toLowerCase().trim();
    const skip = (page - 1) * limit;

    let query = {};

    if (filter === 'today') {
      query.date = getDateByOffset(0);
    } else if (filter === 'tomorrow') {
      query.date = getDateByOffset(1);
    }

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings for a specific date
export const getBookingsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date is required (YYYY-MM-DD)' });
    }

    const bookings = await Booking.find({ date })
      .sort({ createdAt: -1 })
      .select('name phone date slots totalPrice createdAt');

    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + (booking.totalPrice || 0),
      0
    );

    res.json({
      date,
      bookings,
      summary: {
        totalBookings: bookings.length,
        totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get calendar view for a month
export const getCalendar = async (req, res) => {
  try {
    const { month } = req.query; // Format: YYYY-MM

    if (!month) {
      return res.status(400).json({ error: 'Month is required (YYYY-MM)' });
    }

    const [year, monthNum] = month.split('-');
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0);

    const bookings = await Booking.find({
      date: {
        $gte: formatDate(startDate),
        $lte: formatDate(endDate)
      }
    })
      .sort({ date: 1, createdAt: -1 })
      .select('name phone date slots totalPrice createdAt');

    const calendar = {};
    bookings.forEach(booking => {
      if (!calendar[booking.date]) {
        calendar[booking.date] = { bookings: 0, slots: [], totalRevenue: 0, bookingsList: [] };
      }
      calendar[booking.date].bookings += 1;
      calendar[booking.date].slots.push(...booking.slots);
      calendar[booking.date].totalRevenue += booking.totalPrice || 0;
      calendar[booking.date].bookingsList.push({
        id: booking._id,
        name: booking.name,
        phone: booking.phone,
        slots: booking.slots,
        totalPrice: booking.totalPrice,
        createdAt: booking.createdAt
      });
    });

    res.json({
      month,
      calendar
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Block slots for a date
export const blockSlots = async (req, res) => {
  try {
    const { date, slots, reason } = req.body;

    if (!date || !slots || slots.length === 0) {
      return res.status(400).json({ error: 'Date and slots are required' });
    }

    const existingBlocked = await BlockedSlot.findOne({ date });

    if (existingBlocked) {
      // Add to existing
      const newSlots = [...new Set([...existingBlocked.slots, ...slots])];
      existingBlocked.slots = newSlots;
      existingBlocked.reason = reason || existingBlocked.reason;
      await existingBlocked.save();
    } else {
      // Create new
      const blockedSlot = new BlockedSlot({
        date,
        slots,
        reason: reason || 'Maintenance'
      });
      await blockedSlot.save();
    }

    res.json({ success: true, message: 'Slots blocked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unblock slots for a date
export const unblockSlots = async (req, res) => {
  try {
    const { date, slots } = req.body;

    if (!date || !slots || slots.length === 0) {
      return res.status(400).json({ error: 'Date and slots are required' });
    }

    const blockedSlot = await BlockedSlot.findOne({ date });

    if (!blockedSlot) {
      return res.status(404).json({ error: 'No blocked slots found' });
    }

    blockedSlot.slots = blockedSlot.slots.filter(slot => !slots.includes(slot));

    if (blockedSlot.slots.length === 0) {
      await BlockedSlot.deleteOne({ _id: blockedSlot._id });
    } else {
      await blockedSlot.save();
    }

    res.json({ success: true, message: 'Slots unblocked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add manual booking (admin)
export const addManualBooking = async (req, res) => {
  try {
    const { name, phone, date, slots } = req.body;

    if (!name || !phone || !date || !slots || slots.length === 0) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check for overlapping bookings
    const existingBookings = await Booking.find({ date });
    for (const booking of existingBookings) {
      const overlap = slots.some(slot => booking.slots.includes(slot));
      if (overlap) {
        return res.status(400).json({ error: 'Slots conflict with existing booking' });
      }
    }

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
      message: 'Manual booking added',
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
