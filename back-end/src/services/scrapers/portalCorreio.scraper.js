const axios = require('axios');

async function extrairConteudoPortalCorreio(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    // Pega TODOS os blocos candidatos de conteúdo
    const matches = [
      ...html.matchAll(
        /<div class="tdb-block-inner td-fix-index">([\s\S]*?)<\/div>/gi
      ),
      ...html.matchAll(/<div class="td-post-content[^>]*>([\s\S]*?)<\/div>/gi),
      ...html.matchAll(/<div class="entry-content[^>]*>([\s\S]*?)<\/div>/gi),
    ];

    if (!matches.length) return null;

    // Escolhe o MAIOR bloco de texto (normalmente é a matéria)
    let maiorBloco = matches
      .map((m) => m[1])
      .sort((a, b) => b.length - a.length)[0];

    // Remove lixos
    maiorBloco = maiorBloco
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<figure[\s\S]*?<\/figure>/gi, '')
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

    // Remove HTML
    let textoLimpo = maiorBloco.replace(/<[^>]+>/g, ' ');

    // Remove entidades
    textoLimpo = textoLimpo
      .replace(/&nbsp;/g, ' ')
      .replace(/&#8230;/g, '...')
      .replace(/&amp;/g, '&');

    // Normaliza espaços
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
