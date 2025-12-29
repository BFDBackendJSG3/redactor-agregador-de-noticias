const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  async login(email, password) {
    // buscar usuário pelo email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Email ou senha inválidos');
    }
    // Comparar senha digitada com o hash do banco
    const senhaValida = await bcrypt.compare(password, user.passwordHash);

    if (!senhaValida) {
      throw new Error('Email ou senha inválidos');
    }

    // Gerar JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        tipoUsuario: user.tipoUsuario,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      }
    );
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tipoUsuario: user.tipoUsuario,
      },
    };
  }
}

module.exports = new AuthService();
