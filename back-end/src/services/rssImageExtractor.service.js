function extrairImagemRSS(item) {
  if (item.enclosure?.url) {
    return item.enclosure.url;
  }

  if (item['media:content']?.url) {
    return item['media:content'].url;
  }

  if (item.itunes?.image) {
    return item.itunes.image;
  }

  const html =
    item['content:encoded'] || item.content || item.contentSnippet || '';

  if (html) {
    const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    if (match) {
      return match[1];
    }
  }

  return null;
}

module.exports = { extrairImagemRSS };
