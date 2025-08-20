const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['Admin', 'Lawyer', 'Judge', 'Petitioner'],
    required: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Lawyer-only fields
  barId: { type: String },
  lawLicense: { type: String }, // Store filename or path

  // Judge-only fields
  judgeCode: { type: String },
  judgeIdProof: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
