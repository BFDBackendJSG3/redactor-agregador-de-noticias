const { Noticia, Fonte, TemaPrincipal } = require('../../../models');

class CreateNoticiaManualService {
  async execute({ titulo, conteudo, temaPrincipalId, autorId }) {
    if (!titulo || !conteudo || !temaPrincipalId) {
      throw new Error('Título, conteúdo e tema são obrigatórios');
    }

    const tema = await TemaPrincipal.findByPk(temaPrincipalId);
    if (!tema) {
      throw new Error('Tema principal inválido');
    }

    // Fonte padrão (seed)
    const fontePadrao = await Fonte.findOne({
      where: { nome: 'Redação Comuniq.PB' },
    });

    if (!fontePadrao) {
      throw new Error('Fonte padrão não encontrada');
    }

    const noticia = await Noticia.create({
      titulo,
      conteudo,
      temaPrincipalId,
      autorId,
      fonteId: fontePadrao.id,
      status: 'rascunho',
      tipoNoticia: 'criada',
      dataDeImportacao: new Date(),
      dataDePublicacao: null,
    });

    return noticia;
  }
}

module.exports = new CreateNoticiaManualService();
