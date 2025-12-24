'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Noticias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      conteudo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING
      },
      dataDePublicacao: {
        type: Sequelize.DATE
      },
      dataDeImportacao: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('rascunho', 'aguardando_revisao', 'publicado', 'suspenso'),
        allowNull: false,
        defaultValue: 'rascunho'
      },
      tipoNoticia: {
        type: Sequelize.ENUM('importada', 'criada'),
        allowNull: false
      },
      fonteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Fontes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      temaPrincipalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TemasPrincipais',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    await queryInterface.addIndex('Noticias', ['status']);
    await queryInterface.addIndex('Noticias', ['tipoNoticia']);
    await queryInterface.addIndex('Noticias', ['dataDePublicacao']);
    await queryInterface.addIndex('Noticias', ['fonteId']);
    await queryInterface.addIndex('Noticias', ['temaPrincipalId']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Noticias');
  }
};