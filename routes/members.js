const express = require('express');
const router = express.Router();
const membersControllers = require('../controllers/members');
const {verifyRole} = require('../middlewares/auth')
/**
 * @swagger
 * components:
 *  schemas:
 *    Members:
 *      type: object
 *      required:
 *        -name
 *        -image
 *      properties:
 *        name:
 *          type: string
 *          description: Member name
 *        image: 
 *          type: string
 *          description: Member image
 */
 
/**
 * @swagger
 *  tags:
 *    name: Members
 */ 

//Documentacion Swagger: Listar todos los miembros encontrados
/**
 * @swagger
 * /members:
 *  get:
 *    summary: Get information from all members
 *    tags: [Members]
 *    responses:
 *      200:
 *        description: Member list
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Members'
 * 
 */

//Documentacion Swagger: crear un miembro nuevo.
/**
 * @swagger
 * /members:
 *  post:
 *    summary: create a new Member
 *    tags: [Members]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Members'
 *    responses:
 *      200:
 *        description: The member was created successfully
 *        content:
 *          application/json:
 *            schema:
 *             $ref: '#components/schemas/Members'
 */

//Documentacion Swagger: actualizar informacion del miembro seleccionado.
/**
 * @swagger
 * /members/{id}:
 *  put:
 *   summary: Update member information
 *   tags: [Members]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: Member id
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/Members'
 *   responses:
 *     200:
 *       description: The member was created successfully
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#components/schemas/Members'
 */

//Documentacion Swagger: eliminar el miembro seleccionado
/**
 * @swagger
 * /members/{id}:
 *  delete:
 *   summary: Delete user
 *   tags: [Members]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: Member id
 *   responses:
 *     200:
 *       description: The member was created successfully
 *     404:
 *       description: Not found id.
 */
router
    .get('/', membersControllers.getAll) //List all members.
    .post('/', verifyRole, membersControllers.add) //Create new member.
    .delete('/:id', verifyRole, membersControllers.delete) //Delete member.
    .put('/:id', verifyRole, membersControllers.update) //Update member


module.exports = router;