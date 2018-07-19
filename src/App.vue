<template>
  <div id="app">
    <el-container>
      <el-header>
        <Myheader></Myheader>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <MyFooter></MyFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Myheader from '@/components/header'
import MyFooter from '@/components/footer'

export default {
  name: 'App',
  components: {
    Myheader,
    MyFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
