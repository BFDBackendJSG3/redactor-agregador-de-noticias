const { Router } = require('express');
const NoticiasController = require('../controllers/NoticiasController');

const router = Router();

router.get('/noticias', NoticiasController.index);

module.exports = router;
