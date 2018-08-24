<template>
  <div class="login">
    <h2>登录</h2>
    <div>
      <p class="login-item" v-if="mode === 0">
        <label for="username">用户名：</label>
        <input type="text" name="username" v-model="username" placeholder="请输入用户名" @blur="validaUsername">
        <span v-if="usernameError" class="user-error">用户名有误</span>
      </p>
      <p class="login-item" v-if="mode === 0">
        <label for="password">密码：</label>
        <input type="password" name="password" v-model="password" placeholder="请输入密码">
      </p>
      <p class="login-item" v-if="mode === 1">
        <label for="username">手机号：</label>
        <input type="text" name="username" v-model="phone" placeholder="请输入手机号" @blur="validaPhone">
        <span v-if="phoneError" class="user-error">请输入正确手机号</span>
      </p>
      <p class="login-item" v-if="mode === 1">
        <label for="number">验证码：</label>
        <input type="text" name="number" v-model="number" placeholder="请输入验证码">
        <span class="blank"></span>
      </p>
      <button class="login-btn" @click="login">登录</button>
      <div class="login-mode">
        <span data-mode="0" @click="changeMode">账号密码登录</span>
        <span data-mode="1" @click="changeMode">验证码登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameError: false,
      phoneError: false,
      username: '',
      password: '',
      number: '',
      phone: '',
      mode: 0
    }
  },
  methods: {
    validaUsername: function () {
      let userRegx = /^[a-zA-Z0-9]{0,15}$/
      if (userRegx.test(this.username)) {
        this.usernameError = false
      } else {
        this.usernameError = true
      }
    },
    validaPhone: function () {
      let phoneRegx = /^[0-9]{11}$/
      if (phoneRegx.test(this.phone)) {
        this.phoneError = false
      } else {
        this.phoneError = true
      }
    },
    login: function () {
      this.$router.push('/')
    },
    changeMode: function ($event) {
      this.mode = parseInt($event.currentTarget.dataset.mode)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/common';
  .login {
    background-color: $panel_color;
    width: 80%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem $header_color;
    padding: 1rem;
    color: $font_color;
    h2 {
      font-size: 1.5rem;
      font-weight: normal;
      border-bottom: 1px solid #c0c0c0;
      text-align: left;
      padding-bottom: 0.5rem;
      margin: 0;
      margin-bottom: 2rem;
    }
    .login-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      line-height: 2.3rem;
      position: relative;
      &:first-child {
        margin-bottom: 2rem;
      }
      .user-error {
        position: absolute;
        bottom: -2rem;
        right: 0;
        font-size: 0.8rem;
        color: red;
      }
      label {
        flex: 1;
        text-align: right;
      }
      input {
        border: 1px #c0c0c0 solid;
        height: 2.3rem;
        padding: 0.3rem;
        box-sizing: border-box;
        background-color: $panel_color;
        color: $font_color;
        flex: 3;
      }
    }
    .login-btn {
      width: 80%;
      height: 2rem;
      border-radius: 0.2rem;
      color: #ffffff;
      background-color: $header_color;
      border: none;
      font-size: 1.2rem;
      border-radius: 1rem;
    }
    .login-mode {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
      span {
        margin: 0.5rem;
        &:first-child{
          padding-right: 1rem;
          border-right: 1px #c0c0c0 solid;
        }
      }
    }
  }
</style>
