const ListarNoticiasService = require('../services/listar.noticia.service');
const DetalharNoticiaService = require('../services/detalhar.noticia.service');
const AtualizarNoticiaService = require('../services/atualizar.noticia.service');
const DeletarNoticiaService = require('../services/deletar.noticia.service');
const CriarNoticiaManualService = require('../services/criar.noticia.manual.service');
const {
  listarNoticiasPorTema,
} = require('../services/listarPorTema.noticia.service');
const { Noticia } = require('../../models');

class NoticiasController {
  async listar(req, res) {
    try {
      const filtros = {
        page: req.query.page,
        limit: req.query.limit,
        tema: req.query.tema,
        municipio: req.query.municipio,
        dataInicio: req.query.dataInicio,
        dataFim: req.query.dataFim,
        search: req.query.search,

        // Especificação do tipo de usuario
        tipoUsuario: req.userRole || 'VISITANTE',
      };

      const resultado = await ListarNoticiasService.execute(filtros);
      return res.json(resultado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        erro: 'Erro ao listar notícias',
      });
    }
  }

  async listarAdmin(req, res) {
    try {
      const filtros = {
        page: req.query.page,
        limit: req.query.limit,
        tema: req.query.tema,
        municipio: req.query.municipio,
        dataInicio: req.query.dataInicio,
        dataFim: req.query.dataFim,
        search: req.query.search,
        status: req.query.status,

        // Especificação do tipo de usuario
        tipoUsuario: req.userRole || 'VISITANTE',
      };

      const resultado = await ListarNoticiasService.execute(filtros);
      return res.json(resultado);
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

  async criarManual(req, res) {
    try {
      const { titulo, subtitulo, conteudo, temaPrincipalId, municipios } =
        req.body;

      const noticia = await CriarNoticiaManualService.execute({
        titulo,
        subtitulo,
        conteudo,
        temaPrincipalId,
        municipios,
        autor: {
          id: req.userId,
          tipoUsuario: req.userRole,
        },
      });

      return res.status(201).json({
        message:
          noticia.status === 'publicado'
            ? 'Notícia publicada com sucesso'
            : 'Notícia enviada para revisão',
        noticia,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const {
        titulo,
        subtitulo,
        conteudo,
        status,
        fonteId,
        temaPrincipalId,
        imagemUrl,
      } = req.body;

      const noticia = await AtualizarNoticiaService.execute({
        id,
        titulo,
        subtitulo,
        conteudo,
        status,
        fonteId,
        temaPrincipalId,
        imagemUrl,
      });

      return res.json(noticia);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        erro: error.message || 'Erro ao atualizar notícia',
      });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;

      // Buscar a notícia para verificar permissões
      const noticia = await Noticia.findByPk(id);
      if (!noticia) {
        return res.status(404).json({ erro: 'Notícia não encontrada' });
      }

      // Verificar permissões: ADMIN/EDITOR podem deletar qualquer, JORNALISTA só as suas
      const podeDeletar =
        req.userRole === 'ADMIN' ||
        req.userRole === 'EDITOR' ||
        (req.userRole === 'JORNALISTA' && noticia.autorId === req.userId);

      if (!podeDeletar) {
        return res.status(403).json({ erro: 'Permissão negada' });
      }

      await DeletarNoticiaService.execute(id);

      return res.status(204).send();
    } catch (error) {
      if (error.message === 'Notícia não encontrada') {
        return res.status(404).json({ erro: error.message });
      }

      console.error(error);
      return res.status(500).json({
        erro: 'Erro ao deletar notícia',
      });
    }
  }

  async listarPorTema(req, res) {
    try {
      const { temaId } = req.params;

      const noticias = await listarNoticiasPorTema(temaId);

      return res.json(noticias);
    } catch (error) {
      console.error('Erro ao listar notícias por tema:', error);
      return res.status(500).json({ erro: 'Erro interno' });
    }
  }
}

module.exports = new NoticiasController();
