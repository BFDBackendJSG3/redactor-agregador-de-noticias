module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Noticias', 'imagemUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Noticias', 'imagemUrl', {
      type: Sequelize.STRING,
    });
  },
};
