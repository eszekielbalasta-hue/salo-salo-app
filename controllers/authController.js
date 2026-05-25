const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'salo-salo-secret-key';

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required.' });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: 'Username already taken.' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed, role });

    res.status(201).json({ message: 'Account created successfully!', username: user.username });
  } catch (err) { next(err); }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required.' });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ message: 'Invalid username or password.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Invalid username or password.' });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: '8h' }
    );

    res.json({ message: 'Login successful!', token, username: user.username, role: user.role });
  } catch (err) { next(err); }
};

// GET current user
exports.me = async (req, res) => {
  res.json({ username: req.user.username, role: req.user.role });
};