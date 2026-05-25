const Order = require('../models/Order');

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('items.menuItem', 'name price');
    res.json(orders);
  } catch (err) { next(err); }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { customerName, items, totalPrice } = req.body;
    if (!customerName || !items || items.length === 0)
      return res.status(400).json({ message: 'Customer name and items are required.' });
    const order = await Order.create({ customerName, items, totalPrice });
    res.status(201).json(order);
  } catch (err) { next(err); }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (err) { next(err); }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ message: 'Order deleted.' });
  } catch (err) { next(err); }
};