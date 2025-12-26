const ListarNoticiasService = require('../services/ListarNoticiasService');
const DetalharNoticiaService = require('../services/DetalharNoticiaService');

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

  async detalhe(req, res) {
    try {
      const { id } = req.params;

      const noticia = await DetalharNoticiaService.execute(id);

      if (!noticia) {
        return res.status(404).json({
          erro: 'Notícia não encontrada',
        });
      }

      return res.json(noticia);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        erro: 'Erro ao buscar notícia',
      });
    }
  }
}

module.exports = new NoticiasController();
