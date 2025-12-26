'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const temas = [
      {
        nome: 'Geral',
        descricao: 'Tema padrão',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Política',
        descricao: 'Notícias sobre política',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Saúde',
        descricao: 'Notícias sobre saúde pública',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Educação',
        descricao: 'Notícias sobre educação',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const tema of temas) {
      const [resultado] = await queryInterface.sequelize.query(
        `
        SELECT id FROM "TemasPrincipais"
        WHERE nome = :nome
        LIMIT 1
        `,
        {
          replacements: { nome: tema.nome },
        }
      );

      if (resultado.length === 0) {
        await queryInterface.bulkInsert('TemasPrincipais', [tema]);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'TemasPrincipais',
      {
        nome: ['Geral', 'Política', 'Saúde', 'Educação'],
      },
      {}
    );
  },
};
