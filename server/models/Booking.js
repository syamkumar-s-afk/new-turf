import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/
    },
    date: {
      type: String,
      required: true // Format: YYYY-MM-DD
    },
    slots: {
      type: [String],
      required: true // Array of time strings like "06:00 - 07:00"
    },
    totalPrice: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for faster queries
bookingSchema.index({ date: 1 });
bookingSchema.index({ phone: 1 });
bookingSchema.index({ createdAt: -1 });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
