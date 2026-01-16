const axios = require('axios');
const Parser = require('rss-parser');
const { importarRSS } = require('../services/rssImport.service');
const { Fonte } = require('../../models');

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

    const itens = feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      description: item.contentSnippet || '',
      publishedAt: item.isoDate || item.pubDate,
    }));

    await importarRSS({
      itens,
      fonteId: fonte.id,
      temaPrincipalId: 1, // Geral
    });
  }

  console.log('🎉 Importação de RSS finalizada');
}


module.exports = { executarImportacao };
