const express = require("express");
const router = express.Router();

const {verifyRole} = require('../middlewares/auth')
const { verifyToken } = require("../utils/jwt");
const { createContact, listContacts } = require('./../controllers/contacts.js')

router.post('/', [verifyToken, verifyRole], createContact);
router.get("/", listContacts);

module.exports = router;
