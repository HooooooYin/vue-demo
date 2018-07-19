var express = require('express');
var router = express.Router();
var db = require('../sqldb');
var User = db.User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/register', function(req, res, next){
  var saveUser = {
    userName: req.body.userName,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    tel: req.body.email
  };
  var hasUser = User.findAll({
    where: {
      userName: saveUser.userName
    }
  });
  console.log(hasUser.length)
  if(hasUser.length !== 0){
    res.send({
      code: 400,
      msg: '用户名已注册'
    })
    return;
  }
  return db.sequelize.transaction(function(t){
    return User.create(saveUser, {
      transaction: t
    }).then(function(result){
      res.send(result);
    }).catch(function(err){
      console.error('发生错误' + err);
    })
  })
})

router.post('/user/login', function(req, res, next){
  var saveUser = {
    userName: req.body.userName,
    password: req.body.password
  };
  return db.sequelize.transaction(function(t){
    return User.findAll({
      where: {
        userName: saveUser.userName,
        password: saveUser.password
      }
    }, {
      transaction: t
    }).then(function(result){
      res.send({
        code: 200,
        msg: '登录成功',
        user: result[0].dataValues
      });
    }).catch(function(err){
      console.error('发生错误' + err)
    })
  })
})

router.post('/update/user/name', function(req, res, next){
  return db.sequelize.transaction(function(t){
    return User.findById(req.body.uid, {
      transaction: t
    }).then(function(user){
      return user.update({
        name: req.body.name
      }, {
        transaction: t
      }).then(function(result){
        res.send(result);
      }).catch(function(err){
        console.log('发生错误' + err)
      })
    })
  })
})

router.get('/get/user/:uid', function(req, res, next){
  return db.sequelize.transaction(function(t){
    return User.findOne({
      uid: req.params.uid
    },{
      transaction: t
    }).then(function(result){
      res.send(result)
    }, {
      transaction: t
    }).catch(function(err){
      console.log('发生错误' + err)
    })
  })
})

module.exports = router;
