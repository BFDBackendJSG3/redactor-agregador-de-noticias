'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Associações futuras:
      // User.hasMany(models.Noticia)
      // User.hasMany(models.Alerta)

      User.hasMany(models.Favorito, {
        foreignKey: 'userId',
        as: 'favoritos',
      });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
      dataDeNascimento: DataTypes.DATEONLY,
      cpf: DataTypes.STRING,
      genero: DataTypes.STRING,
      telefone: DataTypes.STRING,
      endereco: DataTypes.STRING,
      tipoUsuario: DataTypes.STRING,
      redesSociais: DataTypes.TEXT,
      formacao: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Usuarios',
    }
  );

  return User;
};
