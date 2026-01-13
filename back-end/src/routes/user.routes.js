const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');
const permitEditMiddleware = require('../middlewares/permitEditMiddleware');

const router = Router();

// Para usuário comum não listar nem deletar usuários, foram adicionados authMiddleware, isAdmin
// no router.get, router.post e router.delete
router.get('/', authMiddleware, UserController.listar);
router.get('/:id', UserController.buscar);
router.post('/', UserController.criar);
router.delete('/:id', UserController.deletar);

// Apenas Admin
router.get('/', authMiddleware, isAdmin, UserController.listar);
router.get('/:id', authMiddleware, isAdmin, UserController.buscar);
router.post('/', authMiddleware, isAdmin, UserController.criar);
router.delete('/:id', authMiddleware, isAdmin, UserController.deletar);

// Para atualizar perfil apenas Admin ou dono do perfil podem executar
// Essa ação. Para isso foi criado authMiddleware e permitEditMiddleware.
router.put(
  '/:id',
  authMiddleware,
  permitEditMiddleware,
  UserController.atualizar
);

module.exports = router;
