const { Router } = require('express');
const NoticiasController = require('../controllers/NoticiasController');

const router = Router();

router.get('/noticias', NoticiasController.index);
router.get('/noticias/:id', NoticiasController.detalhe);

module.exports = router;
