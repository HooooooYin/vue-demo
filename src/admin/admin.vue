<template>
  <section class="admin">
    <el-row class="header">
      <!-- logo -->
      <el-col :span="8">
        <img src="../assets/logo.png" class="logo" alt="">
      </el-col>
      <!-- 管理员 -->
      <el-col :span="16">
        <img :src="admin.avatar" class="avatar" alt="">
        <p class="adminname">{{admin.name}}</p>
      </el-col>
    </el-row>
    <!-- 内容区 -->
    <el-row class="main">
      <el-col class="menu" :span="8">
        <p></p>
        <el-menu
          class="admin-menu"
          :default-active="$router.path"
          router >
          <el-menu-item
            v-for="item in $router.options.routes[1].children"
            :key="item.path"
            :index="item.path" >
            {{item.name}}
          </el-menu-item>
        </el-menu>
      </el-col>
      <!-- 右边操作区域 -->
      <el-col
        class="content"
        :span="16" >
        <transition name="el-zoom-in-center">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  data () {
    return {
      admin: {
        name: '',
        avatar: ''
      }
    }
  },
  mounted () {
    this.admin = JSON.parse(sessionStorage.getItem('admin'))
  }
}
</script>

<style scoped lang="stylus">
  .admin
    .header
      height 60px
      box-shadow 0 0 10px #666
      .logo
        margin 0 5px
        width 60px
        heighe 60px
      .avatar
        margin 0 15px
        width 60px
        height 60px
        border-radius 30px
        float right
      .adminname
        float right
        font-size 20px
        margin-top 20px
        color #929292
    .main
      .menu
        .admin-menu
          position fixed
          width 25%
          top 65px
          bottom 0
          background #fff
          .el-menu-item
            color #daa520
            &:hover
              background #808080
              color #eee
          .is-active
            color #eee !important
            font-weight bold !important
            background #808080 !important
</style>
