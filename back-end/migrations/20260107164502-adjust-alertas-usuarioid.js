'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove FK antiga
    await queryInterface.removeConstraint('Alertas', 'Alertas_userId_fkey');

    // Remove índice antigo
    await queryInterface.removeIndex('Alertas', ['userId']);

    // Renomeia coluna
    await queryInterface.renameColumn('Alertas', 'userId', 'usuarioId');

    // Cria nova FK
    await queryInterface.addConstraint('Alertas', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'Alertas_usuarioId_fkey',
      references: {
        table: 'Usuarios',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Novo índice
    await queryInterface.addIndex('Alertas', ['usuarioId']);
  },

  async down(queryInterface) {
    // rollback opcional (pode deixar vazio se quiser)
  },
};

