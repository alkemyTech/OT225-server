const { News } = require("../models/news");
const models = require("../models");

class newsController {
  static async getAll(req, res) {
    try {
      if(req.query.page ==! undefined) {
        const page = parseInt(req.query.page, 10);
        const { count, rows } = await models.News.findAndCountAll({
          limit: 10,
          offset: page * 10 - 10,
          attributes: ['name', 'content', 'image', 'categoryId']
        });
        if(rows.length ==! 0) {
          let prevPage, nextPage;
          if (page > 1) {
            prevPage = page - 1;
          }
          if (page * 10 < count) {
            nextPage = page + 1;
          }
          let data = {}
          if (prevPage) data.paginaAnterior = '/categories?page=' + prevPage;
          data.paginaActual = page;
          if (nextPage) data.paginaSiguiente = '/categories?page=' + nextPage;
          data.data = rows;
          res.status(200).json(data);
        }else{
          res.status(400).json({error: "No hay novedades en esta pagina"});
        }
      }else{
        let data = await models.News.findAll({
          attributes: ['name', 'content', 'image', 'categoryId']
        });
        if(data ==! null) res.status(200).json(data);
        else res.status(400).json({error: "No hay novedades"});
      }

    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  /* Delete news */
  static async delete(req, res) {
    const id = parseInt(req.params.id);
    try {
      const deleted = await models.News.destroy({
        where: {
          id: id
        }
      })
      deleted === 1 ? res.status(200).json({ success: true, message: `News deleted successfully.` }) : res.status(404).json({ success: false, message: `Not found id.` });
    } catch (error) {
      res.status(500).json({ error: error.message });
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
