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
      paranoid: true
    }
  }
};

module.exports = db;