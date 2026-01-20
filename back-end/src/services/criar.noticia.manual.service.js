const { Noticia, TemaPrincipal, Municipio } = require('../../models');

class CriarNoticiaManualService {
  async execute({
    titulo,
    subtitulo,
    conteudo,
    temaPrincipalId,
    municipios = [],
    autor,
  }) {
    if (!titulo || !conteudo || !temaPrincipalId) {
      throw new Error('Título, conteúdo e tema são obrigatórios');
    }

    const tema = await TemaPrincipal.findByPk(temaPrincipalId);
    if (!tema) {
      throw new Error('Tema principal inválido');
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
      tipoNoticia: 'criada',
      status,
      dataDeImportacao: new Date(),
      dataDePublicacao: status === 'publicado' ? new Date() : null,
    });

    if (municipios.length) {
      await noticia.setMunicipios(municipios);
    }

    return noticia;
  }
}

module.exports = new CriarNoticiaManualService();
