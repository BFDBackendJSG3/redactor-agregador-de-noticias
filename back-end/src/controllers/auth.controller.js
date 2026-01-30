const authService = require('../services/auth.service');

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

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: false,
        semeSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({
        user: result.user,
      });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: 'Credenciais inválidas',
      });
    }
  }

  async logout(req, res) {
    res.clearCookie('token');
    return res.json({ message: 'Logout realizado' });
  }
}

module.exports = new AuthController();
