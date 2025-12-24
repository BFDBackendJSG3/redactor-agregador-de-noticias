'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Municipio extends Model {
    static associate(models) {
      Municipio.belongsToMany(models.Noticia, {
        through: models.NoticiaMunicipio,
        foreignKey: 'municipioId',
        otherKey: 'noticiaId',
        as: 'noticias'
      });
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