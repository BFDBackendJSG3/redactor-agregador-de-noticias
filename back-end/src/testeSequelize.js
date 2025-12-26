const db = require('../models/');

async function main() {
  try {
    // testa conexão
    await db.sequelize.authenticate();
    console.log('Conectado ao banco com sucesso');

    // busca todos os usuários
    const users = await db.User.findAll();
    console.log('Usuários encontrados:');
    console.log(users);
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  } finally {
    // fecha conexão
    await db.sequelize.close();
    console.log('Conexão encerrada');
  }
}

main();
