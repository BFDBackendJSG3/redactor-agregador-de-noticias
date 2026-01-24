const { Noticia, Fonte, TemaPrincipal, Municipio } = require('../../models');

module.exports = {
  async execute({
    id,
    titulo,
    subtitulo,
    conteudo,
    status,
    fonteId,
    temaPrincipalId,
    imagemUrl,
    municipios = [],
  }) {
    const noticia = await Noticia.findByPk(id);

    if (!noticia) {
      throw new Error('Notícia não encontrada');
    }

    if (fonteId) {
      const fonte = await Fonte.findByPk(fonteId);
      if (!fonte) {
        throw new Error('Fonte não encontrada');
      }
    }

    if (temaPrincipalId) {
      const tema = await TemaPrincipal.findByPk(temaPrincipalId);
      if (!tema) {
        throw new Error('Tema principal não encontrado');
      }
    }

    await noticia.update({
      titulo: titulo ?? noticia.titulo,
      subtitulo: subtitulo ?? noticia.subtitulo,
      conteudo: conteudo ?? noticia.conteudo,
      status: status ?? noticia.status,
      fonteId: fonteId ?? noticia.fonteId,
      temaPrincipalId: temaPrincipalId ?? noticia.temaPrincipalId,
      imagemUrl: imagemUrl || null,
    });

    // Atualizar municípios se fornecidos
    if (municipios && Array.isArray(municipios)) {
      // Se municipios são strings (nomes), buscar os IDs
      let municipioIds = municipios;
      if (typeof municipios[0] === 'string') {
        const { Op } = require('sequelize');
        const municipiosEncontrados = await Municipio.findAll({
          where: { nome: { [Op.in]: municipios } },
          attributes: ['id'],
        });
        municipioIds = municipiosEncontrados.map((m) => m.id);
      }
      await noticia.setMunicipios(municipioIds);
    }

    return noticia;
  },
};
