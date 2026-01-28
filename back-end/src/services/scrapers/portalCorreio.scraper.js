const axios = require('axios');

async function extrairConteudoPortalCorreio(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    const patterns = [
      /<div class="tdb-block-inner td-fix-index">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i,
      /<div class="td-post-content[^>]*>([\s\S]*?)<\/div>/i,
      /<div class="entry-content[^>]*>([\s\S]*?)<\/div>/i,
    ];

    let conteudoHtml = null;

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        conteudoHtml = match[1];
        break;
      }
    }

    if (!conteudoHtml) return null;

    conteudoHtml = conteudoHtml
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<figure[\s\S]*?<\/figure>/gi, '')
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

    let textoLimpo = conteudoHtml.replace(/<[^>]+>/g, ' ');

    textoLimpo = textoLimpo
      .replace(/&nbsp;/g, ' ')
      .replace(/&#8230;/g, '...')
      .replace(/&amp;/g, '&');

    textoLimpo = textoLimpo
      .replace(/\s{2,}/g, ' ')
      .replace(/\n{2,}/g, '\n')
      .trim();

    return textoLimpo;
  } catch (err) {
    console.error('Erro ao fazer scraping Portal Correio:', err.message);
    return null;
  }
}

module.exports = { extrairConteudoPortalCorreio };
