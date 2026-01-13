const { Usuario } = require('../../models');
const bcrypt = require('bcryptjs');

class UserService {
  static async listarTodos() {
    return Usuario.findAll({
      attributes: { exclude: ['passwordHash'] },
    });
  }

  static async buscarPorId(id) {
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['passwordHash'] },
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    return usuario;
  }

  static async criar(dados) {
    const emailExiste = await Usuario.findOne({
      where: { email: dados.email },
    });

    if (emailExiste) {
      throw new Error('Email já cadastrado');
    }

    const passwordHash = await bcrypt.hash(dados.password, 8);

    return Usuario.create({
      nome: dados.nome,
      email: dados.email,
      passwordHash,
      tipoUsuario: dados.tipoUsuario || 'USER',
      isActive: true,
    });
  }

  static async atualizar(id, dados) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    const dadosUpdate = {};

    // Nome
    if (dados.nome) {
      dadosUpdate.nome = dados.nome;
    }

    // Email (com verificação)
    if (dados.email) {
      const emailEmUso = await Usuario.findOne({
        where: { email: dados.email },
      });

      if (emailEmUso && emailEmUso.id !== usuario.id) {
        throw new Error('Email já está em uso');
      }

      dadosUpdate.email = dados.email;
    }

    // Senha
    if (dados.password && dados.password.trim() !== '') {
      dadosUpdate.passwordHash = await bcrypt.hash(dados.password, 8);
    }

    // Só atualiza se tiver algo para atualizar
    if (Object.keys(dadosUpdate).length === 0) {
      throw new Error('Nenhum dado para atualizar');
    }

    await usuario.update(dadosUpdate);

    return usuario;
  }

  static async deletar(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    await usuario.destroy();
  }
}

module.exports = UserService;
