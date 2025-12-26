const express = require('express');
const app = express();

app.use(express.json());

const importacaoRoutes = require('./routes/importacao.routes');
const noticiasRoutes = require('./routes/noticias.routes');

app.use(importacaoRoutes);
app.use(noticiasRoutes);

module.exports = app;
