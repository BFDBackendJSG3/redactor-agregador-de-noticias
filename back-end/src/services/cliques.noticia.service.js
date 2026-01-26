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
  return await Noticia.findAll({
    order: [['cliques', 'DESC']],
    limit,
  });
}

module.exports = {
  registrarClique,
  listarMaisVirais,
};
