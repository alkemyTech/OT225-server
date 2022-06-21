const { News } = require ('../models/news')


class newsController {
    static async getAll(req, res) {
        try{
            const news = await News.findAll({

            });
            res.status(200).json ({
            
            })

        } catch (error) {
            return res.status(500).json ({ error })
        }
    }
}

module.exports = newsController;