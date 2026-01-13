const { Usuario } = require('../../models');
const bcrypt = require('bcryptjs');
const AppError = require('../errors/AppError');

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
      throw new AppError('Usuário não encontrado', 404);
    }

    return usuario;
  }

  static async criar({ nome, email, password, tipoUsuario }) {
    if (!nome || !email || !password) {
      throw new AppError('Nome, email e senha são obrigatórios');
    }

    if (password.length < 6) {
      throw new AppError('Senha deve ter no mínimo 6 caracteres');
    }

    const emailExiste = await Usuario.findOne({
      where: { email },
    });

    if (emailExiste) {
      throw new AppError('Email já cadastrado');
    }

    const passwordHash = await bcrypt.hash(password, 8);

    return Usuario.create({
      nome,
      email,
      passwordHash,
      tipoUsuario: tipoUsuario || 'USER',
      isActive: true,
    });
  }

  static async atualizar(id, dados) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const dadosUpdate = {};

    // Nome
    if (dados.nome && dados.nome.trim() !== '') {
      dadosUpdate.nome = dados.nome;
    }

    // Email (com verificação)
    if (dados.email && dados.email.trim() !== '') {
      const emailEmUso = await Usuario.findOne({
        where: { email: dados.email },
      });

      if (emailEmUso && emailEmUso.id !== usuario.id) {
        throw new AppError('Email já está em uso');
      }

      dadosUpdate.email = dados.email;
    }

    // Senha
    if (dados.password && dados.password.trim() !== '') {
      dadosUpdate.passwordHash = await bcrypt.hash(dados.password, 8);
    }

    // Só atualiza se tiver algo para atualizar
    if (Object.keys(dadosUpdate).length === 0) {
      throw new AppError('Nenhum dado para atualizar');
    }

    await usuario.update(dadosUpdate);

    return usuario;
  }

  static async deletar(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new AppError('Usuário não encontrado', 404);
    }

    await usuario.destroy();
  }
}

module.exports = UserService;
