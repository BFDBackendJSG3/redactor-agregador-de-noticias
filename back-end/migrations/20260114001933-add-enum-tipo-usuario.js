'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1️⃣ Remove o default antigo
    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario" DROP DEFAULT;
    `);

    // 2️⃣ Cria o ENUM
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_Usuarios_tipoUsuario" AS ENUM (
        'ADMIN',
        'EDITOR',
        'JORNALISTA',
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
    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario" DROP DEFAULT;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "Usuarios"
      ALTER COLUMN "tipoUsuario"
      TYPE VARCHAR(255);
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_Usuarios_tipoUsuario";
    `);
  },
};
