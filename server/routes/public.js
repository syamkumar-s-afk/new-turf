import express from 'express';
import {
  getSlots,
  createBooking,
  getNextAvailable
} from '../controllers/bookingController.js';
import { getCurrentMaduraiTime } from '../config/constants.js';

const router = express.Router();

// Get available slots for a date
router.get('/slots', getSlots);

// Create a new booking
router.post('/book', createBooking);

// Get next available slot
router.get('/next-available', getNextAvailable);

// Get current time (Madurai timezone)
router.get('/current-time', (req, res) => {
  const maduraiTime = getCurrentMaduraiTime();
  res.json({
    timezone: 'IST (Indian Standard Time)',
    location: 'Madurai, Tamil Nadu',
    currentTime: maduraiTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    timestamp: maduraiTime.getTime()
  });
});

export default router;
