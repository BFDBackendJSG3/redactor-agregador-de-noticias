const { Noticia, sequelize } = require('../../models');
const { classificarNoticia } = require('./noticiaClassificacao.service');

async function importarRSS({ itens, fonteId }) {
  console.log(
    `📥 Iniciando importação: ${itens.length} itens | fonteId=${fonteId}`
  );

  const transaction = await sequelize.transaction();

  let salvas = 0;
  let duplicadas = 0;

  try {
    for (const item of itens) {
      // Verifica duplicidade pela URL
      const existe = await Noticia.findOne({
        where: { url: item.link },
        transaction,
      });

      if (existe) {
        duplicadas++;
        console.log(`🔁 Duplicada ignorada: ${item.link}`);
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

      salvas++;
    }

    await transaction.commit();

    console.log(
      `✅ Importação concluída | Salvas: ${salvas} | Duplicadas: ${duplicadas}`
    );
  } catch (err) {
    await transaction.rollback();
    console.error('❌ Erro ao importar RSS:', err);
    throw err;
  }
}

module.exports = { importarRSS };
