const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const { User } = require('../models');
const { jwtGenerator } = require('../utils/jwt');

//@ts-check

// Slide Object
/**
 * @typedef {Object} User
 * @property {number} id - User id
 * @property {string} email - User email
 * @property {string} firstName - User first name
 * @property {string} lastName - User last name
 * @property {string} password - User password
 */


/**
*  User Registration
* @function
* @param {express.Request} User - User Object
* @returns {Promise<User|Error>} - User or Error
*/
const register = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    try {

        // Data validation & check is User exists
        const validate = validationResult(req);
        if (!validate.isEmpty()) {
            return res.status(400).json({
                Error: validate.errors[0].msg
            });
        }

        // User object
        let user = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        };

        // Encrypt pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Create new User
        user = await User.create(user);

        // generate JWT
        const token = await jwtGenerator(user.email, user.id);

        return res.status(201).json({
            message: `Se ha creado el usuario ${user.email}`,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            token: token
        })
    } catch (error) {
        return res.status(500).send({
            Error: error.message
        })
    }
};


/**
*  User Login
* @function
* @param {express.Request} User - User Object
* @returns {Promise<User|Error>} - User or Error
*/
const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        // Data validation & check is User exists
        const validate = validationResult(req);
        if (!validate.isEmpty()) {
            return res.status(400).json({
                Error: validate.errors[0].msg
            });
        };

        // Get user to check if passwords matchs
        let user = await User.findOne({ where: { email: email } })

        // Check password
        const validaPassword = bcrypt.compareSync(password, user.password);
        if (!validaPassword) {
            return res.status(401).send({
                ok: false,
                message: 'Password incorrecto'
            })
        };

        //Generar JWT
        const token = await jwtGenerator(user.email, user.id);

        return res.header('Access-Control-Expose-Headers', 'Authorization').header('Authorization', token).status(201).send({
            message: "Usuario logueado con exito",
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            token: token
        });

    } catch (error) {
        return res.status(500).send({
            Error: error.message
        })
    }
};

module.exports = { register, login };