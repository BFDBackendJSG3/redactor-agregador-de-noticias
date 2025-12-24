'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogAcessos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userAgent: {
        type: Sequelize.STRING
      },
      rota: {
        type: Sequelize.STRING
      },
      metodo: {
        type: Sequelize.STRING
      },
      dataAcesso: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
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

    // índices úteis
    await queryInterface.addIndex('LogAcessos', ['userId']);
    await queryInterface.addIndex('LogAcessos', ['dataAcesso']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LogAcessos');
  }
};