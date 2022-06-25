const { Organization } = require ('../models')


class organizationControllers {
    static async getAll(req, res) {
        try{
            const organizations = await Organization.findAll({
                attributes: ['name','image','phone','address'],
                paranoid: false
            });
            res.status(200).json ({
                data:organizations,
                success: true,
            })

        } catch (error) {
            return res.status(500).json ({ error: error.message})
        }
    }
}

const updateOrganization = async (req, res) => {
    try {
      if (
        (req.body.name !== "" && typeof req.body.name === "string") ||
        (req.body.image !== "" && typeof req.body.image === "string") ||
        (req.body.address !== "" && typeof req.body.address === "string") ||
        (req.body.email !== "" && typeof req.body.email === "string") ||
        (req.body.welcomeText !== "" && typeof req.body.welcomeText === "string") ||
        (req.body.aboutUsText !== "" && typeof req.body.aboutUsText === "string") ||
        !isNaN(req.body.phone)
      ) {
        let data = await Organization.findOne({ where: { id: req.params.id } });
        if (data !== null) {
          await Organization.update(req.body, { where: { id: data.id } });
          res.status(200).json({ message: "Organizacion actualizada" });
        } else {
          res.status(400).json({ error: "La organizacion solicitada no existe" });
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

module.exports = {organizationControllers, updateOrganization};