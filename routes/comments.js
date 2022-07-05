const express = require('express');
const router = express.Router();

const {
    createComment,
    listComments
} = require('./../controllers/comments.js');

router.post('/', createComment);
router.get('/', listComments);

module.exports = router;