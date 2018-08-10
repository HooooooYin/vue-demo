var express = require('express');
var router = express.Router();
var db = require('../sqldb');
var User = db.User;
var Products = db.Products;
var Admin = db.Admin;
var Sequelize = require('sequelize');
var formidable = require('formidable');
var path = require('path');
var MarkdownIt = require('markdown-it')
    md = new MarkdownIt();

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
    return User.findOne({
      where: {
        userName: saveUser.userName
      }
    }, {
      transaction: t
    }).then(function(result){
      if(result.password !== saveUser.password){
        res.send({
          code: 400,
          msg: '密码错误'
        })
        return;
      }
      res.send({
        code: 200,
        msg: '登录成功',
        user: result
      });
    }).catch(function(err){
      console.error('发生错误' + err)
    })
  })
})

router.get('/productlist/:productclass', function(req, res, next){
  var productclass = req.params.productclass;
  return db.sequelize.transaction(function(t){
    return  Products.findAll({
      where: {
        productclass: productclass
      }
    }, {
      transaction: t
    }).then(function(result){
      if(result.length === 0){
        res.send({
          code: 400,
          msg: '商品列表为空'
        })
        return;
      }
      res.send({
        code: 200,
        msg: '查询成功',
        productlist: result
      })
    }).catch(function(err){
      console.log('发生错误' + err)
    })
  })
})

router.get('/search/:productname', function(req, res, next){
  var productname = req.params.productname;
  return db.sequelize.transaction(function(t){
    return  Products.findAll({
      where: {
        productname: {
          [Sequelize.Op.like]: `%${productname}%`
        }
      }
    }, {
      transaction: t
    }).then(function(result){
      if(result.length === 0){
        res.send({
          code: 400,
          msg: '查不到结果'
        })
        return;
      }
      res.send({
        code: 200,
        msg: '查询成功',
        productlist: result
      })
    }).catch(function(err){
      console.log('发生错误' + err)
    })
  })
})

router.get('/product/:productid', function(req, res, next){
  var productid = req.params.productid;
  return db.sequelize.transaction(function(t){
    return Products.findById(productid, {
      transaction: t
    }).then(function(result){
      if (!result) {
        res.send({
          code: 400,
          msg: '查不到此商品'
        })
      } else {
        res.send({
          code: 200,
          msg: '查询成功',
          product: result.dataValues
        })
      }
    }).catch(function(err){
      console.log('发生错误' + err)
    })
  })
})

router.post('/admin/login', function(req, res, next){
  var saveUser = {
    adminName: req.body.adminName,
    password: req.body.password
  };
  return db.sequelize.transaction(function(t){
    return Admin.findOne({
      where: {
        adminName: saveUser.adminName
      }
    }, {
      transaction: t
    }).then(function(result){
      if(result.password !== saveUser.password){
        res.send({
          code: 400,
          msg: '密码错误'
        })
        return;
      }
      res.send({
        code: 200,
        msg: '登录成功',
        admin: result
      });
    }).catch(function(err){
      console.error('发生错误' + err)
    })
  })
})

router.post('/uploadImg', function(req, res, next){
  const form = new formidable.IncomingForm()
  // 上传图片的保存路径
  form.uploadDir = path.dirname('./public/images/.')
  // 保存扩展名
  form.keepExtensions = true
  // 上传文件最大大小
  form.maxFieldsSize = 5 * 1024 * 1024
  form.parse(req, (err, fields, files) => {
    const imagepath = `http://localhost:3000/${path.normalize(files.file.path)}`
    res.status(200).send(imagepath)
  })
})

router.post('/addprod', function(req, res, next){
  console.log(req.body)
  var info_h = md.render(req.body.params.info)
  if(req.body.params.selling === ''){
    req.body.params.selling = 0
  }
  console.log(info_h)
  var product = {
    productname: req.body.params.name,
    productclass: req.body.params.type,
    productprice: req.body.params.price,
    productsells: req.body.params.selling,
    productimage: req.body.params.imagepath,
    productdesc: req.body.params.desc,
    productintro: info_h
  }
})

module.exports = router;
