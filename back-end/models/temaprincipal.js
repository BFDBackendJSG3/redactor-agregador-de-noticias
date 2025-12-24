'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TemaPrincipal extends Model {
    static associate(models) {
      // Um tema pode ter vários subtemas
      TemaPrincipal.hasMany(models.TemaPrincipal, {
        foreignKey: 'parentId',
        as: 'subtemas'
      });

      // Um subtema pertence a um tema pai
      TemaPrincipal.belongsTo(models.TemaPrincipal, {
        foreignKey: 'parentId',
        as: 'temaPai'
      });
    }
  }

  TemaPrincipal.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    parentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TemaPrincipal',
    tableName: 'TemasPrincipais'
  });
  
  return TemaPrincipal;
};