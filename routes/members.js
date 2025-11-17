const express = require('express');
const router = express.Router();

const membersController = require('../controllers/members');

router.get('/', membersController.getAll);

router.get('/:id', membersController.getSingle);

router.post('/', membersController.createMembers);

router.put('/:id', membersController.updateMembers);

router.delete('/:id', membersController.deleteMember);

module.exports = router;