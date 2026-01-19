const { Router } = require('express');
const NoticiasController = require('../controllers/noticias.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = Router();

router.get('/noticias', NoticiasController.listar);
router.get('/noticias/:id', NoticiasController.detalhar);
router.post(
    '/noticias',
    authMiddleware,
    roleMiddleware(['JORNALISTA', 'EDITOR', 'ADMIN']),
    NoticiasController.createManual
  );  
router.put('/noticias/:id', NoticiasController.atualizar);
router.delete('/noticias/:id', NoticiasController.deletar);

module.exports = router;
