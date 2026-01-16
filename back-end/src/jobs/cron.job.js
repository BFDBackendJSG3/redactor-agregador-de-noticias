const cron = require('node-cron');
const { executarImportacao } = require('./importarRSS.job');

cron.schedule('* * * * *', async () => {
  try {
    await executarImportacao();
  } catch (err) {
    console.error('❌ Erro no cron RSS:', err.message);
  }
});
