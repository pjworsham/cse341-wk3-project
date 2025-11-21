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
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid id' });
    const bookId = new ObjectId(req.params.id);
    const book = await mongodb.getDatabase().db().collection('books').findOne({ _id: bookId });
    if (!book) return res.status(404).json({ message: 'Book not found.' });
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(book);
  } catch (err) {
    console.error('getSingle error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const validateBook = (data) => {
  const errors = [];
  if (!data || typeof data !== 'object') errors.push('Body must be a JSON object');
  if (!data.title || typeof data.title !== 'string') errors.push('title is required and must be a string');
  if (!data.author || typeof data.author !== 'string') errors.push('author is required and must be a string');
  if (data.yearPublished !== undefined && !Number.isInteger(data.yearPublished)) errors.push('yearPublished must be an integer');
  if (data.pageCount !== undefined && !Number.isInteger(data.pageCount)) errors.push('pageCount must be an integer');
  return errors;
};

const createBook = async (req, res) => {
  // #swagger.tags=['books']
  try {
    const errors = validateBook(req.body);
    if(errors.length) return res.status(400).json({ errors});

    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publisher: req.body.publisher,
      yearPublished: req.body.yearPublished,
      pageCount: req.body.pageCount,
      edition: req.body.edition,
    };
    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
    if (response.acknowledged) return res.status(204).send();
    return res.status(500).json(response.error || 'Some error occurred while updating the book');
  } catch (err) {
    console.error('createBook error:', err);
    return res.status(500).json({ message: 'Server error creating book' });
  }
};

const updateBook = async (req, res) => {
  // #swagger.tags=['books']
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid id' });

    const errors = validateBook(req.body);
    if (errors.length) return res.status(400).json({ errors});
  
  const bookId = new ObjectId(req.params.id);
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publisher: req.body.publisher,
    yearPublished: req.body.yearPublished,
    pageCount: req.body.pageCount,
    edition: req.body.edition,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('books')
    .replaceOne({ _id: bookId }, book);
  if (response.modifiedCount > 0) return res.status(204).send(); 
    return res.status(404).json({ message: 'Book not found or not modified' });
  } catch (err) {
    console.error('updateBook error:', err);
    return res.status(500).json({ message: 'Server error updating book' });
  }
};

const deleteBook = async (req, res) => {
  // #swagger.tags=['books']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Book not found' });
  } catch (err) {
    console.error('deleteBook error:', err);
    return res.status(500).json({ message: 'Server error deleting book' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};


