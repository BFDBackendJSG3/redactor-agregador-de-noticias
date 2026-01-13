const express = require('express');
const AuthController = require('../controllers/auth.controller');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', UserController.criarPublico);

module.exports = router;
