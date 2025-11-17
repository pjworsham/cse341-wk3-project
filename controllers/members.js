const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
  // #swagger.tags=['members']
  try {
    const members = await mongodb.getDatabase().db().collection('members').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch members.' });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags=['members']
  try {
    const memberId = new ObjectId(req.params.id);
    const member = await mongodb.getDatabase().db().collection('members').findOne({ _id: memberId });
    if (!member) return res.status(404).json({ message: 'Member not found.' });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(member);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID or server error.' });
  }
};

const createMembers = async (req, res) => {
  // #swagger.tags=['members']
  const member = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publisher: req.body.publisher,
    yearPublished: req.body.yearPublished,
    pageCount: req.body.pageCount,
    edition: req.body.edition,
  };
  const response = await mongodb.getDatabase().db().collection('members').insertOne(member);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the member');
  }
};

const updateMembers = async (req, res) => {
  // #swagger.tags=['members']
  const memberId = new ObjectId(req.params.id);
  const member = {
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
    .collection('members')
    .replaceOne({ _id: memberId }, member);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the member');
  }
};

const deleteMember = async (req, res) => {
  // #swagger.tags=['members']
  const memberId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('members').deleteOne({ _id: memberId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the member');
  }
};

module.exports = {
  getAll,
  getSingle,
  createMembers,
  updateMembers,
  deleteMember
};
