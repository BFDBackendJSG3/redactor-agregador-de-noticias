'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alertas', {
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
      temaPrincipalId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'TemasPrincipais',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      municipioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Municipios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      palavraChave: {
        type: Sequelize.STRING
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.addIndex('Alertas', ['userId']);
    await queryInterface.addIndex('Alertas', ['temaPrincipalId']);
    await queryInterface.addIndex('Alertas', ['municipioId']);
    await queryInterface.addIndex('Alertas', ['ativo']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Alertas');
  }
};