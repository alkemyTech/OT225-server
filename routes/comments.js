const express = require('express');
const router = express.Router();

const {createComment} = require('./../controllers/comments.js')

router.post('/', createComment);

module.exports = router