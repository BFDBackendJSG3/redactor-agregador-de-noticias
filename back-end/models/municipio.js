'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Municipio extends Model {
    static associate(models) {
      // define association here
    }
  }

  Municipio.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Municipio',
    tableName: 'Municipios'
  });
  
  return Municipio;
};