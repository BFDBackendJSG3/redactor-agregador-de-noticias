const { Noticia, Fonte, TemaPrincipal } = require('../../models');

module.exports = {
  async execute() {
    const noticias = await Noticia.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Fonte,
          as: 'fonte',
          attributes: ['id', 'responsavel', 'tipo', 'url'],
        },
        {
          model: TemaPrincipal,
          as: 'temaPrincipal',
          attributes: ['id', 'nome'],
        },
      ],
    });

    return noticias;
  },
};
