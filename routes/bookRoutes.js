const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');

// Multer configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST /ajoutelements
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, price, author, category } = req.body;
    const image = req.files['image'][0].path;
    const pdf = req.files['pdf'][0].path;

    const newBook = new Book({ name, price, author, category, image, pdf });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /ajoutelements/:category
router.get('/:category', async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
