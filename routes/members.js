const express = require('express');
const router = express.Router();
const membersControllers = require('../controllers/members');

router
    .get('/', membersControllers.getAll);


module.exports = router;