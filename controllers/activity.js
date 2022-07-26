const models = require("../models");

//@ts-check

// Activity Object
/**
 * @typedef {Object} Activity
 * @property {number} id - activity id
 * @property {string} name - activity name
 * @property {string} content - activity content
 * @property {string} image - activity image
 */

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
      res.status(201).json({ message: "Actividad creada con exito" });
    } else {
      res.status(400).json({ err: "Datos ingresados incorrectos." });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

/**
 *  Update an Activity
 * @function
 * @param {express.Request} req.params.id - Activity id
 * @param {express.Request} Activity - Activity
 * @returns {Promise<String|Error>} - Message Response or Error
 */
const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { name, content, image } = req.body;
  try {
    if (
      (name && typeof name === "string") ||
      (content && typeof content === "string") ||
      (image && typeof image === "string")
    ) {
      const activity = await models.Activities.findOne({ where: { id: id } });
      if (activity) {
        await models.Activities.update(req.body, {
          where: { id: activity.id },
        });
        res.status(200).json({ message: "Actividad actualizada con exito" });
      } else {
        res.status(404).json({ error: "La actividad a actualizar no existe" });
      }
    } else {
      res
        .status(400)
        .json({ error: "No se ingresaron los datos correctamente" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createActivity, updateActivity };
