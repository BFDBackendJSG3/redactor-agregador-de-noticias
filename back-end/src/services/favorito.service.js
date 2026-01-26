const { Favorito } = require('../../models');

async function listarFavoritos(userId) {
  const favoritos = await Favorito.findAll({
    where: { userId },
    include: [
      {
        association: 'noticia',
        include: [{ association: 'temaPrincipal' }],
      },
    ],
  });

  // retorna só as notícias
  const mapped = favoritos
    .filter((fav) => fav.noticia)
    .map((fav) => ({
      ...fav.noticia.toJSON(),
      isFavorito: true,
    }));
  return mapped;
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
  return {
    favoritado: true,
  };
}

module.exports = {
  listarFavoritos,
  toggleFavorito,
};
