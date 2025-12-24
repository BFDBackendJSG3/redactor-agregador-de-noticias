'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogAcesso extends Model {
    static associate(models) {
      LogAcesso.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'usuario'
      });
    }
  }
  LogAcesso.init({
    userId: DataTypes.INTEGER,
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userAgent: DataTypes.STRING,
    rota: DataTypes.STRING,
    metodo: DataTypes.STRING,
    dataAcesso: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'LogAcesso',
    tableName: 'LogAcessos'
  });

  return LogAcesso;
};