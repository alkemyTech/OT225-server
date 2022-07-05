const express = require('express');
const router = express.Router();

const { updateComment } = require('./../controllers/comments.js')

router.put('/:id', updateComment);


module.exports = router