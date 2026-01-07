const ListarNoticiasService = require('../services/ListarNoticiasService');
const DetalharNoticiaService = require('../services/DetalharNoticiaService');
const CriarNoticiaService = require('../services/CriarNoticiaService');
const AtualizarNoticiaService = require('../services/AtualizarNoticiaService');



class NoticiasController {
  async listar(req, res) {
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

  async detalhar(req, res) {
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

  async criar(req, res) {
    try {
      const {
        titulo,
        conteudo,
        status,
        fonteId,
        temaPrincipalId,
      } = req.body;
  
      const noticia = await CriarNoticiaService.execute({
        titulo,
        conteudo,
        status,
        fonteId,
        temaPrincipalId,
      });
  
      return res.status(201).json(noticia);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        erro: error.message || 'Erro ao criar notícia',
      });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const {
        titulo,
        conteudo,
        status,
        fonteId,
        temaPrincipalId,
      } = req.body;
  
      const noticia = await AtualizarNoticiaService.execute({
        id,
        titulo,
        conteudo,
        status,
        fonteId,
        temaPrincipalId,
      });
  
      return res.json(noticia);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        erro: error.message || 'Erro ao atualizar notícia',
      });
    }
  }
  
}

module.exports = new NoticiasController();
