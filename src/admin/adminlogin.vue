<template>
  <el-main>
    <el-form
      :model="LoginForm"
      ref="LoginForm"
      :rules="rule"
      label-width="0"
      class="login-form" >
      <h3>管理员登录</h3>

      <el-form-item prop="adminName" >
        <el-input
          type="text"
          v-model="LoginForm.adminName"
          placeholder="adminName">
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="LoginForm.password"
          placeholder="password" >
        </el-input>

        <el-form-item class="btn-group">
          <el-button
            type="primary"
            class="submitBtn"
            round
            @click.native.prevent="submit"
            :loading="Logining" >
            登录
          </el-button>
          <el-button
            type="danger"
            class="resetBtn"
            round
            @click.native.prevent="reset" >
            重置
          </el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { AdminLogin } from '../api/api'

export default {
  data () {
    return {
      LoginForm: {
        adminName: '',
        password: ''
      },
      Logining: false,
      rule: {
        adminName: [
          {
            required: true,
            max: 14,
            min: 7,
            message: '用户名是必须的，长度为7-14位',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码是必须的',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.LoginForm.validate(valid => {
        if (valid) {
          this.Logining = true
          let loginParams = {
            adminName: this.LoginForm.adminName,
            password: this.LoginForm.password
          }

          AdminLogin(loginParams).then(res => {
            this.Logining = false

            let { code, msg, admin } = res.data
            if (code !== 200) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
              this.$message({
                type: 'success',
                message: msg
              })
            }
            sessionStorage.setItem('admin', JSON.stringify(admin))

            this.$store.dispatch('adminLogin')

            this.$router.push('/admin')
          })
        } else {
          console.log('submit err')
        }
      })
    },
    reset () {
      this.$refs.LoginForm.resetFields()
    }
  }
}
</script>

<style scoped lang="stylus">
  .login-form
    margin 20px auto
    width 310px
    background #ffffff
    box-shadow 0 0 35px #b4bccc
    padding 30px 30px 0 30px
    border-radius 25px
  .submitBtn
    width 65%
    &
      margin 20px 0
</style>
