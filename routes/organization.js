const express = require("express");
const router = express.Router();
const {
  organizationControllers,
  updateOrganization,
  getOrganizationSlides,
} = require("../controllers/organization");

router.get("/public", organizationControllers.getAll);

/* muestra los slides de una organizacion */
router.get("/public/:id", getOrganizationSlides);
/* update de Organización */

router.put("/public/:id", updateOrganization);

module.exports = router;
