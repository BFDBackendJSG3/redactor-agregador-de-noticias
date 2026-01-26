const {
  Noticia,
  Fonte,
  TemaPrincipal,
  Municipio,
  TagAssociada,
  Favorito,
} = require('../../models');

module.exports = {
  async execute(id, userId) {
    const include = [
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
    ];

    // Para saber se favoritou
    if (userId) {
      include.push({
        model: Favorito,
        as: 'favoritos',
        attributes: ['id'],
        where: { userId },
        required: false,
      });
    }

    const noticia = await Noticia.findByPk(id, { include });

    if (!noticia) return null;

    const json = noticia.toJSON();

    return {
      ...json,
      favoritos: undefined,
      isFavorito: json.favoritos?.length > 0,
    };
  },
};
