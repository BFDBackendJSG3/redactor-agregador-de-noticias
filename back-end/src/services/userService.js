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

    if (dados.email) {
      const emailEmUso = await Usuario.findOne({
        where: { email: dados.email },
      });

      if (emailEmUso && emailEmUso.id !== usuario.id) {
        throw new Error('Email já está em uso');
      }
    }

    if (dados.password) {
      dados.passwordHash = await bcrypt.hash(dados.password, 8);
      delete dados.password;
    }

    await usuario.update(dados);

    return usuario;
  }

  static async deletar(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    await usuario.destroy();
  }
}

module.exports = UserService;