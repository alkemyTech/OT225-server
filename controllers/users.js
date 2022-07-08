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

module.exports = {
    listUsers
};