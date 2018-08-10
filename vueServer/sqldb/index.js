'use strict'

var config = require('../config');
var Sequelize = require('sequelize');
var db = {
  sequelize: new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize.options)
};
db.User = db.sequelize.import('../model/user.js');
db.Products = db.sequelize.import('../model/products.js')
db.Admin = db.sequelize.import('../model/admin.js')

module.exports = db;