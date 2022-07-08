const express = require('express');
const router = express.Router();

const {
  listUsers,
  updateUser
} = require('./../controllers/users.js');

//------------ ENDPOINTS ------------//
//Listar usuarios
router.get('/', listUsers);
//Actualizar un usuario
router.patch('/:id', updateUser);


module.exports = router;
