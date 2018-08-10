import Mock from 'mockjs'
const products = []
Mock.Random.extend({
  productclass: function () {
    let classes = ['shiliu', 'songzi', 'huotui', 'other']
    return this.pick(classes)
  }
})
for(let index = 0;index < 25; index++){
  products.push(Mock.mock({
    productname: Mock.Random.ctitle(),
    productclass: Mock.Random.productclass(),
    'productprice|100-200': 1,
    productintro: Mock.Random.cparagraph(),
    productimage: Mock.Random.image('200*200', '@color'),
    'productsells|20-700': 1
  }))
}

export {products}