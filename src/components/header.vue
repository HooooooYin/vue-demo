<template>
  <el-row class="header">
    <!-- 左边logo -->
    <el-col :span="4" class="logo">
      <img src="../assets/logo.png" @click="tohome" alt="">
    </el-col>
    <!-- 中间导航区域 -->
    <el-col class="main" :span="16">
      <el-menu
        :default-active="$route.path"
        class="menu"
        router
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#000000">
        <!-- 循环写路由 -->
        <template
          v-for="route in $router.options.routes[0].children"
          v-if="!route.hidden"
          >

          <!-- 循环没有children的路由 -->
          <el-menu-item
            v-if="!route.hasChild"
            :key="route.path"
            :index="route.path" >
            <i :class="route.class"></i>
            {{ route.name }}
          </el-menu-item>

          <!-- 循环有children的路由 -->
          <el-submenu v-else :index="route.path" :key="route.path" >
            <template slot="title" >{{ route.name }}</template>
            <el-menu-item
              v-for="child in route.children"
              :index="child.path"
              :key="child.path" >
              {{ child.name }}
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
    <!-- 用户信息 -->
    <el-col :span="4" class="user" >
      <el-button-group v-if="!user" >
        <el-button class="button" @click.native="tologin" type="success" size="small" round >Login</el-button>
        <el-button class="button" @click.native="toregister" type="danger" size="small" round >Register</el-button>
      </el-button-group>
      <div v-else>
        <el-dropdown>
          <img :src="user.avatar" alt="" class="avatar">
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item @click.native="tomy" v-text="user.name"></el-dropdown-item>
            <el-dropdown-item @click.native="tosend">我的工作台</el-dropdown-item>
            <el-dropdown-item divided @click.native="Logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    handleSelect (key) {
      if (!this.logined && (key === '/manager/my' || key === '/manager/send' || key === '/manager/history')) {
        this.$notify({
          title: '很抱歉',
          message: '请你先登录再访问该页面',
          type: 'warning',
          offset: '200'
        })
      }
    },
    tohome () {
      this.$router.push('/')
      console.log('home')
    },
    tologin () {
      this.$router.push('/login')
    },
    toregister () {
      this.$router.push('/register')
    },
    Logout () {
      sessionStorage.removeItem('user')
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="stylus">
  .header
    width 100%
    height 60px
    margin 0
    background #ffffff
    position fixed
    top 0
    left 0
    box-shadow 0 0 25px #666
  .logo img
    width 60px
    height 60px
    cursor pointer
  .button
    margin 15px 0
    width 80px
  .avatar
    width 40px
    height 40px
    border-radius 20px
    margin 10px 0
    cursor pointer
</style>
