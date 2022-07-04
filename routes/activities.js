const express = require("express");
const router = express.Router();

const { createActivity, updateActivity } = require("../controllers/activity");

/* ruta crear una actividad */
router.post("/", createActivity);
/* to update an activity */
router.put("/:id", updateActivity);

module.exports = router;
