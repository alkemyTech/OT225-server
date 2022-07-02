const { Router } = require("express");
const router = Router();

const { createSlide } = require("../controllers/slides");

/** Create a Slide */
router.post("/", createSlide);

module.exports = router;
