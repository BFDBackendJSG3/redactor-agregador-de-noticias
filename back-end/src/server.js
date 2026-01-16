require('dotenv').config();

const app = require('./app');
const { sequelize } = require('../models');

const PORT = process.env.PORT || 3333;

sequelize
  .authenticate()
  .then(() => {
    console.log('Banco conectado com sucesso');
    require('./jobs/cron.job');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco:', err);
  });
