const express = require("express");
const router = express.Router();

const {
  createTestimony,
  updateTestimony,
} = require("../controllers/testimony");

router.post("/", createTestimony);
router.put("/:id", updateTestimony);

module.exports = router;
