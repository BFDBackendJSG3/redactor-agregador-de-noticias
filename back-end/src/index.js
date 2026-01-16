const { fetchRssNews } = require('../src/collectors/rss.colector');

async function test() {
  const news = await fetchRssNews();
  console.log(news.slice(0, 3));
}

test();
