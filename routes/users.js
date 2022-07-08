const express = require('express');
const router = express.Router();

const {
  listUsers,
  updateUser,
  deleteUser
} = require('./../controllers/users.js');

//------------ ENDPOINTS ------------//
//Listar usuarios
router.get('/', listUsers);
//Actualizar un usuario
router.patch('/:id', updateUser);
//Eliminar un usuario
router.delete('/:id', deleteUser)

module.exports = router;
