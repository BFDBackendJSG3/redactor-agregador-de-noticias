'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'Usuarios', // nome da tabela
      'name', // nome antigo
      'nome' // nome novo
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Usuarios', 'nome', 'name');
  },
};
