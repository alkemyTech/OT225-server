const express = require("express");
const router = express.Router();
const {
  organizationControllers,
  updateOrganization,
} = require("../controllers/organization");

router.get("/public", organizationControllers.getAll);

/* update de Organización */

router.put("/public/:id", updateOrganization);

module.exports = router;
