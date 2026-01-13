'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const passwordHash = await bcrypt.hash('admin123', 8);

    await queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'Administrador',
        email: 'admin@comuniq.com',
        passwordHash,
        tipoUsuario: 'ADMIN',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Usuarios', {
      email: 'admin@comuniq.com',
    });
  },
};