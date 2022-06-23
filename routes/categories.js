const express = require('express');
const router = express.Router();

const { getCategoryDetails, createCategory, updateCategory, listCategories  } = require('../controllers/categories.js');

router.get('/', listCategories)
router.get('/:id', getCategoryDetails)
router.post('/', createCategory);
router.put('/:id', updateCategory);

module.exports = router; 

