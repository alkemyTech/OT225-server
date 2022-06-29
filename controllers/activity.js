const models = require("../models");

/* Controlador de crear una actividad */
const createActivity = async (req, res) => {
    try {
      if (
        req.body.name !== "" &&
        typeof req.body.name === "string" &&
        req.body.content !== "" &&
        typeof req.body.name === "string" &&
        req.body.image !== "" &&
        typeof req.body.image === "string"
      ) {
        await models.Activities.create(req.body);
        res.status(201).json({ message: "Activity created" });
      } else {
        res
          .status(400)
          .json({ err: "Datos ingresados incorrectos." });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  };

  module.exports = { createActivity }