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
      res
        .status(400)
        .json({ err: "Datos ingresados incorrectos." });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  newsController,
  createNew,
};
