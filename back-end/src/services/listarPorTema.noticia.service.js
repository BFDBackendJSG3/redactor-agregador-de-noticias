const { Noticia, TemaPrincipal } = require('../../models');

async function listarNoticiasPorTema(temaId) {
  const noticias = await Noticia.findAll({
    where: {
      temaPrincipalId: temaId,
    },
    include: [
      {
        model: TemaPrincipal,
        as: 'temaPrincipal',
        attributes: ['id', 'nome'],
      },
    ],
    order: [['dataDePublicacao', 'DESC']],
  });

  return noticias;
}

module.exports = { listarNoticiasPorTema };
