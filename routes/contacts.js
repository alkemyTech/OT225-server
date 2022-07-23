const express = require("express");
const router = express.Router();

const { createContact, listContacts } = require("./../controllers/contacts.js");
const { verifyToken } = require("../utils/jwt");
router.post("/", verifyToken, createContact);
router.get("/", listContacts);

module.exports = router;
