const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Não autenticado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.userRole = decoded.tipoUsuario;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Sessão expirada' });
  }
};
