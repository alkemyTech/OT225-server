const { News } = require("../models/news");
const models = require("../models");

class newsController {
  static async getAll(req, res) {
    try {
      const news = await News.findAll({});
      res.status(200).json({});
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
/* controlador para crear una novedad */
const createNew = async (req, res) => {
  try {
    if (
      req.body.name !== "" &&
      typeof req.body.name === "string" &&
      req.body.content !== "" &&
      typeof req.body.name === "string" &&
      req.body.image !== "" &&
      typeof req.body.image === "string" &&
      !isNaN(req.body.categoryId)
    ) {
      await models.News.create(req.body);
      res.status(201).json({ message: "New created" });
    } else {
      res.status(400).json({ err: "Datos ingresados incorrectos." });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

/* controllador para actualizar una novedad */
const updateNew = async (req, res) => {
  try {
    if (
      req.body.name !== "" &&
      typeof req.body.name === "string" ||
      req.body.content !== "" &&
      typeof req.body.name === "string" ||
      req.body.image !== "" &&
      typeof req.body.image === "string" ||
      !isNaN(req.body.categoryId)
    ) {
      let data = await models.News.findOne({ where: { id: req.params.id } });
      if (data !== null) {
        await models.News.update(req.body, { where: { id: data.id } });
        res.status(200).json({ message: "Novedad actualizada" });
      } else {
        res.status(400).json({ error: "La novedad solicitada no existe" });
      }
    } else {
      res.status(400).json({ error: "Ingrese datos a modificar correctamente" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  newsController,
  createNew,
  updateNew,
};
