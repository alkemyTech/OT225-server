const { Members } = require('../models')
class membersControllers {
    /* List all Members */
    static async getAll(req, res) {
        try {
            const members = await Members.findAll({
            });
            res.status(200).json({
                data: members,
                success: true,
            })

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    };
    /* Create new member */
    static async add(req, res) {
        const { name, image } = req.body
        try {
            if ((name) && (typeof (name) === 'string')) {
                await Members.create(req.body)
                return res.status(200).json({ success: true, message: `El miembro se ha creado con éxito` });
            } else {
                return res.status(400).json({ success: false, message: `Verifique que el campo nombre no sea Null, y que sea del tipo STRING` });
            }

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    /* Delete Member */
    static async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            const deleted = await Members.destroy({
                where : {
                    id:id
                }
            })
            deleted === 1 ? res.status(200).json({ success: true, message: `Member deleted successfully.` }) : res.status(404).json({ success: false, message: `Not found id.` });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = membersControllers;