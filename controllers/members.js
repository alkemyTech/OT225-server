const { Members } = require ('../models')
class membersControllers {
    static async getAll(req, res) {
        try{
            const members = await Members.findAll({
            });
            res.status(200).json ({
                data:members,
                success: true,
            })

        } catch (error) {
            return res.status(500).json ({ error: error.message})
        }
    }
}

module.exports = membersControllers;