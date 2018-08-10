<template>
  <el-main>
    <el-form
      :model="RegisterForm"
      ref="RegisterForm"
      :rules="rule"
      class="regform"
      label-width="0" >

      <h3>用户注册</h3>
      <el-form-item prop="username" >
        <el-input
          type="text"
          v-model="RegisterForm.userName"
          placeholder="用户名" >
        </el-input>
      </el-form-item>

      <el-form-item prop="password" >
        <el-input
         type="password"
         v-model="RegisterForm.password"
         placeholder="密码" >
        </el-input>
      </el-form-item>

      <el-form-item prop="confirmpassword" >
        <el-input
         type="password"
         v-model="RegisterForm.confirmpassword"
         placeholder="确认密码" >
        </el-input>
      </el-form-item>

      <el-form-item prop="email" >
        <el-input
         type="email"
         v-model="RegisterForm.email"
         placeholder="电子邮件" >
        </el-input>
      </el-form-item>

      <el-form-item prop="tel" >
        <el-input
         type="text"
         v-model="RegisterForm.tel"
         placeholder="电话号码" >
        </el-input>
      </el-form-item>
      <el-form-item prop="name" >
        <el-input
         type="text"
         v-model="RegisterForm.name"
         placeholder="昵称" >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
         type="success"
         class="submitBtn"
         round
         @click.native.prevent="submit">
          注册
        </el-button>
        <el-button
          type="primary"
          class="resetBtn"
          round
          @click.native.prevent="reset" >
          重置
        </el-button>
        <p>已经有账号，马上去<span class="to" @click="tologin">登录</span></p>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { RegisterUser } from '../api/api'

export default {
  data () {
    let confirmpasswordCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码是必须的'))
      } else if (value !== this.RegisterForm.password) {
        return callback(new Error('两次输入的密码不一致'))
      } else {
        return callback()
      }
    }
    let telCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('电话号码是必须的'))
      } else if (!Number.isInteger(parseInt(value))) {
        return callback(new Error('电话号码必须是数字'))
      } else if (value.toString().length !== 11) {
        return callback(new Error('电话号码必须是11位数字'))
      } else {
        callback()
      }
    }
    return {
      RegisterForm: {
        userName: '',
        password: '',
        confirmpassword: '',
        tel: '',
        email: '',
        name: ''
      },
      logining: false,
      rule: {
        userName: [
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
        ],
        confirmpassword: [
          {
            required: true,
            validator: confirmpasswordCheck,
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: true,
            validator: telCheck,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入正确的电子邮件格式(xxx@xxx.com)',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            max: 12,
            min: 2,
            message: '昵称是必须的，最好是汉字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.RegisterForm.validate(valid => {
        console.log(this.RegisterForm.email)
        if (valid) {
          this.logining = true
          let reginParams = {
            userName: this.RegisterForm.userName,
            password: this.RegisterForm.password,
            tel: this.RegisterForm.tel,
            email: this.RegisterForm.email,
            name: this.RegisterForm.name
          }
          RegisterUser(reginParams).then(res => {
            this.logining = false
            if (res.data.code !== 200) {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
              return
            }
            this.$message({
              type: 'success',
              message: '注册成功'
            })
            let user = res.data
            console.log(user)

            sessionStorage.setItem('user', JSON.stringify(user))

            this.$store.dispatch('login')

            this.$router.push('/manager/my')
          })
        } else {
          console.log('submit error')
        }
      })
    },
    reset () {
      this.$refs.RegisterForm.resetFields()
    },
    tologin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="stylus">
  .regform
    margin 20px auto
    width 310px
    background #ffffff
    box-shadow 0 0 10px #b4bccc
    padding 30px 30px 0 30px
    border-radius 25px
  .submitBtn
    width 65%
  .to
    color #fa5555
    cursor pointer
</style>
