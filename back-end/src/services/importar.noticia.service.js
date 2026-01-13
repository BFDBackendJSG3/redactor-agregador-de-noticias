const axios = require('axios');
const cheerio = require('cheerio');
const { Noticia, Fonte } = require('../../models');

module.exports = {
  async execute({ url, temaPrincipalId }) {
    // Faz o GET da página
    const response = await axios.get(url);
    const html = response.data;

    // Extrai dados básicos
    const $ = cheerio.load(html);

    const titulo = $('title').first().text();
    const conteudo = $('p')
      .map((i, el) => $(el).text())
      .get()
      .join('\n');

    // Busca ou cria a Fonte
    let fonte = await Fonte.findOne({ where: { url } });

    if (!fonte) {
      fonte = await Fonte.create({
        responsavel: 'Fonte externa',
        tipo: 'site',
        url,
        status: 'ativa',
      });
    }

    // Cria a Notícia
    const noticia = await Noticia.create({
      titulo,
      conteudo,
      url,
      status: 'rascunho',
      tipoNoticia: 'importada',
      fonteId: fonte.id,
      temaPrincipalId,
    });

    return noticia;
  },
};
