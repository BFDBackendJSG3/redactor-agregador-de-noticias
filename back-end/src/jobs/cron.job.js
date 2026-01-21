const cron = require('node-cron');
const { executarImportacao } = require('./importarRSS.job');

const CRON_TIME = process.env.CRON_RSS || '0 */3 * * *';

cron.schedule(CRON_TIME, async () => {
  try {
    await executarImportacao();
  } catch (err) {
    console.error('❌ Erro no cron RSS:', err.message);
  }
});
