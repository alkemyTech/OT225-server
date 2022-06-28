//@ts-check
const models = require("../models");


// Category Object
/**
 * @typedef {Object} Category
 * @property {number} id - category id
 * @property {string} name - category name
 * @property {string} description - category description
 * @property {string} image - category image
 */

const express = require("express");
const models = require('../models');

const createCategory = async (req, res) => {
    try {
        if (req.body.name !== null && typeof req.body.name === 'string') {
            await models.Categories.create(req.body);
            res.status(201).json({ message: 'Category created' });
        } else {
            res.status(400).json({ error: 'La categoría debe tener un nombre y ser un string' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        let data = await models.Categories.findOne({ where: { id: req.params.id } });
        if (data !== null) {
            await models.Categories.update(req.body, { where: { id: data.id } });
            res.status(201).json({ message: 'Categoría actualizada' });
        } else {
            res.status(400).json({ error: 'La categoría solicitada no existe' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const listCategories = async (req, res) => {
    try {
        let data = await models.Categories.findAll({
            attributes: ['name', 'description', 'image'],
            paranoid: false,
        });
        if (data !== null) {
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: 'No hay categorías' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
*  Get the detail of a Category
* @function
* @param {express.Request} req - req.params.id
* @returns {Promise<Category|Error>} - Category Object or Error
*/
const getCategoryDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await models.Categories.findOne({ where: { id: id } });
        if (category !== null) {
            return res.status(201).json(category);
        } else {
            return res.status(404).json({ error: 'La categoría solicitada no existe' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createCategory,
    updateCategory,
    listCategories,
    getCategoryDetails
};

