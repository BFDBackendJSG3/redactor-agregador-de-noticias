module.exports = (rolesPermitidos = []) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.userRole)) {
      return res.status(403).json({
        message: 'Você não tem permissão para realizar esta ação',
      });
    }
    next();
  };
};
