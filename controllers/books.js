const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags=['books']
  try {
    const books = await mongodb.getDatabase().db().collection('books').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'could not fetch books'});
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags=['books']
  try {
    const bookId = new ObjectId(req.params.id);
    const book = await mongodb.getDatabase().db().collection('books').findOne({ _id: bookId });
    if (!book) return res.status(404).json({ message: 'Book not found.' });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID or server error.' });
  }
};

module.exports = {
  getAll,
  getSingle,
};
