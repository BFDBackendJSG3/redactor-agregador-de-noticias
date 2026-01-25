const { Favorito } = require('../../models');

async function favoritar(userId, noticiaId) {
  return Favorito.findOrCreate({
    where: { userId, noticiaId },
  });
}

async function desfavoritar(userId, noticiaId) {
  return Favorito.destroy({
    where: { userId, noticiaId },
  });
}

async function listarFavoritos(userId) {
  return Favorito.findAll({
    where: { userId },
    include: ['noticia'],
  });
}

module.exports = {
  favoritar,
  desfavoritar,
  listarFavoritos,
};
