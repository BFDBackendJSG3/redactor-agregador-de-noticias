'use strict';

module.exports = {
  async up(queryInterface) {
    // Remove FK antiga
    await queryInterface.removeConstraint(
      'Configuracoes',
      'Configuracoes_userId_fkey'
    );

    // Remove índice antigo
    await queryInterface.removeIndex('Configuracoes', ['userId']);

    // Renomeia coluna
    await queryInterface.renameColumn(
      'Configuracoes',
      'userId',
      'usuarioId'
    );

    // Cria nova FK
    await queryInterface.addConstraint('Configuracoes', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'Configuracoes_usuarioId_fkey',
      references: {
        table: 'Usuarios',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Novo índice
    await queryInterface.addIndex('Configuracoes', ['usuarioId']);
  },

  async down() {},
};

