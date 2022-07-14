const { Router } = require("express");
const router = Router();

const { register, login, authenticatedUser } = require("../controllers/users");
const { registerValidator, loginValidator } = require('../utils/express-validator');
const { verifyToken } = require("../utils/jwt");

/** User Registration */
router.post('/register', registerValidator, register);
/** User Login */
router.post('/login', loginValidator, login);
/** Check Authenticated User */
router.get('/me', verifyToken, authenticatedUser);

module.exports = router;