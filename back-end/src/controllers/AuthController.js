const authService = require('../services/AuthServices');
const UserService = require('../services/user.service');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: 'Email e senha são obrigatórios',
        });
      }

      const result = await authService.login(email, password);

      return res.json(result);
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }

  async register(req, res) {
    try {
      const { nome, email, password } = req.body;

      if (!nome || !email || !password) {
        return res.status(400).json({
          message: 'Nome, email e senha são obrigatórios',
        });
      }

      const usuario = await UserService.criar({
        nome,
        email,
        password,
        tipoUsuario: 'USER', // 🔒 FORÇA USER
      });
      // Alterado para definir o que retorna, assim evita vazamentos
      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipoUsuario: usuario.tipoUsuario,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
