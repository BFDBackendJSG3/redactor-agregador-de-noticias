'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Fontes', [
      {
        responsavel: 'G1 Paraíba',
        tipo: 'rss',
        url: 'https://g1.globo.com/rss/g1/pb',
        status: 'ativa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        responsavel: 'Portal Correio',
        tipo: 'rss',
        url: 'https://portalcorreio.com.br/feed/',
        status: 'ativa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        responsavel: 'Jornal da Paraíba',
        tipo: 'rss',
        url: 'https://jornaldaparaiba.com.br/feed',
        status: 'ativa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Fontes', {
      tipo: 'rss',
    });
  },
};
