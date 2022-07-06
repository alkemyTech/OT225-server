const express = require('express');
const router = express.Router();

const { updateComment } = require('./../controllers/comments.js')

const {
    createComment,
    listComments
} = require('./../controllers/comments.js');

router.post('/', createComment);
router.get('/', listComments);
router.put('/:id', updateComment);


module.exports = router;