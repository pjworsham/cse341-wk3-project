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
  try {
    const member = {
      name: req.body.name,
      address: req.body.address,
      dateOfBirth: req.body.dateOfBirth,
      favoriteGenre: req.body.favoriteGenre,
      phoneNumber: req.body.phoneNumber
    };
    const response = await mongodb.getDatabase().db().collection('members').insertOne(member);
    if (response.acknowledged) {
      return res.status(204).send();
    }
    return res.status(500).json(response.error || 'Some error occurred while creating the member');
  } catch (err) {
    console.error('createMembers error:', err);
    return res.status(500).json({ message: 'Server error creating member' });
  }
};

const updateMembers = async (req, res) => {
  // #swagger.tags=['members']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const memberId = new ObjectId(req.params.id);
    const member = {
      name: req.body.name,
      address: req.body.address,
      dateOfBirth: req.body.dateOfBirth,
      favoriteGenre: req.body.favoriteGenre,
      phoneNumber: req.body.phoneNumber
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('members')
      .replaceOne({ _id: memberId }, member);
    if (response.modifiedCount > 0) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Member not found or not modified' });
  } catch (err) {
    console.error('updateMembers error:', err);
    return res.status(500).json({ message: 'Server error updating member' });
  }
};

const deleteMember = async (req, res) => {
  // #swagger.tags=['members']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const memberId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('members').deleteOne({ _id: memberId });
    if (response.deletedCount > 0) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Member not found' });
  } catch (err) {
    console.error('deleteMember error:', err);
    return res.status(500).json({ message: 'Server error deleting member' });
  }
};
module.exports = {
  getAll,
  getSingle,
  createMembers,
  updateMembers,
  deleteMember
};
