const express = require('express');
const router = express.Router();


const { createCategory, updateCategory, listCategories } = require('../controllers/categories');



router.post('/', createCategory);
router.put('/:id', updateCategory);

router.get('/', listCategories)

module.exports = router; 

