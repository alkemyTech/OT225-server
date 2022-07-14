const { checkSchema } = require('express-validator');

const { User } = require('../models');

// REGISTRATION SCHEMA
const registrationSchema = {
    email: {
        notEmpty: {
            bail: true,
            errorMessage: "Debe ingresar un email'"
        },
        isEmail: {
            bail: true,
            errorMessage: "El formato del email es incorrecto 'ejemplo@ejemplo.com'"
        },
        custom: {
            options: email => {
                return User.findOne({ where: { email: email } }).then(user => {
                    if (user) {
                        return Promise.reject('Ya existe el usuario!')
                    }
                })
            }
        }
    },
    firstName: {
        notEmpty: true,
        errorMessage: "Se debe ingresar un nombre"
    },
    lastName: {
        notEmpty: true,
        errorMessage: "Se debe ingresar un apellido"
    },
    password: {
        isLength: {
            errorMessage: 'La contraseña debe tener al menos 8 caracteres',
            options: {
                min: 8
            },
        }
    }
};

// LOGIN SCHEMA
const loginSchema = {
    email: {
        notEmpty: {
            bail: true,
            errorMessage: "Debe ingresar un email"
        },
        isEmail: {
            bail: true,
            errorMessage: "El formato del email es incorrecto 'ejemplo@ejemplo.com'"
        },
        custom: {
            options: email => {
                return User.findOne({ where: { email: email } }).then(user => {
                    if (!user) {
                        return Promise.reject({
                            ok: false,
                            message: 'No existe el usuario!'
                        })
                    }
                })
            }
        }
    },
    password: {
        notEmpty: {
            bail: true,
            errorMessage: "Debe ingresar una contraseña"
        }
    }
};

const registerValidator = checkSchema(registrationSchema);
const loginValidator = checkSchema(loginSchema);

module.exports = {
    loginValidator,
    registerValidator
};