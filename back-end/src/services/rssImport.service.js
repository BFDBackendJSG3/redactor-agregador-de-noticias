const { Noticia } = require('../../models');

async function importarRSS({ itens, fonteId, temaPrincipalId }) {
  console.log(
    `📥 Iniciando importação: ${itens.length} itens | fonteId=${fonteId} | tema=${temaPrincipalId}`
  );

  let salvas = 0;
  let duplicadas = 0;

  for (const item of itens) {
    // Verifica duplicidade pela URL
    const existe = await Noticia.findOne({
      where: { url: item.link },
    });

    if (existe) {
      duplicadas++;
      console.log(`🔁 Duplicada ignorada: ${item.link}`);
      continue;
    }

    await Noticia.create({
      titulo: item.title,
      conteudo: item.description || '',
      url: item.link,
      dataDePublicacao: item.publishedAt ? new Date(item.publishedAt) : null,
      dataDeImportacao: new Date(),
      status: 'publicado',
      tipoNoticia: 'importada',
      fonteId,
      temaPrincipalId,
    });

    salvas++;
    console.log(`📰 Notícia salva: ${item.title}`);
  }

  console.log(
    `✅ Importação finalizada | Salvas: ${salvas} | Duplicadas: ${duplicadas}`
  );
}

module.exports = { importarRSS };
