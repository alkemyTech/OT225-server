const express = require("express");
const router = express.Router();

const { verifyOwnership } = require("../middlewares/auth");
const { createActivity, updateActivity } = require("../controllers/activity");

/* ruta crear una actividad */
router.post("/", createActivity);
/* to update an activity */
router.put("/:id", verifyOwnership, updateActivity);

module.exports = router;
