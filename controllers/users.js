const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const { User } = require('../models');
const { jwtGenerator } = require('../utils/jwt');
const { sendEmail } = require('../utils/sendgrid')

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

        // send confirm email registration
        sendEmail(user.email, user.firstName)

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
        let user = await User.findOne({ where: { email: email } , raw: true})
        // Check password
        const validaPassword = bcrypt.compareSync(password, user.password);
        if (!validaPassword) {
            return res.status(401).send({
                ok: false,
                message: 'Password incorrecto'
            })
        };

        //Generar JWT
        const token = await jwtGenerator(user.email, user.id, user.roleId);

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

/**
*  Check if exist an authenticated User
* @function
* @param {express.Request} User - User Object
* @returns {Promise<User|Error>} - User or Error
*/
const authenticatedUser = async (req, res) => {
    const { user } = req;
    try {
        if (user) {
            return res.status(200).json(user)
        }
        return res.status(401).json("No hay un usuario autenticado")
    } catch (error) {
        return res.status(500).json({
            Error: error.message
        })
    }
};


//Permite listar usuarios almacenados en base de datos
const listUsers = async (req, res) => {
    try{
        let data = await User.findAll({
            attributes: ['firstName', 'lastName', 'email', 'image']
        });
        if(data.lenght !== 0){
            res.status(200).json({data: data});
        }else{
            res.status(400).json({error: 'No hay usuarios para mostar'});
        };
    }catch(error){
        res.status(500).json({error: error.message});
    };
};

//Permite actualizar los datos de un usuario
const updateUser = async (req, res) => {
    try{
        let user = await User.findOne({
            where: {id: req.params.id}
        });
        if(user !== null){
            await User.update(req.body, {where: {id: user.id}});
            res.status(200).json({message: 'Usuario actualizado'});
        }else{
            res.status(404).json({error: 'Usuario no encontrado'});
        };
    }catch(error){
        res.status(500).json({error: error.message});
    };
};

//Permite realizar un borrado logico de un usuario
const deleteUser = async (req, res) => {
    try{
        let user = await User.findOne({
            where: {id: req.params.id}
        });
        if(user !== null){
            await User.destroy({where: {id: user.id}});
            res.status(200).json({message: 'Usuario eliminado'});
        }else{
            res.status(404).json({error: 'El usuario no existe'});
        };
    }catch(error){
        res.status(500).json({error: error.message});
    };
};








module.exports = { 
    register, 
    login, 
    authenticatedUser,
    listUsers, 
    updateUser,
    deleteUser
};
