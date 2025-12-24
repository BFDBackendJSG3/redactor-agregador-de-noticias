'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NoticiaMunicipios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      noticiaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Noticias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      municipioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Municipios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // índice composto
    await queryInterface.addIndex(
      'NoticiaMunicipios',
      ['noticiaId', 'municipioId'],
      { unique: true }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NoticiaMunicipios');
  }
};