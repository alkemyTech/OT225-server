const express = require('express');
const router = express.Router();

const { createContact, listContacts } = require('./../controllers/contacts.js')

router.post('/', createContact);
router.get('/', listContacts);



module.exports = router