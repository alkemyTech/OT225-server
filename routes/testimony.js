const express = require("express");
const router = express.Router();

const {
  createTestimony,
  updateTestimony,
  deleteTestimony,
} = require("../controllers/testimony");

router.post("/", createTestimony);
router.put("/:id", updateTestimony);
router.delete("/:id", deleteTestimony);

module.exports = router;
