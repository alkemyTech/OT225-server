const express = require("express");
const router = express.Router();

const {
  createTestimony,
  updateTestimony,
  deleteTestimony,
  listTestimony
} = require("../controllers/testimony");

router.post("/", createTestimony);
router.get('/', listTestimony);
router.put("/:id", updateTestimony);
router.delete("/:id", deleteTestimony);

module.exports = router;
