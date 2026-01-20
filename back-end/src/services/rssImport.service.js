const { Noticia, sequelize } = require('../../models');
const { classificarNoticia } = require('./noticiaClassificacao.service');

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

      const temaPrincipalId = classificarNoticia({
        titulo: item.title,
        conteudo: item.description || '',
      });

      await Noticia.create(
        {
          titulo: item.title,
          conteudo: item.description || '',
          url: item.link,
          dataDePublicacao: item.publishedAt
            ? new Date(item.publishedAt)
            : null,
          dataDeImportacao: new Date(),
          status: 'aguardando_aprovacao',
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
