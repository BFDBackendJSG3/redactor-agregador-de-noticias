module.exports = (req, res, next) => {
  const userIdAuth = req.userId;
  const userRole = req.userRole;
  const userIdRota = Number(req.params.id);

  // Admin pode editar qualquer um
  if (userRole === 'ADMIN') {
    return next();
  }

  // Usuário só pode editar o próprio perfil
  if (userIdAuth === userIdRota) {
    return next();
  }

  return res.status(403).json({
    message: 'Você não possui permissão para alterar esse perfil.',
  });
};