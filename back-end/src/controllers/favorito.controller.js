const favoritoService = require('../services/favorito.service');

async function favoritar(req, res) {
  try {
    const userId = req.userId;
    const { noticiaId } = req.body;

    await favoritoService.favoritar(userId, noticiaId);

    return res.status(201).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao favoritar' });
  }
}

async function desfavoritar(req, res) {
  try {
    const userId = req.user.id;
    const { noticiaId } = req.params;

    await favoritoService.desfavoritar(userId, noticiaId);

    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao desfavoritar' });
  }
}

async function listar(req, res) {
  try {
    const userId = req.user.id;
    const favoritos = await favoritoService.listarFavoritos(userId);

    return res.json(favoritos);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao listar favoritos' });
  }
}

module.exports = {
  favoritar,
  desfavoritar,
  listar,
};
