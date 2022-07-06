const models = require("../models");

const updateComment = async (req, res) => {
  try {
    if (
      (req.body.body !== "" && typeof req.body.body === "string")
    ) {
      let data = await models.Comments.findOne({
        where: { id: req.params.id },
      });
      if (data !== null) {
        await models.Comments.update(req.body, { where: { id: data.id } });
        res.status(200).json({ message: "Comentario actualizada" });
      } else {
        res.status(400).json({ error: "El comentario solicitado no existe" });
      }
    } else {
      res
        .status(400)
        .json({ error: "Ingrese datos a modificar correctamente" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Permite crear un comentario el cual debe recibir un user_id, un body y un news_id
const createComment = async (req, res) => {
    try{
        if(req.body.user_id !== null && typeof req.body.user_id === 'number'
        && req.body.body !== null && typeof req.body.body === 'string'
        && req.body.news_id !== null && typeof req.body.news_id === 'number'){
            await models.Comments.create(req.body);
            res.status(201).json({message: 'Comentario creado'});
        }else{
            res.status(400).json({error: 'El comentario debe recibir un user_id, un body y un news_id'});
        };
    }catch(error){
        res.status(500).json({error: error.message});
    };
};

//Permite listar todos los comentarios ordenados por fecha de creacion
const listComments = async (req, res) => {
    try{
        let data = await models.Comments.findAll({
            attributes: ['body'],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        if(data.lenght !== 0){
            res.status(200).json({data: data});
        }else{
            res.status(400).json({error: 'No hay comentario para mostrar'});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    };
};

module.exports = {
    createComment,
    listComments,
    updateComment
};
