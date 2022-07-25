const express = require('express');
const router = express.Router();

const { verifyOwnership } = require("../middlewares/auth");

const { 
    getCategoryDetails, 
    createCategory, 
    updateCategory, 
    listCategories, 
    deleteCategory } 
    = require('../controllers/categories');

//Modelo de categoria
/**
 * @swagger
 * components:
 *  schemas:
 *      Categories:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Category name
 *              description:
 *                  type: string
 *                  description: Category description
 *              image:
 *                  type: string
 *                  description: Category image
 *          required:
 *              - name
 *          example:
 *              name: Categoria 1
 *              description: Categoria de prueba
 *              image: imagen.jpg
 */


//------------ ENDPOINTS ------------//
//Listar Categorias
/**
 * @swagger
 * /categories:
 *  get:
 *      summary: Muestra las categorias almacenadas
 *      tags: [Categories]
 *      parameters:
 *        - in: query
 *          name: page
 *          type: interger
 *          description: Numero de pagina
 *      responses:
 *          201:
 *              description: Todas las categorias
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Categories'
 *          400:
 *              description: No hay categorias para mostrar
 */
router.get('/', listCategories);
//Listar categoria por id
/**
 * @swagger
 * /categories/{id}:
 *  get:
 *      summary: Muestra una categoria segun su ID
 *      tags: [Categories]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Category Id
 *      responses:
 *          201:
 *              description: Categoria
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Categories'
 *          400:
 *              description: La categoria no existe
 */
router.get('/:id', getCategoryDetails);
//Crear una categoria
/**
 * @swagger
 * /categories:
 *  post:
 *      summary: Crea una nueva categoria
 *      tags: [Categories]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Categories'
 *      responses:
 *          201:
 *              description: Nueva categoria creada
 *          400:
 *              description: No se reciben los campos necesarios
 */
router.post('/', verifyOwnership, createCategory);
//Actualizar una categoria
/**
 * @swagger
 * /categories/{id}:
 *  put:
 *      summary: Actualiza una categoria
 *      tags: [Categories]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Category Id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Categories'
 *      responses:
 *          200:
 *              description: Categoria actualizada
 *          400:
 *              description: La categoria no existe
 */
router.put('/:id', verifyOwnership, updateCategory);
//Eliminar una categoria
/**
 * @swagger
 * /categories/{id}:
 *  delete:
 *      sumary: Elimina una categoria
 *      tags: [Categories]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Category Id
 *      responses:
 *          200:
 *              description: Categoria eliminada
 *          400:
 *              description: La categoria no existe
 */
router.delete('/:id', verifyOwnership, deleteCategory);

module.exports = router; 