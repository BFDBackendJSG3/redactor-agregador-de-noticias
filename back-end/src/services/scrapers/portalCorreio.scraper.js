const axios = require('axios');

async function extrairConteudoPortalCorreio(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    // 📰 Pega só a área do conteúdo da notícia
    const match = html.match(
      /<div class="entry-content[^>]*>([\s\S]*?)<\/div>/i
    );

    if (!match) return null;

    let conteudoHtml = match[1];

    // ❌ Remove scripts, estilos e figuras
    conteudoHtml = conteudoHtml
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<figure[\s\S]*?<\/figure>/gi, '');

    // ❌ Remove o rodapé padrão do Portal Correio
    conteudoHtml = conteudoHtml.replace(
      /O post .* apareceu primeiro em Portal Correio[\s\S]*/i,
      ''
    );

    // 🧼 Remove TODAS as tags HTML
    let textoLimpo = conteudoHtml.replace(/<[^>]+>/g, '');

    // 🧹 Remove entidades HTML (&nbsp; etc)
    textoLimpo = textoLimpo
      .replace(/&nbsp;/g, ' ')
      .replace(/&#8230;/g, '...')
      .replace(/&amp;/g, '&');

    return textoLimpo.trim();
  } catch (err) {
    console.error('Erro ao fazer scraping Portal Correio:', err.message);
    return null;
  }
}

module.exports = { extrairConteudoPortalCorreio };
