'user strict'

var db = {
  sequelize: {
    username: 'root',
    password: '123456',
    database: 'vueServer',
    options: {
      host: 'localhost',
      dialect: 'mysql', 
      timestamps: true,
      underscored: false,
      paranoid: true,
      charset: 'utf8'
    }
  }
};

module.exports = db;