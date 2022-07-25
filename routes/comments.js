const express = require('express');
const router = express.Router();

const { verifyOwnership } = require('../middlewares/auth.js');
const { updateComment, deleteComment } = require('./../controllers/comments.js')

const {
    createComment,
    listComments
} = require('./../controllers/comments.js');

router.post('/', createComment);
router.get('/', listComments);
router.put('/:id', verifyOwnership, updateComment);
router.delete('/:id', verifyOwnership, deleteComment);


module.exports = router;