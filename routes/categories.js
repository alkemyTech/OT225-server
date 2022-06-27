const express = require('express');
const router = express.Router();


const { createCategory, updateCategory, listCategories, deleteCategory } = require('../controllers/categories.js')



router.post('/', createCategory);
router.put('/:id', updateCategory);
router.get('/', listCategories);
router.delete('/:id', deleteCategory)

module.exports = router; 

