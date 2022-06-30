const express = require('express');
const router = express.Router();

const { createTestimony } = require('../controllers/testimony');

router.post('/', createTestimony);

module.exports = router;
