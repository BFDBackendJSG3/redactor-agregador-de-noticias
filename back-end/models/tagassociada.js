'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TagAssociada extends Model {
    static associate(models) {
      // Tag pertence a uma Notícia
      TagAssociada.belongsTo(models.Noticia, {
        foreignKey: 'noticiaId',
        as: 'noticia'
      });
    }
  }
  TagAssociada.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoria: DataTypes.STRING,
    noticiaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TagAssociada',
    tableName: 'TagsAssociadas'
  });

  return TagAssociada;
};