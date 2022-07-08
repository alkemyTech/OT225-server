const models = require('./../models');


//Permite listar usuarios almacenados en base de datos
const listUsers = async (req, res) => {
    try{
        let data = await models.User.findAll({
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
        let user = await models.User.findOne({
            where: {id: req.params.id}
        });
        if(user !== null){
            await models.User.update(req.body, {where: {id: user.id}});
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
        let user = await models.User.findOne({
            where: {id: req.params.id}
        });
        if(user !== null){
            await models.User.destroy({where: {id: user.id}});
            res.status(200).json({message: 'Usuario eliminado'});
        }else{
            res.status(404).json({error: 'El usuario no existe'});
        };
    }catch(error){
        res.status(500).json({error: error.message});
    };
};

module.exports = {
    listUsers,
    updateUser,
    deleteUser
};