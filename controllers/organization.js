const { Organization } = require ('../models')


class organizationControllers {
    static async getAll(req, res) {
        try{
            const organizations = await Organization.findAll({
                attributes: ['name'],
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

module.exports = organizationControllers;