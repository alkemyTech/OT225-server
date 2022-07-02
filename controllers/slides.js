const { Slides, sequelize } = require('../models');
const { imageUpload } = require('../utils/images');

//@ts-check

// Slide Object
/**
 * @typedef {Object} Slide
 * @property {number} id - Slide id
 * @property {string} imageUrl - Slide image url
 * @property {string} text - Slide text
 * @property {number} order - Slide order
 */


/**
*  Create a Slide
* @function
* @param {express.Request} Slide - Slide Object
* @returns {Promise<String|Error>} - Message Response or Error
*/
const createSlide = async (req, res) => {
    let { imageUrl, text, order } = req.body;
    try {
        // check if we are receiving imageUlr and text
        if (imageUrl && text) {
            const image = await imageUpload(imageUrl)
            imageUrl = image

            // Check if we are receiving order, if not create at first, or the highest
            if (!order) {
                // look for the highest value for order
                const { maxOrder } = await Slides.findOne({
                    attributes: [[
                        sequelize.fn('max', sequelize.col('order')), 'maxOrder'
                    ]],
                    paranoid: false,
                    raw: true
                });

                // if not exist any object in DB, assign number 1
                if (!maxOrder) {
                    order = 1
                }
                else {
                    order = maxOrder + 1;
                }
            }

            // slide object to create
            let newSlide = {
                imageUrl,
                text,
                order
            }

            const slide = await Slides.create(newSlide);
            return res.json(slide)
        }
    } catch (error) {
        return res.status(500).json({
            Error: error.message
        })
    }
}

module.exports = { createSlide };