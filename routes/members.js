const express = require('express');
const router = express.Router();
const membersControllers = require('../controllers/members');

router
    .get('/', membersControllers.getAll) //List all members.
    .post('/', membersControllers.add) //Create new member.
    .delete('/:id', membersControllers.delete) //Delete member.
    .put('/:id', membersControllers.update) //Update member


module.exports = router;