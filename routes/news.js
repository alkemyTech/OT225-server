var express = require("express");
var router = express.Router();
var News = require("../models/news");

const {createNew, newsController} = require('../controllers/news');

router.get("/:id", async (req, res) => {
  const idNews = req.query.id;
  const news = await News.findAll({
    where: {
      id: idNews,
    },
  });
  res.json(news);
});

router.post('/',createNew)

/* Eliminar novedad */
router.delete('/:id', newsController.delete)

module.exports = router;
