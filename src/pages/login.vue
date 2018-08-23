<template>
  <div class="login">
    <h2>登录</h2>
    <div>
      <p class="login-item">
        <label for="username">用户名：</label>
        <input type="text" name="username" v-model="username" placeholder="请输入用户名" @blur="validaUsername">
        <span v-if="usernameError" class="user-error">用户名有误</span>
      </p>
      <p class="login-item">
        <label for="password">密码：</label>
        <input type="password" name="password" ref="password" placeholder="请输入密码">
      </p>
      <button class="login-btn">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameError: false,
      username: ''
    }
  },
  methods: {
    validaUsername: function () {
      let userRegx = /^[\u4e00-\u9fa5a-zA-Z0-9]{0,15}$/
      if (userRegx.test(this.username)) {
        this.usernameError = false
      } else {
        this.usernameError = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/common';
  .login {
    background-color: #ffffff;
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
      border-bottom: 1px solid #dcdcdc;
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
        left: 6.2rem;
        font-size: 0.8rem;
        color: red;
      }
      label {
        width: 5rem;
      }
      input {
        border: 1px #dcdcdc solid;
        height: 2.3rem;
        padding: 0.3rem;
        box-sizing: border-box;
      }
    }
    .login-btn {
      width: 60%;
      height: 2rem;
      border-radius: 0.2rem;
      color: #ffffff;
      background-color: $panel_color;
      border: none;
      font-size: 1.2rem;
    }
  }
</style>
