"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Fontes",
      [
        {
          responsavel: "Sistema Comuniq",
          tipo: "sistema",
          url: "interno",
          status: "ativa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Fontes", {
      url: "interno",
    });
  },
};


