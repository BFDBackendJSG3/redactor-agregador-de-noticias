const axios = require('axios');

async function extrairConteudoPortalCorreio(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    // 🎯 Pega especificamente o bloco onde ficam os parágrafos da matéria
    const match = html.match(/<div class="bloco-texto[^>]*>([\s\S]*?)<\/div>/i);

    if (!match) {
      console.log('❌ Bloco de conteúdo não encontrado no Portal Correio');
      return null;
    }

    let conteudoHtml = match[1];

    // ❌ Remove scripts, estilos, figuras, iframes
    conteudoHtml = conteudoHtml
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<figure[\s\S]*?<\/figure>/gi, '')
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

    // ❌ Remove o rodapé automático do site
    conteudoHtml = conteudoHtml.replace(
      /O post .* apareceu primeiro em Portal Correio[\s\S]*/i,
      ''
    );

    // 🧼 Mantém quebras de parágrafo
    conteudoHtml = conteudoHtml
      .replace(/<\/p>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n');

    // 🧽 Remove todas as outras tags HTML
    let textoLimpo = conteudoHtml.replace(/<[^>]+>/g, ' ');

    // 🧹 Limpa entidades e espaços duplicados
    textoLimpo = textoLimpo
      .replace(/&nbsp;/g, ' ')
      .replace(/&#8230;/g, '...')
      .replace(/&amp;/g, '&')
      .replace(/\n{2,}/g, '\n')
      .replace(/\s{2,}/g, ' ')
      .trim();

    console.log('🕷 Conteúdo completo extraído do Portal Correio');
    return textoLimpo;
  } catch (err) {
    console.error('Erro ao fazer scraping Portal Correio:', err.message);
    return null;
  }
}

module.exports = { extrairConteudoPortalCorreio };
