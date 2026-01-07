'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Associações futuras:
      // Usuario.hasMany(models.Noticia)
      // Usuario.hasMany(models.Alerta)

      Usuario.hasMany(models.Favorito, {
        foreignKey: 'usuarioId',
        as: 'favoritos',
      });
    }
  }

  Usuario.init(
    {
      nome: DataTypes.STRING,
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
      modelName: 'Usuario',
      tableName: 'Usuarios',
    }
  );

  return Usuario;
};
