<template>
  <div class="container">
    <el-row>
      <el-col class="menu-box" :span="6">
        <p></p>
        <el-menu
          router
          default-active="$router.path"
          class="menu"
          background-color="#ffffff"
          text-color="#267943"
          active-text-color="#ffd04b"
          active-background-color="#000000" >
            <el-menu-item v-for="(item) in productclass"
              :index="`/products/${item.class}`"
              :key="`/products/${item.class}`"
              v-text="item.name" >
            </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-input
          type="text"
          class="el-input"
          placeholder="请输入商品名"
          v-model="searchName" >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button
          type="primary"
          :disabled="disabled"
          @click="search"
          :loading="loading" >
          搜索
        </el-button>
        <transition name="el-zoom-in-center">
          <router-view :key="key"></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchName: '',
      isactive: false,
      loading: false,
      productclass: [
        {
          class: 'all',
          name: '全部商品'
        },
        {
          class: 'pomegranate',
          name: '石榴'
        },
        {
          class: 'pine',
          name: '松子'
        },
        {
          class: 'ham',
          name: '火腿'
        },
        {
          class: 'other',
          name: '其他商品'
        }
      ]
    }
  },
  computed: {
    key () {
      return this.$route.params.class + new Date()
    },
    disabled () {
      if (this.searchName === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    search () {
      this.loading = true
      this.$router.push({
        path: `/products/search/${this.searchName}`
      })
      this.loading = false
    }
  }
}
</script>

<style scoped lang="stylus">
  .el-input
    margin 20px 0
    width 80%
  .el-button
    width 25%
    margin-right 5px
  .menu
    position fixed
    width 200px
    top 150px
    left 50px
    box-shadow 0 0 6px #ccc
  .is-active
    background #669966 !important
    color #fff !important
    font-weight bold !important
  @media screen and (max-width: 767px)
    .menu
      position fixed
      width 25%
      top 100px
      left 5px
      box-shadow 0 0 6px #ccc
    .is-active
      background #669966 !important
      color #fff !important
      font-weight bold !important
</style>
