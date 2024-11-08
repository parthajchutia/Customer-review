require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const surveyRoutes = require('./routes/surveyRoutes'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Register survey routes
app.use('/api/surveys', surveyRoutes); // Assuming the route is defined correctly

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});