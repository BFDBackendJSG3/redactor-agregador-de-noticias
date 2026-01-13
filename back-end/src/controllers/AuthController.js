const authService = require('../services/AuthServices');

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
}

module.exports = new AuthController();