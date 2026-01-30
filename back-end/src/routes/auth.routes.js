const express = require('express');
const AuthController = require('../controllers/auth.controller');
const UserController = require('../controllers/user.controller');
const rateLimit = require('express-rate-limit');

const loginlimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Muitas tentativas de login, tente novamente em 15 minutos',
  },
});

const router = express.Router();

router.post('/login', loginlimiter, AuthController.login);
router.post('/register', UserController.criarPublico);
router.post('/logout', AuthController.logout);

module.exports = router;
