import express from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import {
  adminLogin,
  getBookings,
  getBookingsByDate,
  getCalendar,
  blockSlots,
  unblockSlots,
  deleteBooking,
  addManualBooking
} from '../controllers/adminController.js';

const router = express.Router();

// Login with passcode
router.post('/login', adminLogin);

// Protected routes (require admin auth)
router.get('/bookings', adminAuth, getBookings);
router.get('/bookings-by-date', adminAuth, getBookingsByDate);
router.get('/calendar', adminAuth, getCalendar);
router.post('/block', adminAuth, blockSlots);
router.post('/unblock', adminAuth, unblockSlots);
router.delete('/booking/:id', adminAuth, deleteBooking);
router.post('/add-booking', adminAuth, addManualBooking);

export default router;
