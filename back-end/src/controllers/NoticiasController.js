const ListarNoticiasService = require('../services/ListarNoticiasService');

class NoticiasController {
  async index(req, res) {
    try {
      const noticias = await ListarNoticiasService.execute();

      return res.json(noticias);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        erro: 'Erro ao listar notícias',
      });
    }
  }
}

module.exports = new NoticiasController();
