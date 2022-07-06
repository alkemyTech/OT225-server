const express = require("express");
const router = express.Router();

const {
  createTestimony,
  updateTestimony,
  deleteTestimony,
} = require("../controllers/testimony");

/**
 * @swagger
 * components:
 *  schemas:
 *    Testimony:
 *      type: object
 *      required:
 *        -name
 *        -image
 *        -content
 *      properties:
 *        name:
 *          type: string
 *          description: Nombre del testimonio
 *        content:
 *          type: string
 *          description: Contenido contenido del testimonio
 *        image:
 *          type: string
 *          description: Imagen del testimonio
 *        
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Testimony
*/

/**
 * @swagger
 * /testimonies:
 *  post:
 *    summary: Crea un testimonio
 *    tags: [Testimony]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Testimony'
 *               
 *    responses:
 *      201:
 *        description: El testimonio se creo con extio
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Testimony'
 *      500:
 *        description: error del servidor
 *
 */

router.post("/", createTestimony);

/**
 * @swagger
 * /testimonies/{id}:
 *  put:
 *    summary: Actualiza un testimonio por id
 *    tags: [Testimony]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id del testimonio
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Testimony'
 *    responses:
 *      200:
 *        description: El testimonio fue actualizado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Testimony'
 *      404:
 *        description: No se encontro el testimonio
 *      500:
 *        description: Error del servidor
 */


router.put("/:id", updateTestimony);

/**
 * @swagger
 * /testimonies/{id}:
 *  delete:
 *    summary: Eliminar un testimonio por id
 *    tags: [Testimony]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id del testimonio
 
 *    responses:
 *      200:
 *        description: El testimonio fue eliminado
 *      404:
 *        description: No se encontro la noticia
 *      500:
 *        description: Error del servidor
 */


router.delete("/:id", deleteTestimony);

module.exports = router;
