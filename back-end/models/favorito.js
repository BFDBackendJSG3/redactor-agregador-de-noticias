'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorito extends Model {
    static associate(models) {
      // Favorito pertence a um usuário
      Favorito.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'usuario'
      });

      // Favorito pertence a uma notícia
      Favorito.belongsTo(models.Noticia, {
        foreignKey: 'noticiaId',
        as: 'noticia'
      });
    }
  }
  Favorito.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    noticiaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Favorito',
    tableName: 'Favoritos'
  });

  return Favorito;
};