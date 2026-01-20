'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Noticia extends Model {
    static associate(models) {
      // Notícia pertence a uma Fonte
      Noticia.belongsTo(models.Fonte, {
        foreignKey: 'fonteId',
        as: 'fonte',
      });

      Noticia.belongsTo(models.Usuario, {
        foreignKey: 'autorId',
        as: 'autor',
      });

      // Notícia pertence a um TemaPrincipal
      Noticia.belongsTo(models.TemaPrincipal, {
        foreignKey: 'temaPrincipalId',
        as: 'temaPrincipal',
      });

      // Relacionamento N:N com Município
      Noticia.belongsToMany(models.Municipio, {
        through: models.NoticiaMunicipio,
        foreignKey: 'noticiaId',
        otherKey: 'municipioId',
        as: 'municipios',
      });

      // Notícia tem várias Tags
      Noticia.hasMany(models.TagAssociada, {
        foreignKey: 'noticiaId',
        as: 'tags',
      });

      Noticia.hasMany(models.Favorito, {
        foreignKey: 'noticiaId',
        as: 'favoritos',
      });
    }
  }
  Noticia.init(
    {
      titulo: DataTypes.STRING,
      conteudo: DataTypes.TEXT,
      url: DataTypes.STRING,
      dataDePublicacao: DataTypes.DATE,
      dataDeImportacao: DataTypes.DATE,
      status: DataTypes.STRING,
      tipoNoticia: DataTypes.STRING,
      fonteId: DataTypes.INTEGER,
      temaPrincipalId: DataTypes.INTEGER,
      autorId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Noticia',
      tableName: 'Noticias',
    }
  );
  return Noticia;
};
