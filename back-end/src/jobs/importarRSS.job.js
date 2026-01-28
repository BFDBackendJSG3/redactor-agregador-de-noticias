const axios = require('axios');
const Parser = require('rss-parser');
const { importarRSS } = require('../services/rssImport.service');
const { extrairImagemRSS } = require('../services/rssImageExtractor.service');
const { Fonte } = require('../../models');
const {
  extrairConteudoPortalCorreio,
} = require('../services/scrapers/portalCorreio.scraper');

const parser = new Parser();

async function executarImportacao() {
  console.log('⏳ Iniciando importação de RSS...');

  const fontes = await Fonte.findAll({
    where: { status: 'ativa', tipo: 'rss' },
  });

  console.log(`📦 Fontes encontradas: ${fontes.length}`);

  for (const fonte of fontes) {
    console.log(`📡 Processando fonte ID=${fonte.id}`);
    console.log(`🔗 URL: ${fonte.url}`);

    const feed = await parser.parseURL(fonte.url);

    const itens = [];

    for (const item of feed.items) {
      let conteudo = item.contentSnippet || item.content || '';

      // 🕷️ REGRA ESPECIAL: Portal Correio precisa de scraping
      if (fonte.url.includes('portalcorreio')) {
        const conteudoCompleto = await extrairConteudoPortalCorreio(item.link);

        if (conteudoCompleto) {
          conteudo = conteudoCompleto;
          console.log(
            '🕷 Conteúdo completo extraído via scraping (Portal Correio)'
          );
        } else {
          console.log(
            '⚠️ Não foi possível extrair conteúdo completo, usando RSS'
          );
        }
      }

      itens.push({
        title: item.title,
        link: item.link,
        description: conteudo,
        publishedAt: item.isoDate || item.pubDate,
        imagemUrl: extrairImagemRSS(item),
      });
    }

    await importarRSS({
      itens,
      fonteId: fonte.id,
    });
  }

  console.log('🎉 Importação de RSS finalizada');
}

module.exports = { executarImportacao };
