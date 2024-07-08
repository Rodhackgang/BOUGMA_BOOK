const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Ajoutez cette ligne
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Active CORS pour toutes les routes
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
console.log(`Connecting to MongoDB at ${process.env.MONGODB_URI}`);

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000  // Augmenter le délai d'attente à 50 secondes
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
//Bienvenu
app.get('/', (req, res) => {
  res.send('Bienvenue sur notre API');
});
// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/ajoutelements', bookRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
