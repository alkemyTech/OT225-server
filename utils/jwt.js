const jwt = require('jsonwebtoken');

//** Generate JWT */
const jwtGenerator = async (username, userId) => {
    try {
        const token = await jwt.sign({ name: username, id: userId }, process.env.SECRET_JWT);

        if (token) {
            return token;
        } else {
            return res.json({
                Error: "No se pudo generar el token correctamente"
            })
        }
    } catch (err) {
        console.log(err)
    }
};

/** Verify JWT */
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({ error: 'Token invalido' })
    }
};

module.exports = { jwtGenerator, verifyToken };