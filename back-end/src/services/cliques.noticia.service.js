const { Noticia } = require('../../models');

async function registrarClique(noticiaId) {
  const noticia = await Noticia.findByPk(noticiaId);

  if (!noticia) {
    throw new Error('Notícia não encontrada');
  }

  await Noticia.increment('cliques', {
    where: { id: noticiaId },
  });

  return true;
}

async function listarMaisVirais(limit = 10) {
  const { TemaPrincipal } = require('../../models');
  const noticias = await Noticia.findAll({
    order: [['cliques', 'DESC']],
    limit,
    include: [
      {
        model: TemaPrincipal,
        as: 'temaPrincipal',
        attributes: ['id', 'nome'],
      },
    ],
  });
  return noticias;
}

module.exports = {
  registrarClique,
  listarMaisVirais,
};
