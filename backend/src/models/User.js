const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'institution', 'employer'], required: true },
  did: { type: String }, // Decentralized Identifier
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
