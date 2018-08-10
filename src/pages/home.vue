<template>
  <el-container class="el-container">
    <el-header>
      <Myheader></Myheader>
    </el-header>
    <transition name="el-zoom-in-center">
      <el-main>
        <router-view/>
      </el-main>
    </transition>
    <el-footer class="el-footer">
      <MyFooter></MyFooter>
    </el-footer>
  </el-container>
</template>

<script>
import Myheader from '@/components/header'
import MyFooter from '@/components/footer'

export default {
  name: 'home',
  components: {
    Myheader,
    MyFooter
  }
}
</script>

<style scoped lang="stylus">
  .el-container
    min-height 500px
  .el-footer
    padding: 0;
</style>
