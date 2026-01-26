const { Noticia, TemaPrincipal, Municipio, Fonte } = require('../../models');

class CriarNoticiaManualService {
  async execute({
    titulo,
    subtitulo,
    conteudo,
    temaPrincipalId,
    municipios = [],
    autor,
    imagemUrl,
  }) {
    if (!titulo || !conteudo || !temaPrincipalId) {
      throw new Error('Título, conteúdo e tema são obrigatórios');
    }

    const tema = await TemaPrincipal.findByPk(temaPrincipalId);
    if (!tema) {
      throw new Error('Tema principal inválido');
    }

    // Buscar a fonte padrão para notícias manuais
    const fonte = await Fonte.findOne({ where: { url: 'interno' } });
    if (!fonte) {
      throw new Error('Fonte padrão não encontrada');
    }

    const status =
      autor.tipoUsuario === 'EDITOR' || autor.tipoUsuario === 'ADMIN'
        ? 'publicado'
        : 'aguardando_revisao';

    const noticia = await Noticia.create({
      titulo,
      subtitulo,
      conteudo,
      temaPrincipalId,
      autorId: autor.id,
      fonteId: fonte.id,
      tipoNoticia: 'criada',
      status,
      imagemUrl: imagemUrl || null,
      dataDeImportacao: new Date(),
      dataDePublicacao: status === 'publicado' ? new Date() : null,
    });

    if (municipios.length) {
      // Se municipios são strings (nomes), buscar os IDs
      let municipioIds = municipios;
      if (typeof municipios[0] === 'string') {
        const { Op } = require('sequelize');
        const municipiosEncontrados = await Municipio.findAll({
          where: {
            nome: { [Op.in]: municipios }, // Usar IN para busca exata
          },
          attributes: ['id'],
        });
        municipioIds = municipiosEncontrados.map((m) => m.id);
      }
      await noticia.setMunicipios(municipioIds);
    }

    return noticia;
  }
}

module.exports = new CriarNoticiaManualService();
