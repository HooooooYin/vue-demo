'use strict'

module.exports = function(sequelize, DataTypes){
  var Admin = sequelize.define('Admin', {
    aid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1
    },
    adminName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },{
      freezeTableName: true
  });
  return Admin;
}