const {
  Noticia,
  Fonte,
  TemaPrincipal,
  Municipio,
  TagAssociada,
} = require('../../models');

module.exports = {
  async execute(id) {
    const noticia = await Noticia.findByPk(id, {
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
        {
          model: Municipio,
          as: 'municipios',
          attributes: ['id', 'nome'],
          through: { attributes: [] },
        },
        {
          model: TagAssociada,
          as: 'tags',
          attributes: ['id', 'nome', 'categoria'],
        },
      ],
    });

    return noticia;
  },
};
