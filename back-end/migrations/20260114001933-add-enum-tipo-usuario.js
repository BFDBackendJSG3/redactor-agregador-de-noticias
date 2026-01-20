'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Usuarios', 'tipoUsuario', {
      type: Sequelize.ENUM(
        'ADMIN',
        'EDITOR',
        'JORNALISTA',
        'ESTAGIARIO',
        'JORNALISTA',
        'EDITOR'
      ),
      defaultValue: 'USER',
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Usuarios', 'tipoUsuario', {
      type: Sequelize.ENUM('ADMIN', 'USER'),
      defaultValue: 'USER',
    });
  },
};
