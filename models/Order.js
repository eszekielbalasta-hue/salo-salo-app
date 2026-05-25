const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
      quantity:  { type: Number, required: true, min: 1 },
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Preparing', 'Delivered'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
