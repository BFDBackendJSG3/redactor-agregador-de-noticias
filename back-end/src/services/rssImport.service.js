const { Noticia, sequelize } = require('../../models');
const { classificarNoticia } = require('./noticiaClassificacao.service');

function normalizarEspacos(texto) {
  return texto
    .replace(/\r/g, '')
    .replace(/\t/g, ' ')
    .replace(/[\u00A0]/g, ' ') // remove &nbsp; invisível
    .replace(/ +/g, ' ') // múltiplos espaços → 1
    .replace(/ *\n */g, '\n') // remove espaços ao redor de quebras
    .replace(/\n{2,}/g, '\n') // várias linhas vazias → 1
    .trim();
}

function limparHtmlBasico(texto) {
  return texto
    .replace(/<img[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8230;/g, '...')
    .replace(/&amp;/g, '&');
}

async function importarRSS({ itens, fonteId }) {
  console.log(
    `📥 Iniciando importação: ${itens.length} itens | fonteId=${fonteId}`
  );

  let salvas = 0;
  let duplicadas = 0;
  let erros = 0;

  for (const item of itens) {
    const transaction = await sequelize.transaction();

    try {
      const existe = await Noticia.findOne({
        where: { url: item.link },
        transaction,
      });

      if (existe) {
        duplicadas++;
        await transaction.rollback();
        continue;
      }

      let conteudo = item.description || '';

      if (conteudo.includes('<')) {
        conteudo = limparHtmlBasico(conteudo);
      }

      conteudo = normalizarEspacos(conteudo);

      const temaPrincipalId = classificarNoticia({
        titulo: item.title,
        conteudo,
      });

      await Noticia.create(
        {
          titulo: item.title,
          conteudo,
          url: item.link,
          imagemUrl: item.imagemUrl,
          dataDePublicacao: item.publishedAt
            ? new Date(item.publishedAt)
            : null,
          dataDeImportacao: new Date(),
          status: 'aguardando_revisao',
          tipoNoticia: 'importada',
          fonteId,
          temaPrincipalId,
        },
        { transaction }
      );

      await transaction.commit();

      console.log({
        level: 'info',
        action: 'rss_import',
        fonteId,
        titulo: item.title,
        url: item.link,
      });

      salvas++;
    } catch (err) {
      await transaction.rollback();
      erros++;

      console.error({
        level: 'error',
        action: 'rss_import_failed',
        fonteId,
        url: item.link,
        error: err.message,
      });
    }
  }

  console.log(
    `✅ Importação finalizada | Salvas: ${salvas} | Duplicadas: ${duplicadas} | Erros: ${erros}`
  );
}

module.exports = { importarRSS };
