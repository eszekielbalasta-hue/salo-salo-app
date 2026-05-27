// Define dynamic variables right before connecting
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/food-ordering";

// Connect using the live URI and bind to the dynamic port
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    // Binding to '0.0.0.0' allows Render to correctly route external traffic to your app
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err.message));

mongoose.connection.on('error', err => console.error('MongoDB error:', err.message));
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));