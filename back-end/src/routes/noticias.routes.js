const { Router } = require('express');
const NoticiasController = require('../controllers/noticias.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const optionalAuth = require('../middlewares/optionalAuth.middleware');

const router = Router();

//precisei criar o optionalAuth para retornar se a noticia foi marcada como favorito
//garante Não está revelando favoritos de ninguém
router.get('/noticias', optionalAuth, NoticiasController.listar);

router.get('/noticias/virais', NoticiasController.listarMaisVirais);

router.get(
  '/noticias/admin',
  authMiddleware,
  roleMiddleware(['JORNALISTA', 'EDITOR', 'ADMIN']),
  NoticiasController.listarAdmin
);

router.get('/noticias/tema/:temaId', NoticiasController.listarPorTema);
router.get('/noticia/:id', NoticiasController.detalhar);

router.post('/noticias/:id/clique', NoticiasController.registrarClique);

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
