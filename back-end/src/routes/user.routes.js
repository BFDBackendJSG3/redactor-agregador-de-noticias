const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
<<<<<<< HEAD
const isAdmin = require('../middlewares/isAdmin.middleware');

const router = Router();

// Para usuário comum não listar nem deletar usuários, foram adicionados authMiddleware, isAdmin
// no router.get, router.post e router.delete
=======
const permitEditMiddleware = require('../middlewares/permitEditMiddleware');

const router = Router();

router.get('/', authMiddleware, UserController.listar);
router.get('/:id', UserController.buscar);
router.post('/', UserController.criar);
router.put('/:id', authMiddleware, permitEditMiddleware, UserController.atualizar);
router.delete('/:id', UserController.deletar);
>>>>>>> User-Camila

// Apenas Admin
router.get('/', authMiddleware, isAdmin, UserController.listar);
router.get('/:id', authMiddleware, isAdmin, UserController.buscar);
router.post('/', authMiddleware, isAdmin, UserController.criar);
router.delete('/:id', authMiddleware, isAdmin, UserController.deletar);

// Usuários logados, User ou Admin
router.put('/:id', authMiddleware, UserController.atualizar);

module.exports = router;