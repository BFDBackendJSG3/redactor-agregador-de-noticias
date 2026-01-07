'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LogDeAcao extends Model {
    static associate(models) {
      LogDeAcao.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });
    }
  }
  LogDeAcao.init(
    {
      usuarioId: DataTypes.INTEGER,
      acao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entidade: {
        type: DataTypes.STRING,
      },
      entidadeId: DataTypes.INTEGER,
      descricao: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'LogDeAcao',
      tableName: 'LogDeAcoes',
    }
  );

  return LogDeAcao;
};
