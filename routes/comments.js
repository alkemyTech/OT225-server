const express = require('express');
const router = express.Router();

const { updateComment, deleteComment } = require('./../controllers/comments.js')

router.put('/:id', updateComment);
router.delete('/:id', deleteComment);


module.exports = router