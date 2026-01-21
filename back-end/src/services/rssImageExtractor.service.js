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

  if (item.content) {
    const match = item.content.match(/<img[^>]+src="([^">]+)"/);
    if (match) return match[1];
  }

  return null;
}

module.exports = { extrairImagemRSS };
