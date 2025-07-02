// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// ✅ MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://keerthika:mithunkeerthi_17@cluster0.aiixtks.mongodb.net/serviceBookingsDB?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Mongoose Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  details: String,
  createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// ✅ Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'book.html'));
});

// ✅ Handle form POST
app.post('/book-service', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.json({ message: '✅ Booking submitted successfully!' });
  } catch (err) {
    console.error("❌ Error saving to MongoDB:", err);
    res.status(500).json({ message: '❌ Failed to save booking.' });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
