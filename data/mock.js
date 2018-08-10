import Adapter from 'axios-mock-adapter'
import axios from 'axios'
import {products} from './data'

export default {
  init () {
    const mock = new Adapter(axios)
    mock.onGet('/productlist').reply(config => {
      let productclass = config.params
      console.log(productclass)
      let productlist = products.filter(p => {
        if (productclass === '') {
          return true
        } else if (p.productclass === productclass) {
          return true
        } else {
          return false
        }
      })
      console.log(productlist)
      return new Promise((resolve, reject) => {
        resolve([200, {
          productlist
        }])
      })
    })
    mock.onGet('/search').reply(config => {
      let searchname = config.params
      let searchRes = []
      products.forEach(p => {
        if (p.productname.indexOf(searchname) !== -1) {
          searchRes.push(p)
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(searchRes.length > 0) {
            resolve([200, {
              code: 200,
              searchname
            }])
          } else {
            resolve([200, {
              code: 500,
              msg: '很抱歉没有查询到结果，请确定商品名'
            }])
          }
        }, 500)
      })
    })
    mock.onGet('/product').reply(config => {
      let {productclass, productname} = config.params
      let curproduct = {}
      products.forEach(p => {
        if (p.productclass === productclass && p.productname === productname) {
          curproduct = p
        }
      })
      return new Promise((resolve, reject) => {
        resolve([200, {curproduct}])
      })
    })
  }
}
