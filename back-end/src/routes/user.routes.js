const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const permitEditMiddleware = require('../middlewares/permitEditMiddleware');

const router = Router();

router.get('/', authMiddleware, UserController.listar);
router.get('/:id', UserController.buscar);
router.post('/', UserController.criar);
router.put('/:id', authMiddleware, permitEditMiddleware, UserController.atualizar);
router.delete('/:id', UserController.deletar);

module.exports = router;
