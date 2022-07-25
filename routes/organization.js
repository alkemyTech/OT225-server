const express = require("express");
const router = express.Router();
const {
  organizationControllers,
  updateOrganization,
  getOrganizationSlides,
} = require("../controllers/organization");
const { verifyOwnership } = require("../middlewares/auth");

router.get("/public", verifyOwnership, organizationControllers.getAll);

/* muestra los slides de una organizacion */
router.get("/public/:id", verifyOwnership, getOrganizationSlides);
/* update de Organización */

router.put("/public/:id", verifyOwnership, updateOrganization);

module.exports = router;
