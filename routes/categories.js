const express = require('express');
const router = express.Router();

const { getCategoryDetails, createCategory, updateCategory, listCategories, deleteCategory } = require('../controllers/categories.js')

router.get('/', listCategories)
router.get('/:id', getCategoryDetails)
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory)

module.exports = router; 