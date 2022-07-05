const models = require('./../models');

const createComment = async (req, res) => {
    try{
        if(req.body.user_id !== null && typeof req.body.user_id === 'number'
        && req.body.body !== null && typeof req.body.body === 'string'
        && req.body.news_id !== null && typeof req.body.news_id === 'number'){
            await models.Comments.create(req.body);
            res.status(201).json({message: 'Comentario creado'})
        }else{
            res.status(400).json({error: 'El comentario debe recibir un user_id, un body y un news_id'})
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createComment
};