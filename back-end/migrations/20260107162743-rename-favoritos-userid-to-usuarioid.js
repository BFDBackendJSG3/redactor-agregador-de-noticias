'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove índice único antigo
    await queryInterface.removeIndex(
      'Favoritos',
      'favoritos_user_id_noticia_id'
    );

    // Remove FK antiga (nome padrão do Postgres)
    await queryInterface.removeConstraint(
      'Favoritos',
      'Favoritos_userId_fkey'
    );

    // Renomeia coluna
    await queryInterface.renameColumn(
      'Favoritos',
      'userId',
      'usuarioId'
    );

    // Cria nova FK apontando para Usuarios
    await queryInterface.addConstraint('Favoritos', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'Favoritos_usuarioId_fkey',
      references: {
        table: 'Usuarios',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Cria novo índice único
    await queryInterface.addIndex(
      'Favoritos',
      ['usuarioId', 'noticiaId'],
      {
        unique: true,
        name: 'favoritos_usuario_id_noticia_id',
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      'Favoritos',
      'favoritos_usuario_id_noticia_id'
    );

    await queryInterface.removeConstraint(
      'Favoritos',
      'Favoritos_usuarioId_fkey'
    );

    await queryInterface.renameColumn(
      'Favoritos',
      'usuarioId',
      'userId'
    );

    await queryInterface.addConstraint('Favoritos', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Favoritos_userId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addIndex(
      'Favoritos',
      ['userId', 'noticiaId'],
      {
        unique: true,
        name: 'favoritos_user_id_noticia_id',
      }
    );
  },
};

