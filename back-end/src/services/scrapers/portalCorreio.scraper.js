const axios = require('axios');

async function extrairConteudoPortalCorreio(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    // 🧠 Tenta vários padrões possíveis do site
    const patterns = [
      /<div class="entry-content[^>]*>([\s\S]*?)<\/div>/i,
      /<div class="td-post-content[^>]*>([\s\S]*?)<\/div>/i,
      /<article[\s\S]*?<div class="td-post-content[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/article>/i,
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

    // ❌ Remove scripts, estilos, figuras, iframes
    conteudoHtml = conteudoHtml
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<figure[\s\S]*?<\/figure>/gi, '')
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

    // ❌ Remove rodapé padrão
    conteudoHtml = conteudoHtml.replace(
      /O post .* apareceu primeiro em Portal Correio[\s\S]*/i,
      ''
    );

    // 🧼 Remove todas as tags HTML
    let textoLimpo = conteudoHtml.replace(/<[^>]+>/g, ' ');

    // 🧹 Remove entidades HTML
    textoLimpo = textoLimpo
      .replace(/&nbsp;/g, ' ')
      .replace(/&#8230;/g, '...')
      .replace(/&amp;/g, '&');

    // ✨ Remove espaços duplicados e linhas vazias gigantes
    textoLimpo = textoLimpo.replace(/\s{2,}/g, ' ').trim();

    return textoLimpo;
  } catch (err) {
    console.error('Erro ao fazer scraping Portal Correio:', err.message);
    return null;
  }
}

module.exports = { extrairConteudoPortalCorreio };
