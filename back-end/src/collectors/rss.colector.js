// src/collectors/rss.collector.js
const Parser = require('rss-parser');
const { rssSources } = require('../../config/rssSources');

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (News Aggregator)',
  },
});

async function fetchRssNews() {
  const allNews = [];

  for (const source of rssSources) {
    console.log(`\n📡 Fonte: ${source.name}`);
    console.log(`🔗 URL: ${source.url}`);

    const feed = await parser.parseURL(source.url);

    console.log(`📰 Itens encontrados: ${feed.items.length}`);

    for (const item of feed.items) {
      allNews.push({
        title: item.title,
        link: item.link,
        description: item.contentSnippet || '',
        publishedAt: item.pubDate ? new Date(item.pubDate) : null,
        source: source.name,
      });
    }
  }

  return allNews;
}

module.exports = { fetchRssNews };
