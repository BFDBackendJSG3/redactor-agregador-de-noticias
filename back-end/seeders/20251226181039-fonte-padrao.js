'use strict';

module.exports = {
  async up(queryInterface) {
    const [resultado] = await queryInterface.sequelize.query(
      `
      SELECT id FROM "Fontes"
      WHERE url = 'interno'
      LIMIT 1
      `
    );

    if (resultado.length === 0) {
      await queryInterface.bulkInsert('Fontes', [
        {
          responsavel: 'Sistema Comuniq',
          tipo: 'sistema',
          url: 'interno',
          status: 'ativa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'Fontes',
      {
        url: 'interno',
      },
      {}
    );
  },
};
