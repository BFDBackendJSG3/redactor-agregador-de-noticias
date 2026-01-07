const { Noticia } = require('../../models');

module.exports = {
  async execute(id) {
    const noticia = await Noticia.findByPk(id);

    if (!noticia) {
      throw new Error('Notícia não encontrada');
    }

    await noticia.destroy();

    return true;
  },
};
