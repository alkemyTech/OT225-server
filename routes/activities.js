const express = require("express");
const router = express.Router();
const {verifyRole} = require('../middlewares/auth');

const { createActivity, updateActivity } = require("../controllers/activity");

/* ruta crear una actividad */
router.post("/", verifyRole, createActivity);
/* to update an activity */
router.put("/:id", updateActivity);

module.exports = router;
