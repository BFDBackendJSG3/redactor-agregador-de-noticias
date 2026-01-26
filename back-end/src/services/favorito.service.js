const { Favorito } = require('../../models');

async function listarFavoritos(userId) {
  return Favorito.findAll({
    where: { userId },
    include: ['noticia'],
  });
}

async function toggleFavorito(userId, noticiaId) {
  const fav = await Favorito.findOne({
    where: { userId, noticiaId },
  });

  if (fav) {
    await Favorito.destroy({
      where: {
        userId,
        noticiaId,
      },
    });
    return { favoritado: false };
  }

  await Favorito.create({ userId, noticiaId });
}

module.exports = {
  listarFavoritos,
  toggleFavorito,
};
