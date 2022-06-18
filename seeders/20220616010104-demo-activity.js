'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [{
      name: 'Acitividad Prueba',
      content: 'Esto es una actividad de prueba',
      image: 'https://res.cloudinary.com/dpib0izfh/image/upload/v1655342128/imagenes%20ejemplo/pexels-jill-wellington-40815_wvwbnd.jpg',
      createdAt: new Date,
      updatedAt: new Date  
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Activities', null, {});
     */
  }
};
