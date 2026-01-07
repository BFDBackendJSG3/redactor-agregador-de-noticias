const { Router } = require('express');
const NoticiasController = require('../controllers/NoticiasController');

const router = Router();

router.get('/noticias', NoticiasController.listar);
router.get('/noticias/:id', NoticiasController.detalhar);
router.post('/noticias', NoticiasController.criar);
router.put('/noticias/:id', NoticiasController.atualizar);
router.delete('/noticias/:id', NoticiasController.deletar);


module.exports = router;
