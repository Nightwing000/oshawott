const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  platformFee: { type: Number, required: true },
  gst: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
