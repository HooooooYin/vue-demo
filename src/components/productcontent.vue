<template>
  <div>
    <h1>productcontent.vue</h1>
    <p>{{product.productclass}}</p>
    <p>{{product.productname}}</p>
    <div>
      <h2 v-text="product.productname"></h2>
      <p>价格：{{product.productprice}}元</p>
      <p>销量：{{product.productsells}}</p>
      <img :src="product.productimage">
      <p>{{product.productintro}}</p>
    </div>
  </div>
</template>
<script>
import {GetProduct} from '../api/api'
export default {
  data () {
    return {
      product: ''
    }
  },
  mounted () {
    let params = this.$route.params.productid
    GetProduct(params).then(res => {
      this.product = res.data.product
    })
  }
}
</script>
