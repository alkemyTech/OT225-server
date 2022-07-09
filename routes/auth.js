const { Router } = require("express");
const router = Router();

const { register, login } = require("../controllers/users");
const { registerValidator, loginValidator } = require('../utils/express-validator');

/** User Registration */
router.post('/register', registerValidator, register);
/** User Login */
router.post('/login', loginValidator, login);

module.exports = router;