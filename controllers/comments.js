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
module.exports = { updateComment };
