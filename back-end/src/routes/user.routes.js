const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

const router = Router();

router.get('/', authMiddleware, isAdmin, UserController.listar);
router.get('/:id', authMiddleware, isAdmin, UserController.buscar);
router.post('/', authMiddleware, isAdmin, UserController.criar);
router.delete('/:id', authMiddleware, isAdmin, UserController.deletar);

// Usuários logados, User ou Admin
router.put('/:id', authMiddleware, UserController.atualizar);

module.exports = router;