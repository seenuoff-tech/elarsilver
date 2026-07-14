const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// ROUTE: RAZORPAY
// ---------------------------------------------------------
app.post('/api/razorpay', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt = 'receipt#1' } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, error: 'Amount is required' });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Keys are missing');
      return res.status(500).json({ success: false, error: 'Razorpay keys are missing' });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paise)
      currency,
      receipt,
    };

    const order = await instance.orders.create(options);
    return res.json({ success: true, order });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

// ---------------------------------------------------------
// TODO: Port checkout, images, and upload routes here!
// ---------------------------------------------------------

// Basic root route
app.get('/', (req, res) => {
  res.send('Elara Silver Backend API is running!');
});

app.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
});
