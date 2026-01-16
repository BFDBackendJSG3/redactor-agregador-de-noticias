'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('Noticias', ['url'], {
      unique: true,
      name: 'unique_noticias_url',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Noticias', 'unique_noticias_url');
  },
};
