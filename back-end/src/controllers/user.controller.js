const UserService = require('../services/user.service');

class UserController {
  static async listar(req, res) {
    try {
      const usuarios = await UserService.listarTodos();
      return res.json(usuarios);
    } catch (err) {
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  }

  static async buscar(req, res) {
    try {
      const usuario = await UserService.buscarPorId(req.params.id);
      return res.json(usuario);
    } catch (err) {
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  }

  static async criar(req, res) {
    try {
      const usuario = await UserService.criar(req.body);
      return res.status(201).json(usuario);
    } catch (err) {
      return res.status(err.statusCode || 400).json({ message: err.message });
    }
  }

  static async criarPublico(req, res) {
    try {
      const usuario = await UserService.criar({
        ...req.body,
        tipoUsuario: 'USER',
      });
      return res.status(201).json(usuario);
    } catch (err) {
      return res.status(err.statusCode || 400).json({ message: err.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const usuario = await UserService.atualizar(req.params.id, req.body);
      return res.json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario,
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({ message: err.message });
    }
  }

  static async deletar(req, res) {
    try {
      await UserService.deletar(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return res.status(err.statusCode || 400).json({ message: err.message });
    }
  }
}

module.exports = UserController;
