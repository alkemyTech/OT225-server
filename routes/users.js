const express = require('express');
const router = express.Router();
const {verifyRole} = require('../middlewares/auth')

const {
  listUsers,
  updateUser,
  deleteUser
} = require('./../controllers/users.js');

//------------ ENDPOINTS ------------//
//Listar usuarios
router.get('/', listUsers);
//Actualizar un usuario
router.patch('/:id', verifyRole, updateUser);
//Eliminar un usuario
router.delete('/:id', verifyRole, deleteUser)

module.exports = router;
