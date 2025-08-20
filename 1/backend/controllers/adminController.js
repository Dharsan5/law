const User = require('../models/User');

exports.getAllJudges = async (req, res) => {
  try {
    const judges = await User.find({ role: 'Judge' });
    res.json(judges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyJudge = async (req, res) => {
  try {
    const judge = await User.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    res.json(judge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all lawyers
exports.getAllLawyers = async (req, res) => {
  try {
    const lawyers = await User.find({ role: 'Lawyer' });
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify lawyer
exports.verifyLawyer = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role verified');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};