const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
  otpExpiry: { type: Date },
  otpVerified: { type: Boolean, default: false },
  token: { type: String },
  role: { type: String, enum: ['admin', 'scorer', 'user'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);