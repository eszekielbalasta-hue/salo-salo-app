const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const menuRoutes   = require('./routes/menuRoutes');
const orderRoutes  = require('./routes/orderRoutes');
const authRoutes   = require('./routes/authRoutes');
const auth         = require('./middleware/authMiddleware');
const { getAllMenuItems } = require('./controllers/menuController');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/menu', getAllMenuItems);
app.post('/api/menu',      auth, require('./controllers/menuController').createMenuItem);
app.put('/api/menu/:id',   auth, require('./controllers/menuController').updateMenuItem);
app.delete('/api/menu/:id', auth, require('./controllers/menuController').deleteMenuItem);

app.use('/api/orders', orderRoutes);

app.use(errorHandler);

mongoose.connect("mongodb://localhost:27017/food-ordering")
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error('DB connection error:', err.message));

mongoose.connection.on('error', err => console.error('MongoDB error:', err.message));
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));