const { Router } = require("express");
const router = Router();

const { createSlide, getSlides, getSlideDetails, updateSlide, deleteSlide} = require("../controllers/slides");
const { verifyOwnership } = require("../middlewares/auth");

/** Get all Slides */
router.get('/', getSlides);
/** Get detail of a Slide */
router.get('/:id', getSlideDetails);
/** Create a Slide */
router.post('/', verifyOwnership, createSlide);
/** Update a Slide */
router.put('/:id', verifyOwnership, updateSlide);
/** Delete a Slide */
router.delete('/:id', verifyOwnership, deleteSlide);

module.exports = router;
