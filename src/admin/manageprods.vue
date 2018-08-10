<template>
  <section class="box">
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <!-- 商品管理路由 -->
    <div class="prodmenu">
      <el-menu
        mode="horizontal"
        :default-active="$router.path"
        router>
        <el-menu-item
          v-for="item in $router.options.routes[1].children[1].children"
          :key="item.path"
          :index="item.path">
          {{item.name}}
        </el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </section>
</template>
<script>
export default {
}
</script>
<style lang="stylus" scoped>
  .box
    .head
      border-left 5px solid #696969
      padding-left 10px;
    .prodmenu
      margin 0 15px
</style>
