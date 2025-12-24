'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NoticiaMunicipio extends Model {
    static associate(models) {
      // define association here
    }
  }
  NoticiaMunicipio.init({
    noticiaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    municipioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'NoticiaMunicipio',
    tableName: 'NoticiaMunicipios'
  });

  return NoticiaMunicipio;
};