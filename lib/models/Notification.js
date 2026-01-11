import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);