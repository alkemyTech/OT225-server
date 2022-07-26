const models = require("./../models/");
const { contactEmail } = require("../utils/nodemailer");

//Permite crear un contacto el cual deberá contener los campos name y email
const createContact = async (req, res) => {
  try {
    if (
      req.body.name !== "" &&
      typeof req.body.name === "string" &&
      req.body.email !== "" &&
      typeof req.body.email === "string"
    ) {
      console.log(req.name, req.email);
      await models.contacts.create(req.body);
      const userEmail = req.user.name;
      contactEmail(userEmail, "Gracias por el contacto, ");
      res.status(201).json({ message: "Contacto creado" });
    } else {
      res
        .status(400)
        .json({ error: "El contacto debe tener un nombre y un email" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Permite listar los contactos almacenados
const listContacts = async (req, res) => {
  try {
    let data = await models.contacts.findAll({
      attributes: ["name", "email", "phone", "message"],
      paranoid: false,
    });
    if (data !== null) {
      res.status(200).json(data);
    } else {
      res.status(400).jdon({ error: "No hay contactos almacenados" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  listContacts,
};
