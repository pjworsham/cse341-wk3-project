const express = require('express');
const router = express.Router();

const membersController = require('../controllers/members');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', membersController.getAll);
router.get('/:id', membersController.getSingle);
router.post('/', isAuthenticated, membersController.createMembers);
router.put('/:id', isAuthenticated, membersController.updateMembers);
router.delete('/:id', isAuthenticated, membersController.deleteMember);

module.exports = router;