require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Routes
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

const addressRoutes = require('./routes/addresses');


const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes

app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);
app.use('/addresses', addressRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    