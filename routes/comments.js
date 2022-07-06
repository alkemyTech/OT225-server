const express = require('express');
const router = express.Router();

const { updateComment, deleteComment } = require('./../controllers/comments.js')

const {
    createComment,
    listComments
} = require('./../controllers/comments.js');

router.post('/', createComment);
router.get('/', listComments);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);


module.exports = router;