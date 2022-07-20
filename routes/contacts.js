const express = require('express');
const router = express.Router();
const {verifyRole} = require('../middlewares/auth')
const { createContact, listContacts } = require('./../controllers/contacts.js')

router.post('/', verifyRole, createContact);
router.get('/', listContacts);



module.exports = router