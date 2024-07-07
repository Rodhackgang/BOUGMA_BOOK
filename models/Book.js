const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: String,
  price: Number,
  author: String,
  category: String,
  image: String,
  pdf: String
});

module.exports = mongoose.model('Book', bookSchema);
