const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', authMiddleware, UserController.listar);
router.get('/:id', UserController.buscar);
router.post('/', UserController.criar);
router.put('/:id', UserController.atualizar);
router.delete('/:id', UserController.deletar);

module.exports = router;
