import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  appId: { type: Number, required: true },
   { type: String, required: true },
  note: String,
}, { timestamps: true });

export default mongoose.models.Account || mongoose.model('Account', accountSchema);