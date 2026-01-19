'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remover o DEFAULT atual
    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario" DROP DEFAULT;
    `);

    // Alterar o tipo da coluna para o novo ENUM
    await queryInterface.changeColumn('Usuarios', 'tipoUsuario', {
      type: Sequelize.ENUM(
        'ADMIN',
        'USER',
        'ESTAGIARIO',
        'JORNALISTA',
        'EDITOR'
      ),
      allowNull: false,
    });

    // Definir o novo DEFAULT
    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario" SET DEFAULT 'USER';
    `);
  },

  async down(queryInterface, Sequelize) {
    // Remover default antes de reverter
    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario" DROP DEFAULT;
    `);

    await queryInterface.changeColumn('Usuarios', 'tipoUsuario', {
      type: Sequelize.ENUM('ADMIN', 'USER'),
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario" SET DEFAULT 'USER';
    `);
  },
};
