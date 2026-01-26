const favoritoService = require('../services/favorito.service');

async function listar(req, res) {
  try {
    const userId = req.user.id;
    const favoritos = await favoritoService.listarFavoritos(userId);

    return res.json(favoritos);
  } catch (err) {
    console.error('ERRO FAVORITO:', err); // 👈 MOSTRA O ERRO REAL
    return res.status(500).json({ erro: 'Erro ao listar favoritos' });
  }
}

async function toggle(req, res) {
  try {
    const userId = req.userId;
    const { noticiaId } = req.body;

    if (!noticiaId) {
      return res.status(400).json({ erro: 'noticiaId é obrigatório' });
    }

    const result = await favoritoService.toggleFavorito(userId, noticiaId);
    return res.json(result);
  } catch (err) {
    console.error('ERRO FAVORITO:', err); // 👈 MOSTRA O ERRO REAL
    return res.status(500).json({ erro: 'Erro ao atualizar favorito' });
  }
}

module.exports = {
  listar,
  toggle,
};
