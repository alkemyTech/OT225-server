const models = require('./../models');


//Permite crear una nueva categoria la cual debe recibir el campo name, y este debe ser un string
const createCategory = async (req, res) =>{
    try{
        if(req.body.name !== null && typeof req.body.name === 'string'){
            await models.Categories.create(req.body);
            res.status(201).json({message: 'Category created'});
        }else{
            res.status(400).json({error: 'La categoría debe tener un nombre y ser un string'});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//Permite actualizar una categoria segun su ID en caso de que esta exista, caso contrario tira un error
const updateCategory = async (req, res) => {
    try{
        let data = await models.Categories.findOne({where: {id: req.params.id}});
        if(data !== null){
            await models.Categories.update(req.body, {where: {id: data.id}});
            res.status(201).json({message: 'Categoría actualizada'});
        }else{
            res.status(400).json({error: 'La categoría solicitada no existe'});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//Lista toda las categorias existentes
const listCategories = async (req, res) => {
    try{
        let data = await models.Categories.findAll({
            attributes: ['name', 'description', 'image'],
            paranoid: false,
        });
        if(data !== null){
            res.status(200).json(data);
        }else{
            res.status(400).json({error: 'No hay categorías'});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//Permite realizar un soft delete de una categoria segun su ID en caso de que esta exista, caso contrario tira un error
const deleteCategory = async (req, res) => {
    try{
        let data = await models.Categories.findOne({where: {id: req.params.id}})
        if(data !== null){
            await models.Categories.destroy({where: {id: data.id}})
            res.status(200).json({message: "Categoria eliminada"})
        }else{
            res.status(400).json({error: 'La categoría solicitada no existe'})
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createCategory,
    updateCategory,
    listCategories,
    deleteCategory
}; 

