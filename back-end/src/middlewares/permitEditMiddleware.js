const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //Dados do usuário logado a partir do auth.middleware.js
  const userIdAuth = req.userId;
  const userRole = req.userRole;

  //Id extraído da rota:
  const userIdRota = Number(req.params.id);

  //Se o user for admin pode editar qualquer perfil.
  if (userRole === 'admin') {
    return next();
  }

  //Se o user for o próprio dono do perfil pode editá-lo.
  if (userIdAuth === userIdAuth) {
    return next();
  }

  return res.status(403).json({
    message: 'Você não possui permissão para alterar esse perfil.',
  });
};
