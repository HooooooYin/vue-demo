<template>
  <el-main>
    <el-form
      :model="LoginForm"
      ref="LoginForm"
      :rules="rule"
      label-width="0"
      class="login-form" >
      <h3>用户登录系统</h3>

      <el-form-item prop="username" >
        <el-input
          type="text"
          v-model="LoginForm.username"
          placeholder="username">
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
            :loading="logining" >
            登录
          </el-button>
          <el-button
            type="danger"
            class="resetBtn"
            round
            @click.native.prevent="reset" >
            重置
          </el-button>
          <hr>
          <p>还没有账号，马上去<span class="to" @click="toregister" >注册</span></p>
        </el-form-item>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { LoginUser } from '../api/api'

export default {
  data () {
    return {
      LoginForm: {
        username: '',
        password: ''
      },
      Logining: false,
      rule: {
        username: [
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
            userName: this.LoginForm.username,
            password: this.LoginForm.password
          }

          LoginUser(loginParams).then(res => {
            this.logining = false

            let { code, msg, user } = res.data
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
            sessionStorage.setItem('user', JSON.stringify(user))
            this.$router.push('/manager/my')
          })
        } else {
          console.log('submit err')
        }
      })
    },
    reset () {
      this.$refs.LoginForm.resetFields()
    },
    toregister () {
      this.$router.push('/register')
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
      margin-top 20px
  .to
    color #67c23a
    cursor pointer
</style>
