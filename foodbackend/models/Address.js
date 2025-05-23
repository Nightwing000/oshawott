const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Address', AddressSchema);
