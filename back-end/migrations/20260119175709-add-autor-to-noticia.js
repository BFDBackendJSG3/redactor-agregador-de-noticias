'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Noticias', 'autorId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    await queryInterface.addIndex('Noticias', ['autorId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Noticias', 'autorId');
  },
};
