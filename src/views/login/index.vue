<template>
  <div class="login-container">
    <el-form
      ref="formRef"
      :model="loginForm"
      :rules="loginFormRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="logo">
        <h1>i-admin</h1>
        <h3>(remake vue-admin-template)</h3>
      </div>
      <el-form-item prop="username">
        <span class="icon-wrapper">
          <icon-svg icon-name="user" />
        </span>
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          autocomplete="on"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="icon-wrapper">
          <icon-svg icon-name="password" />
        </span>
        <el-input
          ref="passwordRef"
          v-model="loginForm.password"
          placeholder="Password"
          name="password"
          :type="passwordType"
          :key="passwordType"
          autocomplete="on"
          tabindex="2"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <icon-svg
            :icon-name="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px;"
        @click.prevent="handleLogin"
        >Login</el-button
      >
      <div class="tips">
        <span>{{ tips }}</span>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()
    const store = useStore()

    const formRef: any = ref(null)
    const usernameRef: any = ref(null)
    const passwordRef: any = ref(null)

    const tips = ref('')
    const loading = ref(false)
    const passwordType = ref('password')
    const redirect = ref(undefined)

    const loginForm = reactive({ username: '', password: '' })
    onMounted(() => {
      loginForm.username = 'admin'
      loginForm.password = '111111'
      usernameRef.value.focus()
    })
    const loginFormRules = reactive({
      username: [
        {
          required: true,
          trigger: 'blur',
          type: 'enum',
          enum: ['admin', 'editor'],
          message: 'Username is unavailable.'
        }
      ],
      password: [
        {
          required: true,
          min: 6,
          trigger: 'blur',
          message: 'The password should more than 6 digits.'
        }
      ]
    })

    function handleLogin() {
      formRef.value.validate((valid: any) => {
        if (valid) {
          loading.value = true
          setTimeout(() => {
            store
              .dispatch('user/login', loginForm)
              .then(() => {
                router.push({ path: redirect.value || '/' })
                loading.value = false
              })
              .catch(() => {
                loading.value = false
              })
          }, 2500)
        } else {
          tips.value = 'login validate error'
          console.log(tips.value)
          return false
        }
      })
    }

    async function showPwd() {
      passwordType.value = passwordType.value === 'password' ? '' : 'password'
      await nextTick(() => {
        passwordRef.value.focus()
      })
    }

    return {
      loginForm,
      loginFormRules,
      passwordType,
      loading,
      tips,
      // refs
      formRef,
      usernameRef,
      passwordRef,
      // fnc
      handleLogin,
      showPwd
    }
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
