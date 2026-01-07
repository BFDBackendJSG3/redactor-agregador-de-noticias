const { Router } = require('express');
const NoticiasController = require('../controllers/NoticiasController');

const router = Router();

router.get('/noticias', NoticiasController.listar);
router.get('/noticias/:id', NoticiasController.detalhar);
router.post('/noticias', NoticiasController.criar);

module.exports = router;
