const express = require('express');
const controller = require('../controllers/favorito.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', auth, controller.favoritar);
router.delete('/:noticiaId', auth, controller.desfavoritar);
router.get('/', auth, controller.listar);

module.exports = router;
