const express = require("express");
const router = express.Router();

const { createActivity } = require("../controllers/activity");

/* ruta crear una actividad */

router.post("/", createActivity);

module.exports = router;
