'use strict';

module.exports = {
  async up(queryInterface) {
    // Remove FK antiga
    await queryInterface.removeConstraint(
      'LogAcessos',
      'LogAcessos_userId_fkey'
    );

    // Remove índice antigo
    await queryInterface.removeIndex('LogAcessos', ['userId']);

    // Renomeia coluna
    await queryInterface.renameColumn('LogAcessos', 'userId', 'usuarioId');

    // Cria nova FK
    await queryInterface.addConstraint('LogAcessos', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'LogAcessos_usuarioId_fkey',
      references: {
        table: 'Usuarios',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Novo índice
    await queryInterface.addIndex('LogAcessos', ['usuarioId']);
  },

  async down() {},
};
