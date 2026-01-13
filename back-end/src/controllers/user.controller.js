const UserService = require('../services/userService');

class UserController {
  static async listar(req, res) {
    try {
      const usuarios = await UserService.listarTodos();
      return res.json(usuarios);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async buscar(req, res) {
    try {
      const usuario = await UserService.buscarPorId(req.params.id);
      return res.json(usuario);
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  }

  static async criar(req, res) {
    const { nome, email, password, tipoUsuario } = req.body;

    if (!nome || !email || !password) {
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
      const usuario = await UserService.criar({
        nome,
        email,
        password,
        tipoUsuario,
      });

      return res.status(201).json(usuario);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async criarPublico(req, res) {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).json({ message: 'Dados obrigatórios' });
    }

    try {
      const usuario = await UserService.criar({
        nome,
        email,
        password,
        tipoUsuario: 'USER',
      });

      return res.status(201).json(usuario);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const usuario = await UserService.atualizar(req.params.id, req.body);

      return res.status(200).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario,
      });
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err.message);
      return res.status(400).json({ message: err.message });
    }
  }

  static async deletar(req, res) {
    try {
      await UserService.deletar(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  }
}

module.exports = UserController;
