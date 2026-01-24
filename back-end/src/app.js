const express = require('express');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

const noticiasRoutes = require('./routes/noticias.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const municipiosRoutes = require('./routes/municipios.routes');

app.use(noticiasRoutes);
app.use('/users', userRoutes);
app.use(authRoutes);
app.use(municipiosRoutes);

module.exports = app;
