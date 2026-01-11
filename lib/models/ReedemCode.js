import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  appId: { type: Number, required: true },
  account: { type: String, required: true },
  note: String,
  used: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.RedeemCode || mongoose.model('RedeemCode', codeSchema);