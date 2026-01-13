const { Usuario } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../errors/AppError');

class AuthService {
  async login(email, password) {
    if (!email || !password) {
      throw new AppError('Email e senha são obrigatórios', 400);
    }

    // buscar usuário pelo email
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Email ou senha inválidos', 401);
    }

    if (!user.isActive) {
      throw new AppError('Usuário desativado', 403);
    }
    // Comparar senha digitada com o hash do banco
    const senhaValida = await bcrypt.compare(password, user.passwordHash);

    if (!senhaValida) {
      throw new AppError('Email ou senha inválidos', 401);
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
        nome: user.nome,
        email: user.email,
        tipoUsuario: user.tipoUsuario,
      },
    };
  }
}

module.exports = new AuthService();
