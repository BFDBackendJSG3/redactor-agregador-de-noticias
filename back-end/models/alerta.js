'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Alerta extends Model {
    static associate(models) {
      // Alerta pertence a um usuário
      Alerta.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });

      // Alerta pode estar ligado a um tema
      Alerta.belongsTo(models.TemaPrincipal, {
        foreignKey: 'temaPrincipalId',
        as: 'temaPrincipal',
      });

      // Alerta pode estar ligado a um município
      Alerta.belongsTo(models.Municipio, {
        foreignKey: 'municipioId',
        as: 'municipio',
      });
    }
  }
  Alerta.init(
    {
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      temaPrincipalId: DataTypes.INTEGER,
      municipioId: DataTypes.INTEGER,
      palavraChave: DataTypes.STRING,
      ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Alerta',
      tableName: 'Alertas',
    }
  );

  return Alerta;
};
