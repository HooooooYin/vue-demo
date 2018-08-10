'use strict'

module.exports = function(sequelize, DataTypes){
  var Products = sequelize.define('products', {
    productid: {
      type:DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1
    },
    productname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productclass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productprice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    productintro: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    productimage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productsells: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productdesc: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      freezeTableName: true
    })
    return Products;
}