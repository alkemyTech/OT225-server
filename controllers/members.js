const { Members } = require("../models");
class membersControllers {
  /* List all Members */
  static async getAll(req, res) {
    try {
      let page = parseInt(req.query.page) || 0;
      let limit = parseInt(req.query.limit) || 2;
      let options = {
        limit: +limit,
        offset: parseInt(page) * parseInt(limit),
      };
      const { count, rows } = await Members.findAndCountAll(options);
      if (rows.length !== 0) {
        let prevPage, nextPage;
        if (page >= 1) {
          prevPage = page - 1;
        }
        console.log(count);
        if (count / limit > page + 1) {
          nextPage = page + 1;
        }
        let data = {};
        if (prevPage >= 0) data.paginaAnterior = "/members?page=" + prevPage;
        data.paginaActual = page;
        if (nextPage) data.paginaSiguiente = "/members?page=" + nextPage;
        data.data = rows;
        data.succes = true;
        res.status(200).json(data);
      } else {
        res.status(404).json({ success: "Not members found" });
      }
      // const members = await Members.findAll({
      // });
      // res.status(200).json({
      //     data: members,
      //     success: true,
      // })
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  /* Create new member */
  static async add(req, res) {
    const { name, image } = req.body;
    try {
      if (name && typeof name === "string") {
        await Members.create(req.body);
        return res
          .status(201)
          .json({
            success: true,
            message: `El miembro se ha creado con éxito`,
          });
      } else {
        return res
          .status(400)
          .json({
            success: false,
            message: `Verifique que el campo nombre no sea Null, y que sea del tipo STRING`,
          });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  /* Delete Member */
  static async delete(req, res) {
    const id = parseInt(req.params.id);
    try {
      const deleted = await Members.destroy({
        where: {
          id: id,
        },
      });
      deleted === 1
        ? res
            .status(200)
            .json({ success: true, message: `Member deleted successfully.` })
        : res.status(404).json({ success: false, message: `Not found id.` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  /* Update Member */
  static async update(req, res) {
    try {
      if (
        (req.body.name !== "" && typeof req.body.name === "string") ||
        (req.body.image !== "" && typeof req.body.image === "string")
      ) {
        let data = await Members.findOne({ where: { id: req.params.id } });
        if (data !== null) {
          await Members.update(req.body, { where: { id: data.id } });
          res
            .status(200)
            .json({ success: true, message: "Miembro actualizado" });
        } else {
          res.status(404).json({ error: "La novedad solicitada no existe" });
        }
      } else {
        res
          .status(400)
          .json({ error: "Ingrese datos a modificar correctamente" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = membersControllers;
