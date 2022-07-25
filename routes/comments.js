const express = require('express');
const router = express.Router();
const {verifyRole} = require('../middlewares/auth')

const { updateComment, deleteComment } = require('./../controllers/comments.js')

const {
    createComment,
    listComments
} = require('./../controllers/comments.js');

router.post('/', verifyRole, createComment);
router.get('/', listComments);
router.put('/:id', verifyRole, updateComment);
router.delete('/:id', verifyRole, deleteComment);


module.exports = router;