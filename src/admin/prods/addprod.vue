<template>
  <div class="addprod">
    <h4>新增商品</h4>
    <el-form ref="addprod" :rules="prodrules" :model="addprod" label-width="80px">
      <el-form-item label="商品名" prop="name">
        <el-input v-model="addprod.name" placeholder="请输入商品名"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="addprod.price" placeholder="请输入商品价格"></el-input>
      </el-form-item>
      <el-form-item label="商品主图" prop="image">
        <el-upload
          class="prod-image"
          action="http://localhost:3000/uploadImg"
          :shiw-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="cur-image">
          <i v-else class="el-icon-plus prod-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品类别" prop="type">
        <el-select v-model="addprod.type" placeholder="请选择商品类别">
          <el-option label="石榴" value="shiliu"></el-option>
          <el-option label="火腿" value="ham"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否上架">
        <el-switch v-model="addprod.selling"></el-switch>
      </el-form-item>

      <el-form-item label="商品简介" prop="desc">
        <el-input type="textarea" v-model="addprod.desc" placeholder="请输入商品简介"></el-input>
      </el-form-item>

      <el-form-item label="商品详情" prop="info">
        <mavon-editor ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="addprod.info"></mavon-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="newprod">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {UploadFile, addProd} from '../../api/api'
export default {
  data () {
    return {
      imageUrl: '',
      addprod: {
        name: '',
        price: '',
        type: '',
        selling: '',
        desc: '',
        info: ''
      },
      prodrules: {
        name: [
          {
            required: true,
            message: '请输入商品名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度3到15个字',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入商品价格',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '价格必须是数字',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '商品必须选择一个类别',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入商品简介',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    newprod () {
      this.$refs.addprod.validate(valid => {
        if (valid) {
          addProd(this.addprod)
        } else {
          console.log('请先完成验证')
          return false
        }
      })
    },
    $imgAdd (pos, $file) {
      let formdata = new FormData()
      formdata.append('file', $file)
      UploadFile(formdata).then(url => {
        console.log(this.addprod.info)
        // 把文件名替换成url，实现预览。即url.data返回的是一个url
        this.$refs.md.$img2Url(pos, url.data)
      })
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    },
    handleSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeUpload (file) {
      const isPIC = file.type === 'image/jpeg' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isPIC) {
        this.$message.error('上传的图片只能是.jpg或者是.png格式！')
      }
      if (!isLt5M) {
        this.$message.error('上传的图片大小不能超过5MB！')
      }
      return isPIC && isLt5M
    }
  }
}
</script>
<style lang="stylus" scoped>
  .addprod
    margin 50px 0
    .el-form
      text-align left
      .el-select
        width 100%
      .el-switch
        margin 10px 0 0 0
      .prod-image
        width 200px
        height 200px
        border 1px dashed #d9d9d9
        border-radius 6px
        cursor pointer
        position relative
        overflow hidden
        .cur-image
          width 100%
        .prod-uploader-icon
          font-size 45px
          color #8c939d
          width 200px
          height 200px
          line-height 200px
          text-align center
</style>
