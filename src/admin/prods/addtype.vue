<template>
  <div class="addprod">
    <h4>添加一个商品类</h4>
    <el-input
      placeholder="请输入商品类名"
      v-model="protype"
      clearable>
    </el-input>
    <el-input
      placeholder="请输入商品简介"
      v-model="prodsub"
      type="textarea"
      :rows="2"
      clearable>
    </el-input>
    <el-button type="danger" :disabled="disabled" @click="addtype" round>添加</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      prodtype: '',
      prodsub: ''
    }
  },
  computed: {
    disabled () {
      if (this.prodtype === '' || this.prodsub === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addtype () {
      console.log('do')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .addprod
    margin 50px 0
    .el-input
      margin 10px 0
    .el-button
      margin 10px 0
      width 100%
</style>
