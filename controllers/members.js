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

module.exports = {
  getAll,
  getSingle,
};