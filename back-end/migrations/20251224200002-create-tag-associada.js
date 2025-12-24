'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TagsAssociadas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoria: {
        type: Sequelize.STRING
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Índices importantes
    await queryInterface.addIndex('TagsAssociadas', ['nome']);
    await queryInterface.addIndex('TagsAssociadas', ['categoria']);
    await queryInterface.addIndex('TagsAssociadas', ['noticiaId']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TagsAssociadas');
  }
};