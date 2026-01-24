const { Router } = require('express');
const MunicipiosController = require('../controllers/municipios.controller');

const router = Router();

router.get('/municipios', MunicipiosController.listar);
router.get('/municipios/nome/:nome', MunicipiosController.buscarPorNome);

module.exports = router;
