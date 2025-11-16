const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

// router.post('/', booksController.createbook);

// router.put('/:id', booksController.updatebook);

// router.delete('/:id', booksController.deletebook);

module.exports = router;