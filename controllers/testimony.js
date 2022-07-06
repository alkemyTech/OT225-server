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
        res.status(404).json({ error: "Testimony not found" });
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
          res.status(200).json({message: "Testimonio eliminado"})
      }else{
          res.status(404).json({error: 'El testimonio no existe'})
      }
  }catch(error){
      res.status(500).json({error: error.message})
  }
}

module.exports = {
  createTestimony,
  updateTestimony,
  deleteTestimony
};
