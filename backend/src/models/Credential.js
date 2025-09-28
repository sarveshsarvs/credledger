const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blockchainTx: { type: String }, // Store blockchain transaction hash
  verified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Credential', CredentialSchema);
