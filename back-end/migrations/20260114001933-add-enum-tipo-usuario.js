'use strict';

module.exports = {
<<<<<<< HEAD
  async up(queryInterface, Sequelize) {
    // Remover o DEFAULT atual
=======
  up: async (queryInterface, Sequelize) => {
    // 1️⃣ Remove o default antigo
>>>>>>> ac76052c35fd0c34d4a6cabc72903763d1ce89c1
    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario" DROP DEFAULT;
    `);

<<<<<<< HEAD
    // Alterar o tipo da coluna para o novo ENUM
    await queryInterface.changeColumn('Usuarios', 'tipoUsuario', {
      type: Sequelize.ENUM(
=======
    // 2️⃣ Cria o ENUM
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_Usuarios_tipoUsuario" AS ENUM (
>>>>>>> ac76052c35fd0c34d4a6cabc72903763d1ce89c1
        'ADMIN',
        'EDITOR',
        'JORNALISTA',
<<<<<<< HEAD
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
=======
        'ESTAGIARIO',
        'USER'
      );
    `);

    // 3️⃣ Altera a coluna para ENUM
    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario"
      TYPE "enum_Usuarios_tipoUsuario"
      USING "tipoUsuario"::text::"enum_Usuarios_tipoUsuario";
    `);

    // 4️⃣ Define o default novamente
    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario"
      SET DEFAULT 'USER';
    `);
  },

  down: async (queryInterface) => {
>>>>>>> ac76052c35fd0c34d4a6cabc72903763d1ce89c1
    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario" DROP DEFAULT;
    `);

<<<<<<< HEAD
    await queryInterface.changeColumn('Usuarios', 'tipoUsuario', {
      type: Sequelize.ENUM('ADMIN', 'USER'),
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario" SET DEFAULT 'USER';
=======
    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario"
      TYPE VARCHAR(255);
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_Usuarios_tipoUsuario";
>>>>>>> ac76052c35fd0c34d4a6cabc72903763d1ce89c1
    `);
  },
};
