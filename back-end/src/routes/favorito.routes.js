const express = require('express');
const controller = require('../controllers/favorito.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', auth, controller.listar);
router.post('/toggle', auth, controller.toggle);

module.exports = router;
