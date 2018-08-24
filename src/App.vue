<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
  @import './style/common';
  html{
    body{
      margin: 0;
      height: 100%;
    }
  }

  #app{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    background-color: $bg_color;
    margin: 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
