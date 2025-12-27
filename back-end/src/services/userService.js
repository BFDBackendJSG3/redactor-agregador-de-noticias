const { User } = require('../../models');
const bcrypt = require('bcryptjs');

class UserService {
  static async listarTodos() {
    return User.findAll({
      attributes: { exclude: ['passwordHash'] },
    });
  }

  static async buscarPorId(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['passwordHash'] },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  static async criar(dados) {
    const emailExiste = await User.findOne({
      where: { email: dados.email },
    });

    if (emailExiste) {
      throw new Error('Email já cadastrado');
    }

    const passwordHash = await bcrypt.hash(dados.password, 8);

    return User.create({
      name: dados.name,
      email: dados.email,
      passwordHash,
      tipoUsuario: dados.tipoUsuario,
      isActive: true,
    });
  }

  static async atualizar(id, dados) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuário não encontrado');

    if (dados.email) {
      const emailEmUso = await User.findOne({
        where: { email: dados.email },
      });

      if (emailEmUso && emailEmUso.id !== user.id) {
        throw new Error('Email já está em uso');
      }
    }

    if (dados.password) {
      dados.passwordHash = await bcrypt.hash(dados.password, 8);
      delete dados.password;
    }

    await user.update(dados);

    return user;
  }

  static async deletar(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuário não encontrado');

    await user.destroy();
  }
}

module.exports = UserService;
