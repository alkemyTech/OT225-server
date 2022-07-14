const jwt = require('jsonwebtoken');


async function verifyRole(req, res, next) {
    const token = req.header('Authorization').split(' ')[1]
    try {
        const data = jwt.verify(token, process.env.SECRET_JWT)
        console.log(data);
        if (data.roleId) {
            next();
        } else {
            res.status(403).json ({error: 'Unauthorized', message:'Access denied'})
        }
    }catch{
        res.status(401).json({error:'Unauthorized', message: 'Token verification failed'})
    }
}
module.exports = {verifyRole}