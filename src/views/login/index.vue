<template>
  <div class="login-container">
    <el-form class="login-form" auto-complete label-position="left">
      <div class="logo">
        <h1>i-admin</h1>
      </div>
      <el-form-item>
        <span class="icon-wrapper">
          <icon-svg icon-name="user" />
        </span>
        <el-input
          placeholder="Username"
          name="username"
          type="text"
          autocomplete
          tabindex="1"
        />
      </el-form-item>
      <el-form-item>
        <span class="icon-wrapper">
          <icon-svg icon-name="password" />
        </span>
        <el-input
          placeholder="Password"
          name="password"
          type="password"
          autocomplete
          tabindex="2"
        />
        <span class="show-pwd">
          <icon-svg icon-name="eye" />
        </span>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-bottom: 30px;"
        >Login</el-button
      >
      <div class="tips">
        <span>username: admin</span>
        <span>password: admin</span>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.login-form {
  /* reset element-plus css */
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      padding: 12px 5px 12px 15px;
      height: 47px;
      border: 0px;
      border-radius: 0px;
      background-color: transparent !important;
      appearance: none;
      color: $loginColor_lightGray;
      caret-color: $loginColor_cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginColor_bg inset !important;
        -webkit-text-fill-color: $loginColor_cursor !important;
      }
    }
  }
  .el-form-item {
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    // color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100vh;
  background-color: $loginColor_bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    margin-bottom: 10px;
    font-size: 14px;
    color: #fff;
    text-align: center;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .icon-wrapper {
    display: inline-block;
    width: 30px;
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    color: $loginColor_darkGray;
  }

  .logo {
    text-align: center;
    color: $loginColor_lightGray;
    h1 {
      margin: 0 auto 40px auto;
    }
  }

  .show-pwd {
    position: absolute;
    top: 7px;
    right: 10px;
    color: $loginColor_darkGray;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
