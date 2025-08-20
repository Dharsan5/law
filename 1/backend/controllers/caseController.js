const Case = require('../models/Case');

exports.fileCase = async (req, res) => {
  try {
    const { title, description, category, petitionerId } = req.body;
    const document = req.file ? req.file.filename : null;

    const newCase = new Case({
      title,
      description,
      category,
      document,
      petitionerId,
    });

    await newCase.save();
    res.status(201).json({ message: 'Case filed successfully', caseId: newCase._id });
  } catch (error) {
    console.error('Error filing case:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCasesByPetitioner = async (req, res) => {
  try {
    const { petitionerId } = req.params;
    const cases = await Case.find({ petitionerId }).sort({ createdAt: -1 });
    res.json(cases);
  } catch (error) {
    console.error('Error fetching cases:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
