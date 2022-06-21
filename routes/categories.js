const express = require('express');
const router = express.Router();

const { createCategory, updateCategory } = require('../controllers/categories/index.js');


router.post('/', createCategory);
router.put('/:id', updateCategory);

module.exports = router; 