<template>
  <div>
    <div class="title">
      <h1 v-text="$route.params.class"></h1>
    </div>
    <ul>
      <template template v-for="(item) in productlist" >
        <el-row class="item" :key="item.productname">
          <router-link
            :to="`/product/${item.productid}`"
            :key="item.productname" >
              <el-col :span="8">
                <img :src="item.productimage">
              </el-col>
          </router-link>
          <el-col :span="16">
            <h3>{{item.productname}}</h3>
            <p class="intro">{{item.productintro}}</p>
            <router-link
            :to="`/product/${item.productid}`"
            :key="item.productname" >
              <p class="link">了解详情...</p>
          </router-link>
          <p class="sellnum">累计发货<span>{{item.productsells}}件</span></p>
          <p class="price">全国包邮价<span>{{item.productprice}}元</span></p>
          </el-col>
        </el-row>
      </template>
    </ul>
  </div>
</template>

<script>
import {GetProductList, SearchProductList} from '../api/api'
export default {
  data () {
    return {
      productlist: [],
      addnum: 0
    }
  },
  mounted () {
    if (this.$route.params.productname) {
      let searchparams = this.$route.params.productname
      SearchProductList(searchparams).then(res => {
        if (res.data.code === 200) {
          this.productlist = res.data.productlist
        } else {
          this.$notify({
            title: '很抱歉',
            message: res.data.msg,
            type: 'warning',
            offset: 200
          })
          this.$router.push('/products/all')
        }
      })
    } else {
      let params = null
      params = this.$route.params.class
      GetProductList(params).then(res => {
        console.log(res.data.productlist[0].productimage)
        this.productlist = res.data.productlist
      })
    }
  }
}
</script>
<style scoped lang="stylus">
  a
    text-text-decoration none
    color #999
  a:hover
    color #669966
  .title
    height 60px
    border-left 4px soild #669966
    margin 0 15px
    background-color #f2f3f2
    text-align left
    padding-left 20px
    line-height 60px
  ul
    padding 0
    margin 0 15px
  .item
    margin 25px 0
    box-shadow 0 0 30px #ccc
  .item:hover
    background #eee
  img
    width 100%
    max-width 200px
    padding 10px
    border-radius 15px
  .intro, .price, .sellnum
    margin 0 15px 0 25px
    text-align left
    color #666
    line-height 2
    letter-spacing 1.2
  .link
    text-align right
    font-size 16px
    margin-right 40px
  .price, .sellnum
    color gray
  .price span
    color red
    font-size 25px
</style>
