<template>
  <el-container>
      <router-view></router-view>
      <el-footer class="footer" height="3.5rem">
        <div class="tab" v-if="parseInt(selected) === 1">
          <img src="../../static/image/index_selected.png">
          <span class="selected">主页</span>
        </div>
        <div class="tab" v-else>
          <img src="../../static/image/index.png" data-id = "1" @click="select">
          <span>主页</span>
        </div>
        <div class="tab" v-if="parseInt(selected) === 2">
          <img src="../../static/image/dinner_selected.png">
          <span class="selected">点餐</span>
        </div>
        <div class="tab" v-else>
          <img src="../../static/image/dinner.png" data-id = "2" @click="select">
          <span>点餐</span>
        </div>
        <div class="tab" v-if="parseInt(selected) === 3">
          <img src="../../static/image/order_selected.png">
          <span class="selected">订单</span>
        </div>
        <div class="tab" v-else>
          <img src="../../static/image/order.png" data-id = "3" @click="select">
          <span>订单</span>
        </div>
        <div class="tab" v-if="parseInt(selected) === 4">
          <img src="../../static/image/user_selected.png">
          <span class="selected">我的</span>
        </div>
        <div class="tab" v-else>
          <img src="../../static/image/user.png" data-id = "4" @click="select">
          <span>我的</span>
        </div>
      </el-footer>
    </el-container>
</template>

<script>
export default {
  computed: {
    selected: function () {
      switch (this.$route.name) {
        case 'home': return 1
        case 'dinner': return 2
        default: return 1
      }
    }
  },
  methods: {
    select: function ($event) {
      this.$data.selected = $event.currentTarget.dataset.id
      switch (this.$data.selected) {
        case '1': this.$router.push('/')
          break
        case '2': this.$router.push('/dinner')
          break
        case '3': this.$router.push('/login')
          break
        default: this.$router.push('/')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/common';
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 0;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 0 1rem #dcdcdc;
    background-color: $panel_color;
    img{
      height: 1.5rem;
    }
    .tab{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: $header_color;
      font-size: 0.5rem;
      width: 25%;
      height: 100%;
      .selected{
        color: $font_color;
      }
    }
  }
</style>
