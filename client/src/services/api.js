import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public API calls
export const getSlots = (date) => {
  return api.get('/slots', { params: { date } });
};

export const createBooking = (bookingData) => {
  return api.post('/book', bookingData);
};

export const getNextAvailable = () => {
  return api.get('/next-available');
};

// Admin API calls
export const adminLogin = (passcode) => {
  return api.post('/admin/login', { passcode });
};

export const getAdminBookings = (page = 1, limit = 10, filter = 'all') => {
  return api.get('/admin/bookings', { params: { page, limit, filter } });
};

export const getAdminBookingsByDate = (date) => {
  return api.get('/admin/bookings-by-date', { params: { date } });
};

export const getCalendar = (month) => {
  return api.get('/admin/calendar', { params: { month } });
};

export const blockSlots = (date, slots, reason) => {
  return api.post('/admin/block', { date, slots, reason });
};

export const unblockSlots = (date, slots) => {
  return api.post('/admin/unblock', { date, slots });
};

export const deleteBooking = (id) => {
  return api.delete(`/admin/booking/${id}`);
};

export const addManualBooking = (bookingData) => {
  return api.post('/admin/add-booking', bookingData);
};

export default api;
