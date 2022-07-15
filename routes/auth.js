const { Router } = require("express");
const router = Router();

const { register, login, authenticatedUser } = require("../controllers/users");
const {
  registerValidator,
  loginValidator,
} = require("../utils/express-validator");
const { verifyToken } = require("../utils/jwt");

/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *        -firstName
 *        -lastName
 *        -image
 *        -password
 *        -roleId
 *      properties:
 *        firstName:
 *          type: string
 *          description: Nombre del usuario
 *        lastName:
 *          type: string
 *          description: Apellido del usuario
 *        email:
 *          type: string
 *          description: Email del usuario
 *        image:
 *          type: string
 *          description: Imagen del usuario
 *        password:
 *          type: string
 *          description: Contraseña del usuario
 *        roleId:
 *          type: integer
 *          description: Id del rol del usuario
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      required:
 *        -email
 *        -password
 *      properties:
 *        email:
 *          type: string
 *          description: Email del usuario
 *        password:
 *          type: string
 *          description: Contraseña del usuario
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Me:
 *      type: object
 *      required:
 *        -name
 *        -id
 *        -iat
 *      properties:
 *        name:
 *          type: string
 *          description: Email del usuario
 *        id:
 *          type: integer
 *          description: Id del usuario
 *        iat:
 *          type: integer
 *          description: Timestamp de la petición
 */

/**
 * @swagger
 *  tags:
 *    name: Auth
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Registra un nuevo usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Users'
 *
 *    responses:
 *      201:
 *        description: El usuario se registro con exito
 *      400:
 *        description: Los datos ingresados fueron incorrectos
 */

/** User Registration */
router.post("/register", registerValidator, register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login de un usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Login'
 *
 *    responses:
 *      200:
 *        description: Usuario logueado con exito
 *      400:
 *        description: Los datos ingresados fueron incorrectos
 *
 */

/** User Login */
router.post("/login", loginValidator, login);

/**
 * @swagger
 * /auth/me:
 *  get:
 *    summary: Chequea si el usuario logeado este Autentificado
 *    security:
 *      - bearerAuth: []
 *    tags: [Auth]     
 *    responses:
 *      200:
 *        description: Devuelve el email y id del usuario basado en su token JWT
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Me'
 *      401:
 *        description: Usuario no autorizado
 */

/** Check Authenticated User */
router.get("/me", verifyToken, authenticatedUser);

module.exports = router;
