const { Router } = require("express");
const router = Router();
const {verifyRole} = require('../middlewares/auth');

const { createSlide, getSlides, getSlideDetails, updateSlide, deleteSlide} = require("../controllers/slides");

/** Get all Slides */
router.get('/', getSlides);
/** Get detail of a Slide */
router.get('/:id', getSlideDetails);
/** Create a Slide */
router.post('/', verifyRole, createSlide);
/** Update a Slide */
router.put('/:id', verifyRole, updateSlide);
/** Delete a Slide */
router.delete('/:id', verifyRole, deleteSlide);

module.exports = router;
