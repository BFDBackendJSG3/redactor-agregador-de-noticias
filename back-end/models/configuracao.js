'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Configuracao extends Model {
    static associate(models) {
      // Configuração pode pertencer a um usuário
      Configuracao.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });
    }
  }
  Configuracao.init(
    {
      chave: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: DataTypes.STRING,
      usuarioId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Configuracao',
      tableName: 'Configuracoes',
    }
  );

  return Configuracao;
};
