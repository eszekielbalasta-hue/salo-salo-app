const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  category:    { type: String, enum: ['Meals', 'Drinks', 'Desserts'], required: true },
  available:   { type: Boolean, default: true },
  imageUrl:    { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);