const UserService = require('../services/userService');

class UserController {
  static async listar(req, res) {
    try {
      const users = await UserService.listarTodos();
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async buscar(req, res) {
    try {
      const user = await UserService.buscarPorId(req.params.id);
      return res.json(user);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

  static async criar(req, res) {
    const { name, email, password, tipoUsuario } = req.body;

    if (!name || !email || !password || !tipoUsuario) {
      return res.status(400).json({
        error: 'Campos obrigatórios não preenchidos',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Senha deve ter no mínimo 6 caracteres',
      });
    }

    try {
      const user = await UserService.criar({
        name,
        email,
        password,
        tipoUsuario,
      });

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const user = await UserService.atualizar(req.params.id, req.body);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async deletar(req, res) {
    try {
      await UserService.deletar(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }
}

module.exports = UserController;
