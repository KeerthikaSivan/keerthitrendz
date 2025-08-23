const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Model
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  details: String,
  createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('🚀 Booking backend is running');
});

// ✅ Form Submission Route
app.post('/book-service', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    console.log("📩 Booking received:", req.body);
    res.status(200).json({ message: '✅ Booking submitted successfully!' });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: '❌ Failed to submit booking.' });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
