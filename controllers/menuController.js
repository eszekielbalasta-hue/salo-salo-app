const Menu = require('../models/Menu');

exports.getAllMenuItems = async (req, res, next) => {
  try {
    const items = await Menu.find({ available: true });
    res.json(items);
  } catch (err) { next(err); }
};

exports.createMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !price || !category)
      return res.status(400).json({ message: 'Name, price, and category are required.' });
    const item = await Menu.create({ name, description, price, category });
    res.status(201).json(item);
  } catch (err) { next(err); }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    const item = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found.' });
    res.json(item);
  } catch (err) { next(err); }
};

exports.deleteMenuItem = async (req, res, next) => {
  try {
    const item = await Menu.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found.' });
    res.json({ message: 'Menu item deleted.' });
  } catch (err) { next(err); }
};
