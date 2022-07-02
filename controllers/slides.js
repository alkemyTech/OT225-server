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

            // Check if we are receiving order, if not create at first, or next to highest
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

            await Slides.create(newSlide);
            return res.status(201).json("Slide creado con exito")

        } else {
            return res.status(400).json("No se han ingresado los datos correctamente");
        }

    } catch (error) {
        return res.status(500).json({
            Error: error.message
        })
    }
};

/**
*  Get all Slides
* @function
* @returns {Promise<Slide[]|Error>} - Array with Slide Object or Error
*/
const getSlides = async (req, res) => {
    try {
        const slides = await Slides.findAll({
            attributes: ['imageUrl', 'text', 'order'],
            paranoid: false,
        });

        if (slides.length === 0) {
            return res.status(404).json("No hay Slides creados")
        }

        return res.status(201).json(slides)

    } catch (error) {
        return res.status(500).json({
            Error: error.message
        })
    }
};

/**
* Get detail of a Slide (find by id) 
* @function
* @param {express.Request} req.params.id - Slide ID
* @returns {Promise<Slide|Error>} - Slide Object or Error
*/
const getSlideDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const slide = await Slides.findOne({
            where: { id: id }
        });
        if (!slide) {
            return res.status(404).json("El slide solicitado no existe")
        }
        return res.status(200).json(slide)
    } catch (error) {
        return res.status(500).json({
            Error: error.message
        })
    }
};

/**
 * Udpdate a Slide (find by id) 
 * @function
 * @param {express.Request} Slide - Slide Object
 * @param {express.Request} req.params.id - Slide ID 
 * @returns {Promise<String|Error>} - Message Response or Error 
 */
const updateSlide = async (req, res) => {
    const { id } = req.params;
    let { imageUrl, text, order } = req.body;
    try {
        const slide = await Slides.findOne({ where: { id: id } });
        if (!slide) {
            return res.status(404).json("El slide a actualizar no existe")
        } else {
            // check if we arereceiving imageUlr and text
            if (imageUrl && text) {
                const image = await imageUpload(imageUrl)
                imageUrl = image

                // Check if we are receiving order, if not create at first, or next to highest
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

                await Slides.update(newSlide, { where: { id: slide.id } });
                return res.status(201).json("Slide actualizado con exito")

            } else {
                return res.status(400).json("No se han ingresado los datos correctamente");
            }

        }
    } catch (error) {
        return res.status(500).json({
            Error: error.message
        })
    }
}

/**
 * Delete a Slide (find by id)
 * @function
 * @param {express.Request} req.params.id - Slide ID 
 * @returns {Promise<String|Error>} - Message Response or Error 
 */
const deleteSlide = async (req, res) => {
    const { id } = req.params;
    try {
        const slide = await Slides.findOne({ where: { id: id } })
        if (!slide) {
            res.status(400).json("El slide a eliminar no existe")
        } else {
            await Slides.destroy({ where: { id: slide.id } })
            res.status(200).json("Slide eliminado con exito")
        }
    } catch (error) {
        res.status(500).json({
            Error: error.message
        })
    }
};

module.exports = { createSlide, getSlides, getSlideDetails, updateSlide, deleteSlide };