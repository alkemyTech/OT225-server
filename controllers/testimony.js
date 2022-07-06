const models = require("../models");
/* crea un nuevo testimonio */
const createTestimony = async (req, res) => {
  try {
    if (
      req.body.name !== "" &&
      typeof req.body.name === "string" &&
      req.body.content !== "" &&
      typeof req.body.name === "string" &&
      req.body.image !== "" &&
      typeof req.body.image === "string"
    ) {
      await models.Testimonials.create(req.body);
      res.status(201).json({ message: "Testimony created" });
    } else {
      res.status(400).json({ err: "Datos ingresados incorrectos." });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
/* actualiza un testimonio */
const updateTestimony = async (req, res) => {
  try {
    if (
      (req.body.name !== "" && typeof req.body.name === "string") ||
      (req.body.image !== "" && typeof req.body.image === "string") ||
      (req.body.content !== "" && typeof req.body.content === "string")
    ) {
      let data = await models.Testimonials.findOne({
        where: { id: req.params.id },
      });
      if (data !== null) {
        await models.Testimonials.update(req.body, { where: { id: data.id } });
        res.status(200).json({ message: "Testimony update" });
      } else {
        res.status(400).json({ error: "Testimony not found" });
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
/* hacer un soft delete de un testimonio existente */
const deleteTestimony = async (req, res) => {
  try{
      let data = await models.Testimonials.findOne({where: {id: req.params.id}})
      if(data !== null){
          await models.Testimonials.destroy({where: {id: data.id}})
          res.status(200).json({message: "Testimonio eliminada"})
      }else{
          res.status(400).json({error: 'el testimonio no existe'})
      }
  }catch(error){
      res.status(500).json({error: error.message})
  }
}

/* Listar Testimonios existentes paginados en 10 por pagina*/
const listTestimony = async (req, res) => {
  try{
    if(req.query.page !== undefined){
      const page = parseInt(req.query.page, 10);
      const { count, rows } = await models.Testimonials.findAndCountAll({
        attributes: ['name', 'image', 'content'],
        offset: (page * 10) -10,
        limit: 10
      });
      const nextPage = (page, total) => {
        if((page / 10) > page){
          return page + 1;
        }else{
          return null;
        };
      };
      const prevPage = (page) => {
        if(page <= 1){
          return null;
        }else{
          return page -1;
        };
      };
      if(rows.length !== 0){
        res.status(200).json({
          prevPage: `/testimonies/${prevPage(page)}`,
          page: page,
          nextPage: `/testimonies/${nextPage(page, count)}`,
          data: rows
        });
      }else{
        res.status(400).json({error: 'No hay testimonios para mostrar'})
      };
    }else{
      res.status(400).json({error: 'Debe recibir la query page'})
    };    
  }catch(error){
    res.status(500).json({error: error.message});
  };
};

module.exports = {
  createTestimony,
  updateTestimony,
  deleteTestimony,
  listTestimony
};
