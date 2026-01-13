const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');
const permitEditMiddleware = require('../middlewares/permitEditMiddleware');

const router = Router();

// Cadastro público (visitantes)
router.post('/', UserController.criar);

// Apenas ADMIN
router.get('/', authMiddleware, isAdmin, UserController.listar);
router.get('/:id', authMiddleware, isAdmin, UserController.buscar);
router.delete('/:id', authMiddleware, isAdmin, UserController.deletar);

// Editar perfil (ADMIN ou dono do perfil)
router.put(
  '/:id',
  authMiddleware,
  permitEditMiddleware,
  UserController.atualizar
);

module.exports = router;
