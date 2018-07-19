'use strict'

module.exports = function(sequelize, DataTypes){
  var User = sequelize.define('User', {
    uid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1
    },
    userName: {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
      freezeTableName: true
  });
  return User;
}