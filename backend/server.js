const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fetch = require('node-fetch'); // Use fetch for Hugging Face API
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const caseRoutes = require('./routes/caseRoutes');

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cases', caseRoutes);

// Hugging Face classify route
app.post('/api/classify', async (req, res) => {
  const { complaint } = req.body;

  if (!complaint) {
    return res.status(400).json({ error: 'Complaint text required' });
  }

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: complaint,
          parameters: {
            candidate_labels: [
              'Theft (IPC 379)',
              'Cheating (IPC 420)',
              'Harassment (IPC 354)',
              'Murder (IPC 302)',
              'Civil Dispute',
              'Cyber Crime',
            ],
          },
        }),
      }
    );

    const result = await response.json();

    if (result.error) {
      return res.status(500).json({ error: 'Hugging Face API Error', details: result.error });
    }

    res.json({
      complaint,
      predicted_section: result.labels[0],
      confidence: result.scores[0],
    });
  } catch (error) {
    console.error('❌ Classification Error:', error);
    res.status(500).json({ error: 'Classification failed', details: error.message });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('ustiFlow Backend Running with Hugging Face API...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
