var express = require("express");
var router = express.Router();
var News = require("../models/news");

const {createNew} = require('../controllers/news');

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

module.exports = router;
