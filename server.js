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

// Dynamic deployment port and database connection variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/food-ordering";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err.message));

mongoose.connection.on('error', err => console.error('MongoDB error:', err.message));
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));