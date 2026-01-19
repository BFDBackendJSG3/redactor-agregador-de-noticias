'use strict';

const municipios = require('./municipios-pb.json');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Municipios', municipios);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Municipios', null, {});
  },
};

