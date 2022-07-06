//@ts-check

// Category Object
/**
 * @typedef {Object} Category
 * @property {number} id - category id
 * @property {string} name - category name
 * @property {string} description - category description
 * @property {string} image - category image
 */
const express = require('express');
const models = require('./../models');

//Permite crear una categoria, la cual debe recibir el campo name y ser un string
const createCategory = async (req, res) => {
  try {
    if (req.body.name !== null && typeof req.body.name === "string") {
      await models.Categories.create(req.body);
      res.status(201).json({ message: "Category created" });
    } else {
      res
        .status(400)
        .json({ error: "La categoría debe tener un nombre y ser un string" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Permite actualizar una categoria segun su ID en caso de que esta exista, caso contrario tira un error
const updateCategory = async (req, res) => {
  try {
    let data = await models.Categories.findOne({
      where: { id: req.params.id },
    });
    if (data !== null) {
      await models.Categories.update(req.body, { where: { id: data.id } });
      res.status(201).json({ message: "Categoría actualizada" });
    } else {
      res.status(400).json({ error: "La categoría solicitada no existe" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Lista toda las categorias existentes
const listCategories = async (req, res) => {

    try{
        //Si recibe la query page, realiza una paginacion al listar las categorias con un limite de 10 por pagina
        if(req.query.page !== undefined){
            const page = parseInt(req.query.page, 10);
            const {count, rows} = await models.Categories.findAndCountAll({
                attributes: ['name', 'description', 'image'],
                offset: (page * 10) - 10,
                limit: 10
            });
            const nextPage = (page, total) => {
                if((total/10)  > page){
                    return page + 1;
                };
                return null;
            };
            const prevPage = (page) => {
                if(page <= 1){
                    return null;
                };
                return page - 1;
            };
            if(rows.length !== 0){
                res.status(200).json({
                    paginaAnterior: `/categories?page=${prevPage(page)}`,
                    paginaActual: page,
                    paginaSiguiente: `/categories?page=${nextPage(page, count)}`,
                    data: rows
                })
            }else{
                res.status(400).json({error: 'No hay categorías en esta pagina'});
            }
        }else{
            //Caso contrario lista todas las categorias existentes
            let data = await models.Categories.findAll({
                attributes: ['name', 'description', 'image'],
                paranoid: false,
            });
            if(data !== null){
                res.status(200).json(data);
            }else{
                res.status(400).json({error: 'No hay categorías'});
            };
        };
    }catch(error){
        res.status(500).json({error: error.message});
    };
};

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
      return res
        .status(404)
        .json({ error: "La categoría solicitada no existe" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Permite realizar un soft delete de una categoria segun su ID en caso de que esta exista, caso contrario tira un error
const deleteCategory = async (req, res) => {
  try {
    let data = await models.Categories.findOne({
      where: { id: req.params.id },
    });
    if (data !== null) {
      await models.Categories.destroy({ where: { id: data.id } });
      res.status(200).json({ message: "Categoria eliminada" });
    } else {
      res.status(400).json({ error: "La categoría solicitada no existe" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  listCategories,
  deleteCategory,
  getCategoryDetails,
};
