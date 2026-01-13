const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register); // Cadastro público

module.exports = router;
