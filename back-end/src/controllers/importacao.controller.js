const ImportarNoticiaService = require('../services/importar.noticia.service');

class ImportacaoController {
  async importar(req, res) {
    try {
      const { url, temaPrincipalId } = req.body;

      const noticia = await ImportarNoticiaService.execute({
        url,
        temaPrincipalId,
      });

      return res.status(201).json(noticia);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        erro: 'Erro ao importar notícia',
      });
    }
  }
}

module.exports = new ImportacaoController();
