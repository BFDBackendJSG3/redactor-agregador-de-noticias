const { Noticia, Fonte, TemaPrincipal } = require('../../models');

module.exports = {
  async execute({ titulo, conteudo, status, fonteId, temaPrincipalId }) {
    if (!titulo || !conteudo || !fonteId || !temaPrincipalId) {
      throw new Error('Campos obrigatórios não informados');
    }

    // valida Fonte
    const fonte = await Fonte.findByPk(fonteId);
    if (!fonte) {
      throw new Error('Fonte não encontrada');
    }

    // valida Tema
    const tema = await TemaPrincipal.findByPk(temaPrincipalId);
    if (!tema) {
      throw new Error('Tema principal não encontrado');
    }

    const noticia = await Noticia.create({
      titulo,
      conteudo,
      status: status || 'rascunho',
      tipoNoticia: 'criada',
      fonteId,
      temaPrincipalId,
    });

    return noticia;
  },
};
