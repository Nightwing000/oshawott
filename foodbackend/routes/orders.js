const express = require('express');
const Order = require('../models/Order');
const authenticate = require('../middleware/authenticate');
const router = express.Router();


router.post('/', authenticate, async (req, res) => {
  const { address, items, totalAmount, deliveryFee, platformFee, gst, status, date } = req.body;

  if (!address || !items || !totalAmount || !deliveryFee || !platformFee || !gst || !status || !date) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const userId = req.userId;

  try {
    const newOrder = new Order({
      userId,
      address,
      items,
      totalAmount,
      deliveryFee,
      platformFee,
      gst,
      status,
      date,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Error placing order.' });
  }
});


router.get('/', authenticate, async (req, res) => {  
  const userId = req.userId;

  try {
    const orders = await Order.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
});

module.exports = router;
