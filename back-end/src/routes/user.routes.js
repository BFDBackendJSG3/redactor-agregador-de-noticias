const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = Router();

router.get('/', UserController.listar);
router.get('/:id', UserController.buscar);
router.post('/', UserController.criar);
router.put('/:id', UserController.atualizar);
router.delete('/:id', UserController.deletar);

module.exports = router;
