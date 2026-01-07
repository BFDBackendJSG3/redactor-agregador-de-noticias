const { Noticia, Fonte, TemaPrincipal } = require('../../models');

module.exports = {
  async execute({ id, titulo, conteudo, status, fonteId, temaPrincipalId }) {
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
      conteudo: conteudo ?? noticia.conteudo,
      status: status ?? noticia.status,
      fonteId: fonteId ?? noticia.fonteId,
      temaPrincipalId: temaPrincipalId ?? noticia.temaPrincipalId,
    });

    return noticia;
  },
};
