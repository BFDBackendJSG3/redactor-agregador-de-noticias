'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favoritos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    // Evita favorito duplicado (mesmo usuário + mesma notícia)
    await queryInterface.addIndex(
      'Favoritos',
      ['userId', 'noticiaId'],
      { unique: true }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favoritos');
  }
};