const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const permitEditMiddleware = require('../middlewares/permitEditMiddleware');

const router = Router();

router.get('/', authMiddleware, UserController.listar);
router.get('/:id', UserController.buscar);
router.post('/', UserController.criar);
router.put(
  '/:id',
  authMiddleware,
  permitEditMiddleware,
  UserController.atualizar
);
router.delete('/:id', UserController.deletar);

// Apenas Admin
router.get('/', authMiddleware, isAdmin, UserController.listar);
router.get('/:id', authMiddleware, isAdmin, UserController.buscar);
router.post('/', authMiddleware, isAdmin, UserController.criar);
router.delete('/:id', authMiddleware, isAdmin, UserController.deletar);

// Usuários logados, User ou Admin
router.put('/:id', authMiddleware, UserController.atualizar);

module.exports = router;
