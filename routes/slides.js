const { Router } = require("express");
const router = Router();

const { createSlide, getSlides, getSlideDetails, updateSlide, deleteSlide} = require("../controllers/slides");

/** Get all Slides */
router.get('/', getSlides);
/** Get detail of a Slide */
router.get('/:id', getSlideDetails);
/** Create a Slide */
router.post('/', createSlide);
/** Update a Slide */
router.put('/:id', updateSlide);
/** Delete a Slide */
router.delete('/:id', deleteSlide);

module.exports = router;
