'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('Usuario', 'Usuarios');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('Usuarios', 'Usuario');
  },
};
