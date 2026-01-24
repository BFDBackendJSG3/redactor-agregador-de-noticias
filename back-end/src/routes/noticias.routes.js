const { Router } = require('express');
const NoticiasController = require('../controllers/noticias.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = Router();

router.get('/noticias', NoticiasController.listar);

router.get(
  '/noticias/admin',
  authMiddleware,
  roleMiddleware(['JORNALISTA', 'EDITOR', 'ADMIN']),
  NoticiasController.listarAdmin
);

router.get('/noticias/tema/:temaId', NoticiasController.listarPorTema);
router.get('/noticia/:id', NoticiasController.detalhar);

router.post(
  '/noticias',
  authMiddleware,
  roleMiddleware(['JORNALISTA', 'EDITOR', 'ADMIN']),
  NoticiasController.criarManual
);

router.put(
  '/noticias/:id',
  authMiddleware,
  roleMiddleware(['EDITOR', 'ADMIN', 'JORNALISTA']),
  NoticiasController.atualizar
);

router.delete(
  '/noticias/:id',
  authMiddleware,
  roleMiddleware(['JORNALISTA', 'EDITOR', 'ADMIN']),
  NoticiasController.deletar
);

module.exports = router;
