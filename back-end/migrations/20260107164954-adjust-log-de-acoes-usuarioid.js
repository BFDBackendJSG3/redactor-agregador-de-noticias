'use strict';

module.exports = {
  async up(queryInterface) {
    // Remove FK antiga
    await queryInterface.removeConstraint(
      'LogDeAcoes',
      'LogDeAcoes_userId_fkey'
    );

    // Remove índice antigo
    await queryInterface.removeIndex('LogDeAcoes', ['userId']);

    // Renomeia coluna
    await queryInterface.renameColumn('LogDeAcoes', 'userId', 'usuarioId');

    // Cria nova FK
    await queryInterface.addConstraint('LogDeAcoes', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'LogDeAcoes_usuarioId_fkey',
      references: {
        table: 'Usuarios',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Novo índice
    await queryInterface.addIndex('LogDeAcoes', ['usuarioId']);
  },

  async down() {},
};
