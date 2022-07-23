var express = require("express");
var router = express.Router();
var News = require("../models/news");
const {verifyRole} = require('../middlewares/auth');
const { createNew, updateNew, newsController } = require("../controllers/news");
/**
 * @swagger
 * components:
 *  schemas:
 *    News:
 *      type: object
 *      required:
 *        -name
 *        -content
 *        -image
 *        -categoryId
 *      properties:
 *        id:
 *          type: integer
 *          description: Id autogenerado
 *        name:
 *          type: string
 *          description: Nombre de la noticia
 *        content:
 *          type: string
 *          description: Contenido de la noticia
 *        image:
 *          type: string
 *          description: Imagen de la noticia
 *        categoryId:
 *          type: integer
 *          description: Id de la categoria de la noticia
 *        
 *
 */

/**
 * @swagger
 *  tags:
 *    name: News
*/

/**
 * @swagger
 * /news:
 *  get:
 *    summary: Devuelve una lista de todos las noticias
 *    tags: [News]
 *    responses:
 *      200:
 *        description: Lista de noticias
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/News'
 *
 */
router.get("/", newsController.getAll);

/**
 * @swagger
 * /news:
 *  post:
 *    summary: Crea una noticia
 *    tags: [News]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/News'
 *               
 *    responses:
 *      201:
 *        description: La noticia se creo con extio
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/News'
 *      500:
 *        description: error del servidor
 *
 */

router.post("/", verifyRole, createNew);

/**
 * @swagger
 * /news/{id}:
 *  put:
 *    summary: Actualiza una noticia por id
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id de la noticia
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/News'
 *    responses:
 *      200:
 *        description: La noticia fue actualizada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/News'
 *      404:
 *        description: No se encontro la noticia
 *      500:
 *        description: Error del servidor
 */

router.put("/:id", verifyRole, updateNew);

/**
 * @swagger
 * /news/{id}:
 *  delete:
 *    summary: Eliminar una noticia por id
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id de la noticia
 
 *    responses:
 *      200:
 *      404:
 *        description: No se encontro la noticia
 *      500:
 *        description: Error del servidor
 */

router.delete('/:id', verifyRole, newsController.delete);
//Lista comentarios de una News segun su ID
router.get('/:id/comments', newsController.listNewsComments);

module.exports = router;
