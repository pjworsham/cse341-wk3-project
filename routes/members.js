const express = require('express');
const router = express.Router();

const membersController = require('../controllers/members');

router.get('/', membersController.getAll);

router.get('/:id', membersController.getSingle);

router.post('/', membersController.createmember);

router.put('/:id', membersController.updatemember);

router.delete('/:id', membersController.deletemember);

module.exports = router;