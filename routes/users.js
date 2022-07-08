const express = require('express');
const router = express.Router();

const {
  listUsers
} = require('./../controllers/users.js');

//------------ ENDPOINTS ------------//
//Listar usuarios
router.get('/', listUsers);

module.exports = router;
