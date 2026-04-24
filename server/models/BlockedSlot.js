import mongoose from 'mongoose';

const blockedSlotSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true // Format: YYYY-MM-DD
    },
    slots: {
      type: [String],
      required: true // Array of time strings like "06:00 - 07:00"
    },
    reason: {
      type: String,
      default: 'Maintenance'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for faster queries
blockedSlotSchema.index({ date: 1 });

const BlockedSlot = mongoose.model('BlockedSlot', blockedSlotSchema);
export default BlockedSlot;
